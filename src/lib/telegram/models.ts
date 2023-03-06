import { Context, Scenes } from "telegraf";
import { DalleImageSize } from "../chatgpt/models";

interface MySceneSession extends Scenes.SceneSessionData {
	imageSize: DalleImageSize;
}

export interface MyContext extends Context {
    scene: Scenes.SceneContextScene<MyContext, MySceneSession>
}