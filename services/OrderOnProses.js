const { Markup } = require("telegraf")
const { getTelegramIdByOrderanId } = require("./UserService")

async function orderOnProses(ctx, text, idOrderan) {
    var resText = ''
    resText += `*Pesanan Dalam Proses* \n`
    resText += text

    var userDriver = await getTelegramIdByOrderanId(idOrderan)
   
    // driver
    ctx.reply(resText, {
        parse_mode: 'Markdown',
        ...Markup.inlineKeyboard([
            Markup.button.url('Chat Pembeli', 'tg://user?id=' + userDriver.user),
        ]).resize()
    })

    // user
    ctx.tg.sendMessage(userDriver.user, resText, {
        parse_mode: 'Markdown',
        ...Markup.inlineKeyboard([
            [
                Markup.button.url('Chat Driver', 'tg://user?id=' + userDriver.driver),
                Markup.button.callback('Pesanan Selesai', 'pesananSelesai'),
            ]
        ])
    })

    // pesanan selesai
    global.bot.action('pesananSelesai', async (ctx) => {
        ctx.tg.deleteMessage(ctx.update.callback_query.message.chat.id, ctx.update.callback_query.message.message_id)
        ctx.tg.sendMessage(userDriver.driver, `Pesanan telah selesai`)

        var pesananSelesai = ''
        pesananSelesai += `*Pesanan Selesai* \n`
        pesananSelesai += text
        ctx.tg.sendMessage(userDriver.user, pesananSelesai, {
            parse_mode: 'Markdown',
        })
        ctx.tg.sendMessage(userDriver.user, 'Pesanan telah selesai')
    })

}

module.exports = orderOnProses