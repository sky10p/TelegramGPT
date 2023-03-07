import { Scenes } from "telegraf";
import { MyContext } from "../models";
import { chatScene } from "./ChatScene";
import { generationImageScene } from "./GenerationImageScene";
import { insertPromptImageScene } from "./InsertPromptImageScene";

export enum STAGE {
    chat = "chat",
    generationImage = "generationImage",
    insertPromptImage = "insertPromptImage"
}

export const stage = new Scenes.Stage<MyContext>([chatScene, generationImageScene, insertPromptImageScene]);