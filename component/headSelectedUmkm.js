const {getData} = require("./getData")

async function headSelectedUmkm(ctx) {
    var pathImage = './assets/image/'
    // find data with id
    const params = ctx.match[1].split('-')[0]
    var data = await getData(params)
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

module.exports = headSelectedUmkm