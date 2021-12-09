const axios = require('axios');
require("dotenv").config();
const fs = require('fs')
const {MenuTemplate, MenuMiddleware, createBackMainMenuButtons} = require('telegraf-inline-menu')

async function getData(params = '') {
    const url = `${process.env.BASE_URI}/resto?name=${params}`
    const raw = await axios.get(url)
    const data = raw.data
    return data
}

async function headSelectedUmkm(ctx) {
    var pathImage = './assets/image/'
    // find data with id
    var data = await getData(ctx.match[1])
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
        text: '<b>'+ data[0].name + ' - '+ data[0].address +'</b> \n' + data[0].description + '\n' + `(${data[0].category})`,
        parse_mode: 'html'
    }
}

async function resto(bot) {
    // get Data
    const data = await getData()
    const arrName = data.map(function(item) {
        return item.name
    })

    // information UMKM
    const informationUmkm = new MenuTemplate('informasi');
    informationUmkm.url('Text', 'https://edjopato.de')
    informationUmkm.manualRow(createBackMainMenuButtons())

    
    // selected Umkm
    const selectedUmkm = new MenuTemplate((ctx) => headSelectedUmkm(ctx));
    selectedUmkm.interact('Menu', 'menu', {
        do: async ctx => {
            console.log('Take a look at ctx.match. It contains the chosen city', ctx.match)
            await ctx.answerCbQuery('You hit a button in a submenu')
            return false
        }
    })
    selectedUmkm.submenu('Informasi', 'info', informationUmkm, {
        joinLastRow: true,
    })

    selectedUmkm.manualRow(createBackMainMenuButtons())

    // daftar umkm
    const menuUmkm = new MenuTemplate(`Silahkan pilih UMKM`);
    let selectedKey = 'b'

    menuUmkm.chooseIntoSubmenu('select', arrName, selectedUmkm, {
        set: async (ctx, key) => {
            selectedKey = key
            // await ctx.answerCbQuery(key);
            return false
        },
        isSet: (_, key) => key === selectedKey,
        columns: 3,
        maxRows: 2,
        getCurrentPage: context => context.session.page,
        setPage: (context, page) => {
            context.session.page = page
        },
    })

    const menuMiddleware = new MenuMiddleware('/', menuUmkm)

    bot.command('umkm', (ctx) => {
        menuMiddleware.replyToContext(ctx)
    })

    bot.use(menuMiddleware)

}

module.exports = resto;
