const { user } = require("../config/Databases");
const auth = require("../middleware/Auth");
const { Markup } = require("telegraf");


async function isUser(telegram_id) {
    var data = await user.findAll({
        where: {
            telegram_id: telegram_id,
        }
    })

    var dataJSON = JSON.parse(JSON.stringify(data))
    if(dataJSON[0].member == 'user'){
        return true
    }
    return false
}

async function status(bot) {
    bot.command('status', auth ,async (ctx) => {
        const userOrDriver = await isUser(ctx.from.id)
        if(userOrDriver){
            var data = await user.findAll({
                where: {
                    telegram_id: ctx.from.id,
                    member: 'user'
                }
            })

            var dataJSON = JSON.parse(JSON.stringify(data))
           
            dataJSON[0].status == false ? textResponse = '<b>Kamu belum terdaftar</b>\n' : textResponse = '<b>Kamu telah terdaftar</b>\n'

            return responseStatus(textResponse, ctx, 'user')
        }
        var data = await user.findAll({
            where: {
                telegram_id: ctx.from.id,
                member: 'driver'
            }
        })

        var dataJSON = JSON.parse(JSON.stringify(data))

        dataJSON[0].status == false ? textResponse = '<b>Status Driver Tidak Aktif, kamu tidak bisa menerima orderan</b>\n' : textResponse = '<b>Status Driver Aktif, kamu bisa menerima orderan</b>\n'

        return responseStatus(textResponse, ctx, 'driver')
    })

    bot.action('aktifkan', auth, async (ctx) => {
        await user.update({
            status: true
        },{
            where: {
                telegram_id: ctx.from.id
            }
        })

        ctx.reply('Status Driver telah diaktifkan')
        return ctx.answerCbQuery('Status Driver telah diaktifkan')
    })

    bot.action('nonaktifkan', auth, async (ctx) => {
        await user.update({
            status: false
        },{
            where: {
                telegram_id: ctx.from.id
            }
        })

        ctx.reply('Status Driver telah dinonaktifkan')
        return ctx.answerCbQuery('Status Driver telah dinonaktifkan')
    })
    
}

function responseStatus(text, ctx, member) {
    if(member == 'user'){
        return ctx.reply(text, {
            parse_mode: 'HTML'
        })
    }
    return ctx.reply(text, {
        parse_mode: 'HTML',
        ...Markup.inlineKeyboard([
            Markup.button.callback('Aktifkan', 'aktifkan'),
            Markup.button.callback('Non Aktifkan', 'nonaktifkan')
        ])
    })
}
module.exports = status;