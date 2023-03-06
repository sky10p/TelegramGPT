import { CHAT_GPT_MODEL } from "./constants";
import { ChatGptMessage, ChatGptResponse} from "./models";
import { chatgptAxios } from "./utils";


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

export const getChatGptAnswser = (chatGptResponse: ChatGptResponse) => {
    return chatGptResponse.choices?.[0].message?.content ?? "";
}
