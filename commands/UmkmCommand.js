const db = require("../config/Databases");
const umkm = db.umkm;
const fetch = require('node-fetch').default
const axios = require('axios');

function resto(bot) {
    bot.inlineQuery(/umkm\s.+/, async (ctx) => {
        var query = ctx.inlineQuery.query.replace('umkm ', '');
        const apiUrl = `http://localhost:9000/resto?name=${query}`;
        var res = await axios.get(apiUrl);
        var resArray = res.data;
        var result = resArray.map(function (item, index) {
            return {
                type: "article",
                id: String(index),
                title: item.name,
                description: `${item.description} \n ${item.address} \n ${item.telp}`,
                input_message_content: {
                    message_text: `${item.name} \n ${item.description}`
                },
                hide_url: false,
                thumb_url: item.image
            }
        })
        return await ctx.answerInlineQuery(result)
    });
    bot.on('chosen_inline_result', ({ chosenInlineResult }) => {
        console.log('chosen inline result', chosenInlineResult)
    })
}

module.exports = resto;
