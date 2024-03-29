require("dotenv").config();

const {MenuTemplate, MenuMiddleware, createBackMainMenuButtons} = require('telegraf-inline-menu');
const {getDataById, getData} = require('../component/getData');
const headSelectedUmkm = require('../component/headSelectedUmkm');
const menus = require("../component/Menus");
const auth = require("../middleware/Auth");
const property = 'data'

async function resto(bot) {
    // get Data
    const data = await getData()
    const arrName = data.map(function(item) {
        return item.name + '-' + item.id
    })

    // information UMKM
    var informationOption = 'Lokasi'
    const informationUmkm = new MenuTemplate( async (ctx) => {
        var data = await getDataById(ctx.match[1].split('-')[1])
        if(informationOption === 'Lokasi'){
            return {
                venue: {
                    location: {
                        latitude: data.latitude,
                        longitude: data.longitude
                    },
                    title: data.name,
                    address: data.address,
                },
            }
        }

        if (informationOption === 'Jadwal Buka') {
            var jadwal = data.jadwal
            var textJadwal = '<b>'+ data.name +'</b> \n <b>Jam Operasional</b> : \n'
            jadwal.map(function(item){
                textJadwal += item.day + ' ' + item.start + ' - ' + item.end + '\n'
            })
            const operasional = {
                text: textJadwal,
                parse_mode: 'html'
            }
            return operasional
        }

        if(informationOption === 'Sumber'){
            const sumber = {
                text: data.sumber,
                parse_mode: 'html'
            }
            return sumber
        }
    });
    informationUmkm.select('typeOption', ['Jadwal Buka', 'Lokasi', 'Sumber'], {
        columns: 1,
        isSet: (_, key) => informationOption === key,
        set: (_, key) => {
            informationOption = key
            return true
        },
    });
    informationUmkm.manualRow(createBackMainMenuButtons())
   
    // selected Umkm
    const selectedUmkm = new MenuTemplate((ctx) => {
        ctx[property].umkmSelected = ctx.match[1].split('-')[1];
        return headSelectedUmkm(ctx)
    });
    selectedUmkm.submenu('Menu', 'menu', menus)

    selectedUmkm.submenu('Informasi', 'info', informationUmkm, {
        joinLastRow: true,
    })

    selectedUmkm.manualRow(createBackMainMenuButtons())

    // daftar umkm
    const menuUmkm = new MenuTemplate(`Silahkan pilih UMKM`);
    // let selectedKey = 'b'

    menuUmkm.chooseIntoSubmenu('select', arrName, selectedUmkm, {
        // set: async (ctx, key) => {
        //     selectedKey = key
        //     // await ctx.answerCbQuery(ctx.match[1]);
        //     return false
        // },
        // isSet: (_, key) => key === selectedKey,
        buttonText: (ctx, key) => {
            return key.split('-')[0]
        },
        columns: 3,
        maxRows: 2,
        getCurrentPage: context => context.session.page,
        setPage: (context, page) => {
            context.session.page = page
        },
    })

    const menuMiddleware = new MenuMiddleware('/', menuUmkm)
    // console.log(menuMiddleware.tree())

    bot.command('umkm', auth, (ctx) => {
        menuMiddleware.replyToContext(ctx)
    })

    bot.use(menuMiddleware)

}

module.exports = resto;
