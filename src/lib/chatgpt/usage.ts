import { DailyUsage, DailyUsageResponse } from "./models";
import { chatgptAxios } from "./utils";

export const getDailyUsage = async (): Promise<DailyUsage> => {
    const axiosResponse =  await chatgptAxios.get<DailyUsageResponse>('usage', {
        params: {
            date: new Date().toISOString().split('T')[0]
        }
    });

    return axiosResponse.data.data.reduce((acc, curr) => {
        const tokens = curr.n_context_tokens_total + curr.n_generated_tokens_total;
        return {
            tokens: acc.tokens + tokens,
            price: acc.price + (tokens / 1000 *0.002)
        }
    }, {
        tokens: 0,
    price: 0
    })
}