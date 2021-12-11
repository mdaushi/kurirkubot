const { Op } = require("sequelize");
const { menu } = require("../config/Databases");

const getMenus = async (req, res) => {
    try {
        var query = req.query.name;
        if(!query) {
            var menus = await menu.findAll();
        }else{
            var menus = await menu.findAll({
                where: {
                    name: {
                        [Op.like]: `%${query}%`
                    }
                }
            })
        }
        res.send(menus);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getMenus
}