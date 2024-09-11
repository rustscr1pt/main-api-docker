function botSendMessage(bot, message) { // bot: TelegramBot, message:string
    bot.sendMessage("-1002156530519", message)
}

module.exports = {botSendMessage}