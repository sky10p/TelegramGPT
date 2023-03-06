import { createDateWithoutTime, getDateString, getFirstDayOfCurrentMonth } from "../utils/dates";
import { Usage, UsageResponse } from "./models";
import { getPrice } from "./prices";
import { chatgptAxios } from "./utils";

const calculateUsage = (usageResponse: UsageResponse) => {
    return usageResponse.data.reduce((acc, curr) => {
        const tokens = curr.n_context_tokens_total + curr.n_generated_tokens_total;
        return {
            tokens: acc.tokens + tokens,
            price: acc.price + (getPrice(curr.operation,tokens))
        }
    }, {
        tokens: 0,
    price: 0
    })

}

export const getDailyUsage = async (): Promise<Usage> => {
    const axiosResponse =  await chatgptAxios.get<UsageResponse>('usage', {
        params: {
            date: getDateString(createDateWithoutTime(new Date()))
        }
    });

    return calculateUsage(axiosResponse.data);
}

export const getMonthlyUsage = async (): Promise<Usage> => {
    const axiosResponse =  await chatgptAxios.get<UsageResponse>('usage', {
        params: {
            start_date: getDateString(getFirstDayOfCurrentMonth()),
            end_date: getDateString(createDateWithoutTime(new Date()))
        }
    });

    return calculateUsage(axiosResponse.data);
}