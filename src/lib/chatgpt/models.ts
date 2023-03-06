
export type ChatGptRole = 'system' | 'assistant' | 'user'
export type ChatGptMessage = {
    role: ChatGptRole,
    content: string;
}

export type DailyUsageResponse = {
    data: {
        operation: 'completion',
        n_context_tokens_total: number;
        n_generated_tokens_total: number;
    }[]
}

export type DailyUsage = {
    tokens: number,
    price: number
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