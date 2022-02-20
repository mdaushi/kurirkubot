const { Markup } = require("telegraf")
const auth = require("../middleware/Auth")
const property = 'data'

const start = (bot) =>{
    bot.start( async (ctx) => {
        ctx.reply('Selamat Datang dilayanan Chatbot Kurirku Bantaeng')
        if(ctx[property + 'DB'].get('users').getById(ctx.from.id).value() == undefined){
            await ctx.reply('Ups, telegram kamu belum terdaftar di sistem kami, silahkan klik daftar untuk bisa menggunakan layanan kami dan atau klik help untuk informasi lebih lanjut', {
                parse_mode: 'HTML',
                ...Markup.inlineKeyboard([
                    Markup.button.callback('Daftar', 'Daftar'),
                    Markup.button.callback('Help', 'Help')
                ])
            })
        }
    })
}

module.exports = start
