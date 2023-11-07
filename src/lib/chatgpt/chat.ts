import { CHAT_GPT_MODEL } from "./constants";
import { ChatGptMessage, ChatGptResponse} from "./models";
import { getModel } from "./settings";
import { telegramOpenAi } from "./utils";


export const sendMessages = async ({messages, maxTokens=500, role}: {messages: ChatGptMessage[], maxTokens?: number, role?: ChatGptMessage}): Promise<ChatGptResponse> => {
    const model = await getModel();
    const data = {
        model: model ?? CHAT_GPT_MODEL,
        messages: role ? [role, ...messages] : messages,
        max_tokens: maxTokens
    }
    try{
    const chatCompletions = await telegramOpenAi.chat.completions.create(data);
    
    return {
        id: chatCompletions.id,
        object: chatCompletions.object,
        created: new Date(chatCompletions.created),
        choices: chatCompletions.choices.map(choice => ({
            index: choice.index,
            message: {
                role: choice.message.role,
                content: choice.message.content ?? "No content"
            },
            finish_reason: choice.finish_reason
        })),
        usage: {
            prompt_tokens: chatCompletions?.usage?.prompt_tokens ?? 0,
            completion_tokens: chatCompletions?.usage?.completion_tokens ?? 0,
            total_tokens: chatCompletions?.usage?.total_tokens ?? 0
        }
    }
    }catch(error){
        console.log(JSON.stringify(error))
        throw error;
    }
    
}

export const getChatGptAnswser = (chatGptResponse: ChatGptResponse) => {
    return chatGptResponse.choices?.[0].message?.content ?? "";
}
