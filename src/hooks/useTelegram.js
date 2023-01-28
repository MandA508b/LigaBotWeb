const tg = window.Telegram.WebApp

export function useTelegram() {
    const onClose = () => tg.close()
    return {tg, onClose, user: tg.initDataUnsafe?.user}
}