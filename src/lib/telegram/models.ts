import { ChatActions } from "../../lib/chatgpt/roles/chatRoles";
import { Context, Scenes } from "telegraf";
import { ChatGptMessage, DalleImageSize } from "../chatgpt/models";
import { IStack } from "../utils/stack";

interface MySceneSession extends Scenes.WizardSessionData {
	imageSize: DalleImageSize;
    messages: IStack<ChatGptMessage>;
    language: string;
    chatAction: ChatActions;
}

export interface BaseContext extends Context {
    scene: Scenes.SceneContextScene<BaseContext, MySceneSession>
    wizard: Scenes.WizardContextWizard<BaseContext>
    
}

export interface MyContext extends BaseContext {
    session: MySceneSession
}