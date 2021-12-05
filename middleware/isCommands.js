const auth = require("./Auth");

/**
 * every command that requires regis is here
 * @param {*} command 
 * @returns 
 */
async function isCommands(ctx, next) {

    // commands with middleware
    const commands = ['/start', '/info', '/resto'];
            
    if(commands.find((str) => str === ctx.message.text)){
        await isAuth(ctx.chat.id, ctx, next);
    }

    if(ctx.message.text === '/daftar'){
        if(await auth(ctx.chat.id) == true){
            return ctx.reply("Anda sudah terdaftar.");
        }
        return await next();
    }
    if(ctx.message.text === 'Batalkan'){
        return await next();
    }

    // return await next();
}

async function isAuth(id, ctx, next) {
    if(await auth(id) == false){
        return ctx.reply("Anda belum terdaftar, ketik /daftar untuk membuat akun");
    }
    return await next();
}

module.exports = isCommands;