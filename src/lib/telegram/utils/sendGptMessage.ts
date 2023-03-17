import { ChatGptMessage } from "../../../lib/chatgpt/models";
import { getChatGptAnswser, sendMessages } from "../../../lib/chatgpt/chat";
import { telegramGptRole } from "../../../lib/chatgpt/roles/telegramGptRole";

export const sendGptMessage = async ({message, role = telegramGptRole}: {message: string, role?: ChatGptMessage}): Promise<string> => {
    const messages= await sendMessages({
        messages: [{role: 'user', content: message}],
        role
    });

    return getChatGptAnswser(messages);
}