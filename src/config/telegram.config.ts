export const TELEGRAM_CONFIG = {
    KEY: process.env.TELEGRAM_BOT || "",
    ALLOWED_USERS: (process.env.ALLOWED_USERS || "").split(",")
}
