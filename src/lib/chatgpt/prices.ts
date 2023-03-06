import { ChatGptOperation, DalleImageSize, DalleOperation } from "./models"

const dalleSizesPrice: Record<DalleImageSize, number> = {
    '1024x1024': 0.020,
    "512x512": 0.018,
    "256x256": 0.016
}

export const PRICES = {
    'completion': (tokens: number) => tokens /1000 * 0.002,
    'generations': (numImages: number, imageSize: DalleImageSize) => {
        return numImages * dalleSizesPrice[imageSize]
    }
}

export const getTokensPrice = (operation: ChatGptOperation, tokens: number) => {
    return PRICES[operation](tokens);
}

export const getImagesPrice = (operation: DalleOperation, numImages: number, imageSize: DalleImageSize) => {
    return PRICES[operation](numImages, imageSize)
}