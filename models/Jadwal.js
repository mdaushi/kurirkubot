const { umkm } = require("../config/Databases");

module.exports = (sequelize, Sequelize) => {
    const jadwal = sequelize.define('jadwal', {
        restoId: { type: Sequelize.INTEGER },
        day: { type: Sequelize.STRING, allowNull: true },
        start: { type: Sequelize.STRING, allowNull: true },
        end: { type: Sequelize.STRING, allowNull: true },
    })

    return jadwal;
}