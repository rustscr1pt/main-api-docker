const TelegramBot = require('node-telegram-bot-api');
const {token} = require("../structs/constants");

function initBot() {
    const bot = new TelegramBot(token(), {polling: true});
    console.log('Bot for tg is initialized')
    return bot
}

module.exports = {initBot};