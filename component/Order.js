// 'use strict';
const {MenuTemplate, deleteMenuFromContext, replyMenuToContext, MenuMiddleware} = require('telegraf-inline-menu');
const { getMenu } = require('./getMenus');
const toRupiah = require("@develoka/angka-rupiah-js");
const { order } = require('../config/Databases');
const findDriver = require('../services/bubblesort');
const { getUserById } = require('./getUser');
const { getDataById } = require('./getData');
const { sendToDriver } = require('../services/DriverService');
const DriverComponent = require('./Driver');
const { Markup } = require('telegraf');
const { get } = require('../routes/api');
// const DriverComponent = './Driver.js'
const { default: axios } = require("axios");


const property = 'data'
const onProses = 'messages'

const Order = new MenuTemplate( async ctx => {
    const menuSelected = await getMenu(ctx[property].menuSelected, ctx.match[1].split('-')[1])
    var message = ''
    // return ctx
    message += 'Pesanan : '+menuSelected[0].name+'\n'
    message += 'Harga : '+toRupiah(menuSelected[0].price)+'\n'
    message += `Jumlah : ${ctx[property].quantity || 1}\n`
    message += `Total : ${toRupiah((ctx[property].quantity || 1) * menuSelected[0].price)}`
    return message;
})

Order.select('order', ['-', '+'], {
    isSet: (ctx, key) => ctx[property].order === key,
	set: (ctx, key) => {
        ctx[property].quantity = ctx[property].quantity || 1
        if(key === '-') {
            ctx[property].quantity--;
        }
        if(key === '+') {
            ctx[property].quantity++;
        }
		return '.'
	}
})
// Order.interact('Tujuan', 'tujuan', {
// 	do: async context => {
//         context.answerCbQuery('Lokasi Pengiriman')
// 		// Make sure not to try to update the menu afterwards. You just deleted it and it would just fail to update a missing message.
// 		return false
// 	}
// })
Order.interact('Batalkan Pesanan', 'cancelOrder', {
	do: async context => {
        context[property] = null
        context.reply('Pesanan dibatalkan.')
		await deleteMenuFromContext(context)
		// Make sure not to try to update the menu afterwards. You just deleted it and it would just fail to update a missing message.
		return false
	}
})
Order.interact('Proses Pesanan', 'checkout', {
    joinLastRow: true,
	do: async context => {
        // 452275375
        const url = `${process.env.BASE_URI}/user/islogin/${context.chat.id}`;
        const raw = await axios.get(url)
        const data = raw.data
        const dataOrder = await order.create({
            menuId: context[property].menuSelectedId,
            userId: data.id,
            restoId: context[property].umkmSelected,
            status: 'Mencari Driver',
            quantity: context[property].quantity ?? 1,
        })

        await deleteMenuFromContext(context)
        context.reply('Pesanan diterima. Sedang mencari driver...')
        
        // kirim pesanan ke driver
        await DriverComponent(context, dataOrder.id)
        
		return false
	}
})

module.exports = Order;


