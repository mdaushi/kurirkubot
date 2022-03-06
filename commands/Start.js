const { Markup } = require("telegraf")
const auth = require("../middleware/Auth")
const property = 'data'

const start = (bot) =>{
    bot.start( async (ctx) => {
        ctx.reply('Selamat Datang dilayanan Chatbot Kurirku Bantaeng')
        if(ctx[property + 'DB'].get('users').getById(ctx.from.id).value() == undefined){
            await ctx.reply('Ups, telegram kamu belum terdaftar di sistem kami, silahkan klik /daftar untuk bisa menggunakan layanan kami dan atau klik /help untuk informasi lebih lanjut', {
                parse_mode: 'HTML'
            })
        }
    })

    bot.help(ctx => {
        var  response = '<b>Informasi Layanan</b>\n'
        response += '<b>/daftar</b> untuk mendaftar layanan\n'
        response += '<b>/help</b> untuk informasi lebih lanjut\n'
        response += '<b>/umkm</b> untuk informasi UMKM\n'
        response += '<b>/status</b> untuk informasi akun\n'
    
        return ctx.reply(response, {
            parse_mode: 'HTML'
        })
    })
}

module.exports = start
