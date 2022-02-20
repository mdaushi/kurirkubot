const { user } = require("../config/Databases");

const isLogin = async (req, res) => {
    const id = req.params.id
    try {
        var users = await user.findAll({
            where: {
                status: true,
                telegram_id: id
            }
        });
        res.send(users[0]);
    } catch (error) {
        console.log(error);
    }
}

const userById = async (req, res) => {
    const id = req.params.id
    try {
        var users = await user.findByPk(id)
        res.send(users);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    isLogin,
    userById
}