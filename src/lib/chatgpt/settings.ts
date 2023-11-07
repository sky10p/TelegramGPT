import { open } from "sqlite"
import sqlite3 from "sqlite3"
import { ChatGptModel } from "./models"

export const setModel = async (modelName:ChatGptModel ) => {
    const db = await open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    });

    await db.run('CREATE TABLE IF NOT EXISTS model (name TEXT)')
    await db.run('DELETE FROM model')
    await db.run('INSERT INTO model (name) VALUES (?)', modelName)
}

export const getModel = async (): Promise<ChatGptModel> => {
    const db = await open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    });

    const result = await db.get('SELECT name FROM model')
    await db.close();
    if(!result || !result.name) {
        return 'gpt-3.5-turbo-1106';
    }

    return result.name;
}