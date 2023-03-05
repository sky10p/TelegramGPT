import axios from "axios";
import { OPEN_AI_CONFIG } from "../../config/openai.config";
import { CHAT_GPT_MODEL } from "./constants";
import { ChatGptMessage, ChatGptResponse } from "./models";

const chatgptAxios = axios.create({baseURL: 'https://api.openai.com/v1/chat', headers: {
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
    const axiosResponse =  await axios.post<ChatGptResponse>('https://api.openai.com/v1/chat/completions', data, {
        headers: {
            Authorization: `Bearer ${OPEN_AI_CONFIG.KEY}`,
            "Content-Type": 'application/json'
        }
    });
    return axiosResponse.data;
    }catch(error){
        console.log(JSON.stringify(error))
        throw error;
    }
    
}

export const getChatGptAnswser = (chatGptResponse: ChatGptResponse) => {
    return chatGptResponse.choices?.[0].message?.content ?? "";
}
