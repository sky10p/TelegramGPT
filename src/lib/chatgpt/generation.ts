import { DalleImageSize, DalleResponse } from "./models";
import { chatgptAxios } from "./utils";

export const generationImage = async ({prompt, imageSize}: {prompt: string, imageSize: DalleImageSize}): Promise<DalleResponse> => {
    const data = {
        prompt,
        imageSize
    }
    try{
    const axiosResponse =  await chatgptAxios.post<DalleResponse>('images/generations', data);
    return axiosResponse.data;
    }catch(error){
        console.log(JSON.stringify(error))
        throw error;
    }
    
}

export const getUrlImage = (dalleResponse: DalleResponse) => {
    return dalleResponse.data[0].url;
}