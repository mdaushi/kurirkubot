module.exports = (sequelize, Sequelize) => {
    const Umkm = sequelize.define('umkm', {
        name: {type: Sequelize.STRING, allowNull: true},
        description: {type: Sequelize.STRING, allowNull: true},
        status: {type: Sequelize.STRING, allowNull: true},
        category: {type: Sequelize.STRING, allowNull: true},
        image: {type: Sequelize.STRING, allowNull: true},
        address: {type: Sequelize.STRING, allowNull: true},
        latitude: {type: Sequelize.FLOAT, allowNull: true},
        longitude: {type: Sequelize.FLOAT, allowNull: true},
        telp: {type: Sequelize.STRING, allowNull: true},
    },{
        frezeTableName: true,
    });

    return Umkm;
}