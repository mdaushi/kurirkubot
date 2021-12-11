const express = require('express');
const { getMenus } = require('../api/MenuController');
const {getAll} = require('../api/RestoController');

// Init express router
const router = express.Router();

 // Route get semua
router.get('/resto', getAll);
router.get('/menus', getMenus);

// export router
module.exports = router;