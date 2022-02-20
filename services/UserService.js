const { user, order } = require("../config/Databases")

const getTelegramIdByOrderanId = async (orderanId) => {
    var orderan = await order.findByPk(orderanId)
    var userId = await user.findByPk(orderan.dataValues.userId)
    var driver = await user.findByPk(orderan.dataValues.driverId)
    
    return {
        driver: driver.dataValues.telegram_id,
        user: userId.dataValues.telegram_id
    }
}

module.exports = {
    getTelegramIdByOrderanId
}