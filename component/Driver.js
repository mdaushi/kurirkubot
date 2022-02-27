const { MenuTemplate, deleteMenuFromContext } = require("telegraf-inline-menu");
const findDriver = require("../services/bubblesort");
const { getDataById } = require("./getData");
const { getMenu } = require("./getMenus");
const { getUserById } = require("./getUser");
const toRupiah = require("@develoka/angka-rupiah-js");
const axios = require("axios");
const { driverAccepted } = require("../services/DriverService");
const {getOrderById} = require("./getOrderan")
const orderOnProses = require("../services/OrderOnProses")
const property = 'data'

const DriverComponent = async (context, idOrderan) => {
    const menuSelected = await getMenu(context[property].menuSelected, context.match[1].split('-')[1])
    const userPembeli = await getUserById(context[property].user.id)
    const umkm = await getDataById(context[property].umkmSelected)
    var driver = await findDriver();

    context.session.driverActive = driver.length;
    context.session.isDriver = 0;

    // format confirm driver
    var resConfirmDriver = '';
    resConfirmDriver += `Nama Pemesan : ${userPembeli.name} \n`
    resConfirmDriver += `Alamat : ${userPembeli.address} \n`
    resConfirmDriver += `-------------------- \n`
    resConfirmDriver += 'Pesanan : ' + menuSelected[0].name + '\n'
    resConfirmDriver += 'Harga : ' + toRupiah(menuSelected[0].price) + '\n'
    resConfirmDriver += `Jumlah : ${context[property].quantity || 1}\n`
    resConfirmDriver += `Total : ${toRupiah(((context[property].quantity || 1)) * menuSelected[0].price)} \n`
    resConfirmDriver += `-------------------- \n`
    resConfirmDriver += `Nama UMKM : ${umkm.name} \n`
    resConfirmDriver += `Lokasi UMKM : ${umkm.address} \n`

    context.telegram.sendMessage(driver[context.session.isDriver].telegram_id, resConfirmDriver, {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Tolak Pesanan', callback_data: 'tolakPesanan' },
                    { text: 'Terima Pesanan', callback_data: 'terimaPesanan' }
                ]
            ]
        }
    })

    global.bot.action('tolakPesanan', async (ctx) => {
        ctx.tg.deleteMessage(ctx.chat.id, ctx.update.callback_query.message.message_id)

        // sending message to another driver
        context.session.isDriver = context.session.isDriver + 1;
        console.log(context.session.isDriver)
        console.log(context.session.driverActive)
        if (context.session.isDriver < context.session.driverActive) {
            ctx.telegram.sendMessage(driver[context.session.isDriver].telegram_id, resConfirmDriver, {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: 'Tolak Pesanan', callback_data: 'tolakPesanan' },
                            { text: 'Terima Pesanan', callback_data: 'terimaPesanan' }
                        ]
                    ]
                }
            })
        }else{
            const orderan = await getOrderById(idOrderan)
            const user = await getUserById(orderan.userId)
            // kirim informasi ke user
            return ctx.telegram.sendMessage(user.telegram_id, `Maaf, driver tidak ditemukan.`)
        }

    })

    global.bot.action('terimaPesanan', async (ctx) => {
        await driverAccepted(ctx, idOrderan)
        const orderan = await getOrderById(idOrderan)
        const user = await getUserById(orderan.userId)
        // kirim informasi ke user
        ctx.telegram.sendMessage(user.telegram_id, `Pesanan anda telah diterima oleh driver`)
        ctx.tg.deleteMessage(ctx.update.callback_query.message.chat.id, ctx.update.callback_query.message.message_id)
        await orderOnProses(ctx, resConfirmDriver, idOrderan)
    })
}

module.exports = DriverComponent