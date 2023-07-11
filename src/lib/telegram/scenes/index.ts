import { Scenes } from "telegraf";
import { BaseContext, MyContext } from "../models";
import { askLanguageScene } from "./AskLanguageScene";
import { askPromptScene } from "./AskPromptScene";
import { chatScene } from "./ChatScene";
import { generationImageScene } from "./GenerationImageScene";
import { insertPromptImageScene } from "./InsertPromptImageScene";
import { transcriptFormatScene } from "./TranscriptFormatScene";
import { transcriptScene } from "./TranscriptScene";
import { settingsScene } from "./SettingsScene";

export enum STAGE {
  chat = "chat",
  generationImage = "generationImage",
  insertPromptImage = "insertPromptImage",
  askLanguage = "askLanguage",
  askPrompt = "askPrompt",
  transcript = "transcript",
  transcriptFormat = "transcriptFormat",
  settings = "settings",
}

export const stage = new Scenes.Stage<BaseContext>([
  chatScene,
  generationImageScene,
  insertPromptImageScene,
  askLanguageScene,
  askPromptScene,
  transcriptScene,
  transcriptFormatScene,
  settingsScene
]);
