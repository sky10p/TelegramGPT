import { Scenes } from "telegraf";
import { BaseContext, MyContext } from "../models";
import { askLanguageScene } from "./AskLanguage";
import { askPromptScene } from "./AskPrompt";
import { chatScene } from "./ChatScene";
import { generationImageScene } from "./GenerationImageScene";
import { insertPromptImageScene } from "./InsertPromptImageScene";

export enum STAGE {
    chat = "chat",
    generationImage = "generationImage",
    insertPromptImage = "insertPromptImage",
    askLanguage = "askLanguage",
    askPrompt = "askPrompt",
}

export const stage = new Scenes.Stage<BaseContext>([chatScene, generationImageScene, insertPromptImageScene, askLanguageScene, askPromptScene]);