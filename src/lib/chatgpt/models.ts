
export type ChatGptRole = 'system' | 'assistant' | 'user'
export type ChatGptModel = 'gpt-3.5-turbo-1106' | 'gpt-4-1106-preview';
export enum ChatGptModelEnum {
    GPT_3 = 'gpt-3.5-turbo-1106',
    GPT_4 = 'gpt-4-1106-preview'
}
export type ChatGptMessage = {
    role: ChatGptRole,
    content: string;
}

export type ChatGptOperation = 'completion';
export type DalleOperation = 'generations';

export type ChatGptUsageResponse ={
    operation: ChatGptOperation,
    n_context_tokens_total: number;
    n_generated_tokens_total: number;
}

export type DalleImageSize = '1024x1024' | '512x512' | '256x256'

export type DalleUsageResponse = {
    num_images: number,
    image_size: DalleImageSize,
    operation: DalleOperation
}

export type DailyUsageResponse = {
    data: ChatGptUsageResponse[],
    dalle_api_data: DalleUsageResponse[],
}

export type MonthlyUsageResponse = {
    total_usage: number
}

export type ChatGptUsage = {
    tokens: number,
    price: number
}

export type DalleUsage = {
    numImages: number,
    price: number
}

export type Usage = ChatGptUsage & DalleUsage;

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

export type DalleResponse = {
    created: string,
    data: {
        url: string
        
    }[],
   
}