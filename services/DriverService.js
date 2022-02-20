const { order } = require('../config/Databases');
const property = 'data'
const axios = require('axios');

const driverAccepted = async (context, idOrderan) => {
    const url = `${process.env.BASE_URI}/user/islogin/${context.chat.id}`;
    const raw = await axios.get(url)
    const data = raw.data

    const driverId = data.id
    return order.update({
        status : 'Pesanan diterima',
        driverId : driverId
    }, {
        where: {
            id: idOrderan
        }
    })
}

module.exports = {
    driverAccepted
}