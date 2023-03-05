import axios from "axios";
import { OPEN_AI_CONFIG } from "../../config/openai.config";
import { CHAT_GPT_MODEL } from "./constants";
import { ChatGptMessage, ChatGptResponse, DailyUsage, DailyUsageResponse } from "./models";

const chatgptAxios = axios.create({baseURL: 'https://api.openai.com/v1', headers: {
    Authorization: `Bearer ${OPEN_AI_CONFIG.KEY}`,
    "Content-Type": 'application/json'
}});

export const sendMessages = async ({messages, maxTokens=500}: {messages: ChatGptMessage[], maxTokens?: number}): Promise<ChatGptResponse> => {
    const data = {
        model: CHAT_GPT_MODEL,
        messages,
        max_tokens: maxTokens
    }
    try{
    const axiosResponse =  await chatgptAxios.post<ChatGptResponse>('chat/completions', data);
    return axiosResponse.data;
    }catch(error){
        console.log(JSON.stringify(error))
        throw error;
    }
    
}

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

export const getChatGptAnswser = (chatGptResponse: ChatGptResponse) => {
    return chatGptResponse.choices?.[0].message?.content ?? "";
}
