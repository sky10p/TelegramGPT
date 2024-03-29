import axios from "axios";
import { OPEN_AI_CONFIG } from "../../config/openai.config";
import OpenAI from "openai";

export const chatgptAxios = axios.create({baseURL: 'https://api.openai.com/v1', headers: {
    Authorization: `Bearer ${OPEN_AI_CONFIG.KEY}`,
    "Content-Type": 'application/json'
}});

export const dashboardOpenAiAxios = axios.create({baseURL: 'https://api.openai.com/dashboard/billing', headers: {
    Authorization: `Bearer ${OPEN_AI_CONFIG.KEY}`,
    "Content-Type": 'application/json'
}});

export const telegramOpenAi = new OpenAI({
    apiKey: OPEN_AI_CONFIG.KEY
})