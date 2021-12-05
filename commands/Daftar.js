const { Markup, session, Scenes: { WizardScene, Stage } } = require('telegraf');
const db = require("../config/Databases");
const auth = require('../middleware/Auth');
const User = db.user;


async function storeData(name, wa, address, status, member, telegram_id)
{
    const data = await User.create({
        name: name,
        wa: wa,
        address: address,
        status: status,
        member: member,
        telegram_id: telegram_id
    });

    return data;
}

function daftar(bot){

    var name, wa, address, status, member;
    const exit_keyboard = Markup.keyboard(['Batalkan']).resize().oneTime();
    const remove_keyboard = Markup.removeKeyboard();
    const registerScene = new WizardScene('registerScene',
        // step 2
		async (ctx) => {
			name = ctx.message.text
			await ctx.reply('Nomor Whatsapp : ', exit_keyboard)
			return ctx.wizard.next()
		},
		// step 3
		async (ctx) => {
			wa = ctx.message.text
			await ctx.reply('Alamat Tempat Tinggal : ', exit_keyboard)
			return ctx.wizard.next()
		},
		// step 4
		async (ctx) => {
			address = ctx.message.text
            status = true
            member = 'user'
            telegram_id = ctx.from.id

            storeData(name, wa, address, status, member, telegram_id)
			await ctx.replyWithHTML('<b>Selamat Registrasi Berhasil.</b>',remove_keyboard)
			return ctx.scene.leave()
		}
    )

    // step 1
    registerScene.enter((ctx) => {
        ctx.reply('Silahkan isi data diri anda');
        ctx.reply('Nama Lengkap :', exit_keyboard);
    });

    const stage = new Stage([registerScene]);
    stage.hears('Batalkan', ctx => {
        ctx.reply('Registrasi dibatalkan', remove_keyboard);
        ctx.scene.leave();
    });

    bot.use(session(), stage.middleware());
    bot.command('daftar', (ctx) => {
        ctx.scene.enter('registerScene');
    })
}

module.exports = daftar