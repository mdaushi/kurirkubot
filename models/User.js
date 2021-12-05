module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user',{
        name: {type: Sequelize.STRING},
        username: {type: Sequelize.STRING},
        telegram_id: {
            type: Sequelize.STRING,
            allowNull: true
        },
        email: {type: Sequelize.STRING},
        password: {type: Sequelize.STRING},
        whatsapp: {type: Sequelize.STRING},
        address: {type: Sequelize.STRING},
        number: {type: Sequelize.STRING},
        status: {type: Sequelize.BOOLEAN},
        member: {type: Sequelize.STRING},
    });

    return User;
}