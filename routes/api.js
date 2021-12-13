const express = require('express');
const { getMenus, getMenuByUmkm } = require('../api/MenuController');
const {getAll} = require('../api/RestoController');

// Init express router
const router = express.Router();

 // Route get semua
router.get('/resto', getAll);
router.get('/menus', getMenus);
router.get('/menu/:id', getMenuByUmkm);

// export router
module.exports = router;