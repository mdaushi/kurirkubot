const { Op } = require("sequelize");
const { menu } = require("../config/Databases");

const getMenu = async (req, res) => {
    try {
        var query = req.query.name;
        var id = req.query.id;
        if(!query) {
            var menus = await menu.findAll();
        }else{
            var menus = await menu.findAll({
                where: {
                    name: {
                        [Op.like]: `%${query}%`
                    },
                    restoId: id
                }
            })
        }
        res.send(menus);
    } catch (error) {
        console.log(error);
    }
}

const getMenuByUmkm = async (req, res) => {
    try {
        var id = req.params.id;
        var menus = await menu.findAll({
            where: {
                restoId: id
            }
        });
        res.send(menus);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getMenu,
    getMenuByUmkm
}