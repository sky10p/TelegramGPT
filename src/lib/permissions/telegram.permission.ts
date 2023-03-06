import { TELEGRAM_CONFIG } from "../../config/telegram.config"

export const isAllowed = ({telegramUserId}: {telegramUserId: number}) => {
    return TELEGRAM_CONFIG.ALLOWED_USERS.includes(telegramUserId.toString(10));
}