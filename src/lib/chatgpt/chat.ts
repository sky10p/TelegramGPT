import { CHAT_GPT_MODEL } from "./constants";
import { ChatGptMessage, ChatGptResponse} from "./models";
import { chatgptAxios } from "./utils";


export const sendMessages = async ({messages, maxTokens=500, role}: {messages: ChatGptMessage[], maxTokens?: number, role?: ChatGptMessage}): Promise<ChatGptResponse> => {
    const data = {
        model: CHAT_GPT_MODEL,
        messages: role ? [role, ...messages] : messages,
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
