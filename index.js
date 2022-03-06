// import libs
const { Telegraf, session } = require("telegraf");
require("dotenv").config();
const express = require('express');
// const cors = require('cors');
const Router = require('./routes/api');
const LocalSession = require('telegraf-session-local')


// config
const db = require("./config/Databases");
const app = express();
// use express json
app.use(express.json());
// use cors
// app.use(cors());
// use router
app.use(Router);
app.use(express.static('assets'));


// required
// const auth = require("./middleware/Auth");
// const isCommands = require("./middleware/isCommands");
const { default: axios } = require("axios");

// db.sequelize.sync({
//   alter: true,
//   // force: true,
// });

const bot = new Telegraf(process.env.TELEGRAM_KEY);
global.bot = bot;
// Name of session property object in Telegraf Context (default: 'session')
const property = 'data'

const localSession = new LocalSession({
    // Database name/path, where sessions will be located (default: 'sessions.json')
    database: 'session.txt',
    // Name of session property object in Telegraf Context (default: 'session')
    property: 'session',
    // Type of lowdb storage (default: 'storageFileSync')
    storage: LocalSession.storageFileAsync,
    // Format of storage/database (default: JSON.stringify / JSON.parse)
    format: {
        serialize: (obj) => JSON.stringify(obj, null, 2), // null & 2 for pretty-formatted JSON
        deserialize: (str) => JSON.parse(str),
    },
    // We will use `messages` array in our database to store user messages using exported lowdb instance from LocalSession via Telegraf Context
    state: { users: [] }
})

// Wait for database async initialization finished (storageFileAsync or your own asynchronous storage adapter)
localSession.DB.then(DB => {
    // Database now initialized, so now you can retrieve anything you want from it
    console.log('Current LocalSession DB:', DB.value())
    // console.log(DB.get('sessions').getById('1:1').value())
})

// Telegraf will use `telegraf-session-local` configured above middleware with overrided `property` value: `data`, instead of `session`
bot.use(localSession.middleware(property))
/**
 * Middleware
 * every command is initalized with this middleware
 */

// bot.use(async (ctx, next) => {
//     const id = ctx.chat.id
//     const url = `${process.env.BASE_URI}/user/islogin/${id}`;
//     const raw = await axios.get(url)
//     const data = raw.data
    
//     const isSession = {
//         [id]: data
//     }
//     ctx.session = isSession
//     return next()
// })

// commands
require("./commands/Start")(bot);
require("./commands/Daftar")(bot);
require("./commands/UmkmCommand")(bot);
require("./commands/Status")(bot);
bot.command("kontak", (ctx) => {
    // ctx.tg.sendContact(ctx.chat.id, '087850075180', 'Aqri', {
    //     protect_content: true,
    //     vcard: 'Banteng',

    // })
    ctx.tg.sendMessage(ctx.chat.id, 'Aqri', {
        parse_mode: 'HTML',
    })
})


bot.launch();
// Markup.removeKeyboard();
const port = 9000;
app.listen(port, () => {
    console.log('Server started');
})

