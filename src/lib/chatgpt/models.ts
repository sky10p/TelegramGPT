
export type ChatGptRole = 'system' | 'assistant' | 'user'
export type ChatGptMessage = {
    role: ChatGptRole,
    content: string;
}

export type ChatGptResponse = {
    id: string,
    object: string,
    created: Date,
    choices: {
        index: number,
        message: ChatGptMessage,
        finish_reason: string
    }[],
    usage: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    }
}