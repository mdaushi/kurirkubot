const express = require('express');
const { bubbleSort } = require('../api/BubbleController');
const { getMenu, getMenuByUmkm } = require('../api/MenuController');
const {getAll} = require('../api/RestoController');
const { isLogin } = require('../api/UserController');

// Init express router
const router = express.Router();

 // Route get semua
router.get('/resto', getAll);
router.get('/menus', getMenu);
router.get('/menu/:id', getMenuByUmkm);
router.get('/algorithm/find/driver', bubbleSort);
router.get('/user/islogin/:id', isLogin);

// export router
module.exports = router;