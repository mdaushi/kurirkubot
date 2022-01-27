// import libs
const { Telegraf, Markup } = require("telegraf");
require("dotenv").config();
const express= require('express');
// const cors = require('cors');
const Router = require('./routes/api');


// config
const db = require("./config/Databases");
const app=express();
// use express json
app.use(express.json());
// use cors
// app.use(cors());
// use router
app.use(Router);
app.use(express.static('assets'));


// required
const auth = require("./middleware/Auth");
const isCommands = require("./middleware/isCommands");
const { default: axios } = require("axios");

// db.sequelize.sync({
//   alter: true,
//   // force: true,
// });

const bot = new Telegraf(process.env.TELEGRAM_KEY);

/**
 * Middleware
 * every command is initalized with this middleware
 */

// bot.use(async (ctx, next) => {
//     const isAuth = await auth(ctx)
//     if(isAuth){
//         return next();
//     }
//     return ctx.reply('Anda belum terdaftar, silahkan daftar terlebih dahulu.')
// });

bot.use(async (ctx, next) => {
    const id = ctx.chat.id
    const url = `${process.env.BASE_URI}/user/islogin/${id}`;
    const raw = await axios.get(url)
    const data = raw.data
    
    const isSession = {
        [id]: data
    }
    ctx.session = isSession
    return next()
})

// commands
require("./commands/Daftar")(bot);
require("./commands/UmkmCommand")(bot);


bot.launch();
// Markup.removeKeyboard();
const port=9000;
app.listen(port, () =>{
    console.log('Server started');
})

