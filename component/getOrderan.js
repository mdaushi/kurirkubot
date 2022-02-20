const {order} = require('../config/Databases')

async function getOrderById(id) {
    const data = await order.findByPk(id)
    return data.dataValues
}

module.exports = {
    getOrderById
}