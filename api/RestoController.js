const express = require('express');
const db = require("../config/Databases");
const umkm = db.umkm;
const { Op } = require("sequelize");


// Get semua resto
const getAll = async (req, res) => {
    try {
        var query = req.query.name
        if (!query) {
            var product = await umkm.findAll({
                include: ["jadwal", "menu"],
                order:[
                    ['jadwal','createdAt','DESC']
                ]
            })
        }else{
            var product = await umkm.findAll({
                include: ["jadwal", "menu"],
                where:{
                    name:{
                        [Op.like]: '%'+query+'%'
                    }
                },
                order:[
                    ['jadwal','createdAt','DESC']
                ]
            });
        }
        res.send(product);
    } catch (err) {
        console.log(err);
    }
}

const getById = async (req, res) =>{
    const id = req.params.id
    try {
        var resto = await umkm.findByPk(id)
        res.send(resto)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAll,
    getById
}