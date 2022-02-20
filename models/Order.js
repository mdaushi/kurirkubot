module.exports = (sequelize, Sequelize) => {
    const order = sequelize.define('order', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        menuId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        restoId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        driverId: {
            type: Sequelize.INTEGER,
            allowNull: true
        },

        // Mencari Driver, Pesanan diterima, Pesanan dibatalkan, Pesanan Selesai
        status: {
            type: Sequelize.STRING,
            allowNull: false
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        address : {
            type: Sequelize.STRING,
            allowNull: true
        }
    })

    return order;
}