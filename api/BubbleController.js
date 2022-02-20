const { Op } = require("sequelize");
const { user } = require("../config/Databases");

const bubbleSort = async (req, res) => {
    try {
        var users = await user.findAll({
            include: 'orderCount',
            where: {
                member: 'driver',
                status: true
            }
        });
        
        users.map(function(user){
            const count = user.orderCount.length
            user.dataValues.totalOrder = count
        })
        res.send(users);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    bubbleSort
}