// 'use strict';
const {MenuTemplate, deleteMenuFromContext} = require('telegraf-inline-menu');
const { getMenu } = require('./getMenus');
const toRupiah = require("@develoka/angka-rupiah-js");
const { order } = require('../config/Databases');

const Order = new MenuTemplate( async ctx => {
    const menuSelected = await getMenu(ctx.session.menuSelected, ctx.match[1].split('-')[1])
    var message = ''
    // return ctx
    message += 'Pesanan : '+menuSelected[0].name+'\n'
    message += 'Harga : '+toRupiah(menuSelected[0].price)+'\n'
    message += `Jumlah : ${ctx.session.quantity || 1}\n`
    message += `Total : ${toRupiah((ctx.session.quantity || 1) * menuSelected[0].price)}`
    return message;
})

Order.select('order', ['-', '+'], {
    isSet: (ctx, key) => ctx.session.order === key,
	set: (ctx, key) => {
        ctx.session.quantity = ctx.session.quantity || 1
        if(key === '-') {
            ctx.session.quantity--;
        }
        if(key === '+') {
            ctx.session.quantity++;
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
        context.session = null
        context.reply('Pesanan dibatalkan.')
		await deleteMenuFromContext(context)
		// Make sure not to try to update the menu afterwards. You just deleted it and it would just fail to update a missing message.
		return false
	}
})
Order.interact('Proses Pesanan', 'checkout', {
    joinLastRow: true,
	do: async context => {
        // const menuSelected = await getMenu(ctx.session.menuSelected, ctx.match[1].split('-')[1])
        // await order.create({
        //     menuId: menuSelected[0].id,
        //     userId: context.session.userId,

        // })
        // 452275375
        context.telegram.sendMessage('452275375','Pesanan berhasil ditambahkan.')
        context.answerCbQuery('Checkout.')
		// Make sure not to try to update the menu afterwards. You just deleted it and it would just fail to update a missing message.
		return false
	}
})

module.exports = Order;


