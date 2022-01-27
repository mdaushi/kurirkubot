const {MenuTemplate, createBackMainMenuButtons} = require('telegraf-inline-menu');
const headSelectedMenu = require("../component/headSelectedMenu");
const {getMenus} = require("../component/getMenus");
const Order = require('./Order');

async function getDataMenus(umkmId){
    const menusRaw = await getMenus(umkmId)
    const arrMenu = menusRaw.map(function(item) {
        return item.name + '-' + item.id
    })
    return arrMenu
}

async function menuIsSelected(menuSelected, id) {
    const data = await getDataMenus(id)
    if(data.includes(menuSelected)){
        return false
    }
    return true
}

// menu UMKM
var menuOption = 'menu'
const menu = new MenuTemplate( async ctx =>{
    return headSelectedMenu(menuOption, ctx.match[1].split('-')[1])
})

menu.select('menuOption', ctx => {
    ctx.session.menuSelected = menuOption.split('-')[0]
    ctx.session.menuSelectedId = menuOption.split('-')[1]
    return getDataMenus(ctx.match[1].split('-')[1])
}, {
    columns: 2,
    maxRows: 5,
    isSet: (_, key) => menuOption === key,
    set: (_, key) => {
        menuOption = key
        return true
    },
    buttonText: (ctx, key) => {
        return key.split('-')[0]
    },
    getCurrentPage: context => context.session.page,
    setPage: (context, page) => {
        context.session.page = page
    }
})
menu.manualRow(createBackMainMenuButtons())

menu.chooseIntoSubmenu('pesan', ['Pesan'], Order, {
    hide: (ctx) => menuIsSelected(menuOption, ctx.match[1].split('-')[1])
})



module.exports = menu;