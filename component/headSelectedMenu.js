"use strict";
const getMenus = require("./getMenus")
const toRupiah = require("@develoka/angka-rupiah-js")

async function headSelectedMenu(menuOption, id) {
    var pathImage = './assets/image/'
    var data = await getMenus.getMenu(menuOption, id)
    if(data.length === 0){
        return 'Silahkan Pilih Menu'
    }
    if(data[0].image){
        var image = pathImage + data[0].image
    }else{
        var image = pathImage + 'no-image.jpg'
    }
    return {
        type: 'photo',
		media: {
			source: image
		},
		text: `*${data[0].name} - ${toRupiah(data[0].price)}*`,
		parse_mode: 'Markdown'
    }
}

module.exports = headSelectedMenu