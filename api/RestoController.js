const express = require('express');
const db = require("../config/Databases");
const umkm = db.umkm;
const { Op } = require("sequelize");


// Get semua resto
const getAll = async (req, res) => {
    try {
        var query = req.query.name
        if (!query) {
            var product = await umkm.findAll()
        }else{
            var product = await umkm.findAll({
                where:{
                    name:{
                        [Op.like]: '%'+query+'%'
                    }
                }
            });
        }
        res.send(product);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getAll
}