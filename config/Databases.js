require('dotenv').config()

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT
  });


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//define model
db.user = require('../models/User')(sequelize, Sequelize);
db.umkm = require('../models/Umkm')(sequelize, Sequelize);

module.exports = db;