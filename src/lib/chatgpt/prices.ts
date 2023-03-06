import { ChatGptOperation } from "./models"

export const PRICES = {
    'completion': (tokens: number) => tokens /1000 * 0.002
}

export const getPrice = (operation: ChatGptOperation, tokens: number) => {
    return PRICES[operation](tokens);
}