import { chatgptAxios, telegramOpenAi } from "./utils";
import FormData from 'form-data'
import axios from "axios";

export const ALLOWED_EXTENSIONS = ['m4a', 'mp3', 'mp4', 'mpeg', 'mpga', 'wav', 'webm']
export type TranscriptAudioResult = 'text' | 'verbose_json' | 'vtt' | 'srt'

export const transcriptAudio = async({transcriptUrl, transcriptAudioResult}: {transcriptUrl: string, transcriptAudioResult: TranscriptAudioResult}) => {
    const audio = await axios.get(transcriptUrl, {
        responseType: 'arraybuffer'
      })
    const form = new FormData();
    form.append('file', Buffer.from(audio.data), transcriptUrl);
    form.append('response_format', transcriptAudioResult);
    form.append('model', 'whisper-1');

    try{
    /* const response = await telegramOpenAi.audio.transcriptions.create({
        file:audio.data,
    model: 'whisper-1',
    response_format: transcriptAudioResult
    }) */


    const axiosResponse =  await chatgptAxios.post<string | JSON>('audio/transcriptions', form, {
        headers: {
            ...form.getHeaders()
        }
    });

    return axiosResponse.data;
    }catch(error){
        console.log(JSON.stringify(error))
        throw error;
    }
}