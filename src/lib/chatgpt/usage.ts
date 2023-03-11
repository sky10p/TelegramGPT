import {
  createDateWithoutTime,
  getDateString,
  getDayOfCurrentMonth,
  getFirstDayOfCurrentMonth,
} from "../utils/dates";
import { ChatGptUsage, DalleUsage, Usage, DailyUsageResponse, MonthlyUsageResponse } from "./models";
import { getImagesPrice, getTokensPrice } from "./prices";
import { chatgptAxios, dashboardOpenAiAxios } from "./utils";

const calculateUsage = (usageResponse: DailyUsageResponse): Usage => {
  const chatGptUsage: ChatGptUsage = usageResponse.data.reduce(
    (acc, curr) => {
      const tokens =
        curr.n_context_tokens_total + curr.n_generated_tokens_total;
      return {
        tokens: acc.tokens + tokens,
        price: acc.price +  getTokensPrice(curr.operation, tokens),
      };
    },
    {
      tokens: 0,
      price: 0,
    }
  );

  const dalleUsage: DalleUsage = usageResponse.dalle_api_data.reduce((acc, curr) => {
    const numImages = curr.num_images;
    return {
        numImages: acc.numImages + numImages,
        price: acc.price + getImagesPrice(curr.operation,numImages, curr.image_size)
    }
  }, {
    numImages: 0, price: 0
  });

  return {
    tokens: chatGptUsage.tokens,
    numImages: dalleUsage.numImages,
    price: chatGptUsage.price + dalleUsage.price
  }
};

export const getDailyUsage = async (): Promise<Usage> => {
  const axiosResponse = await chatgptAxios.get<DailyUsageResponse>("usage", {
    params: {
      date: getDateString(createDateWithoutTime(new Date())),
    },
  });

  return calculateUsage(axiosResponse.data);
};

export const getMonthlyUsage = async (): Promise<number> => {
  const axiosResponse = await dashboardOpenAiAxios.get<MonthlyUsageResponse>("usage", {
    params: {
      start_date: getDateString(getFirstDayOfCurrentMonth()),
      end_date: getDateString(getDayOfCurrentMonth()),
    },
  });

  return axiosResponse.data.total_usage / 100;
};
