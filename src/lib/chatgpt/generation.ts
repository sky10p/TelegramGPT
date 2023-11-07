import { DalleImageSize, DalleResponse } from "./models";
import { telegramOpenAi } from "./utils";

export const generationImage = async ({prompt, imageSize}: {prompt: string, imageSize: DalleImageSize}): Promise<DalleResponse> => {
    const data = {
        prompt,
        size: imageSize
    }
    try{
    const response = await telegramOpenAi.images.generate({
        model: "dall-e-3",
        prompt,
        size: imageSize
    });
    
    return {
        created: new Date(response.created).toISOString(),
        data: response.data.map(element => {
            return {
                url: element.url ?? ""
            }
        })
    };
    }catch(error){
        console.log(JSON.stringify(error))
        console.log(error.message)
        throw error;
    }
    
}

export const getUrlImage = (dalleResponse: DalleResponse) => {
    return dalleResponse.data[0].url;
}