
export type ChatActions = 'summarize' | 'key_points' | 'improve' | 'commit';
export const chatRoles: Record<ChatActions, (language: string) => string> = {
    summarize: (language: string) => `Resume el siguiente texto en ${language} de manera precisa y clara`,
    key_points: (language: string) => `Remarca los puntos(los más importantes) en ${language} del siguiente texto`,
    improve: (language: string) => `Mejora la calidad y explicación del siguiente texto, y escríbelo en ${language}`,
    commit: () => `Crea un commit bien explicado de git según el texto del usuario(solo describe los cambios no el commit), siguiendo la especificación de conventional commit en inglés`
}
