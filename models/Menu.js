module.exports = (sequelize, Sequelize) => {
    const Menu = sequelize.define('menu', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true
        },
        price: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        category: {
            type: Sequelize.STRING,
            allowNull: true
        },
        image: {
            type: Sequelize.STRING,
            allowNull: true
        },
        restoId: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });

    return Menu;
}