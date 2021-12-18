const {MenuTemplate, createBackMainMenuButtons} = require('telegraf-inline-menu');
const headSelectedMenu = require("../component/headSelectedMenu");
const {getMenus} = require("../component/getMenus");

async function getDataMenus(umkmId){
    const menusRaw = await getMenus(umkmId)
    const arrMenu = menusRaw.map(function(item) {
        return item.name
    })
    return arrMenu
}

// menu UMKM
var menuOption = 'menu'
const menu = new MenuTemplate( async ctx =>{
    return headSelectedMenu(menuOption, ctx.match[1].split('-')[1])
})

menu.select('menuOption', ctx => {
    return getDataMenus(ctx.match[1].split('-')[1])
}, {
    columns: 2,
    maxRows: 5,
    isSet: (_, key) => menuOption === key,
    set: (_, key) => {
        menuOption = key
        return true
    },
    getCurrentPage: context => context.session.page,
    setPage: (context, page) => {
        context.session.page = page
    }
})
menu.manualRow(createBackMainMenuButtons())

module.exports = menu;