const { Op } = require("sequelize");
const { user } = require("../config/Databases");

const bubbleSort = async (req, res) => {
    try {
        var users = await user.findAll({
            where: {
                member: 'driver',
                status: true
            }
        });
        res.send(users);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    bubbleSort
}