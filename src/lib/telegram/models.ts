import { Context, Scenes } from "telegraf";
import { ChatGptMessage, DalleImageSize } from "../chatgpt/models";
import { IStack } from "../utils/stack";

interface MySceneSession extends Scenes.SceneSessionData {
	imageSize: DalleImageSize;
    messages: IStack<ChatGptMessage>;
}

export interface MyContext extends Context {
    scene: Scenes.SceneContextScene<MyContext, MySceneSession>
}