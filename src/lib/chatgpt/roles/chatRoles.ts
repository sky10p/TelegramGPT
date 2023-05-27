
export type ChatActions = 'summarize' | 'key_points' | 'improve' | 'commit';
export const chatRoles: Record<ChatActions, (language: string) => string> = {
    summarize: (language: string) => `Resume el siguiente texto en ${language} de manera precisa y clara`,
    key_points: (language: string) => `Remarca los puntos(los más importantes) en ${language} del siguiente texto`,
    improve: (language: string) => `Intenta comprender la finalidad del texto siguiente, y mejora la calidad del texto sin cambiar su significado, intención o tono de la conversación, además no debes añadir o quitar información, en ${language}`,
    commit: () => `Escribe un commit bien explicado de git según el texto escrito a continuación (un texto poco detallado e informal explicando los cambios), debes mejorarlo pero sin inventarte nueva información respecto al original siguiendo la especificación de conventional commit en inglés`
}
