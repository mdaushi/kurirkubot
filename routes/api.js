const express = require('express');
const { bubbleSort } = require('../api/BubbleController');
const { getMenu, getMenuByUmkm } = require('../api/MenuController');
const {getAll, getById} = require('../api/RestoController');
const { isLogin, userById } = require('../api/UserController');

// Init express router
const router = express.Router();

 // Route get semua
router.get('/resto', getAll);
router.get('/resto/:id', getById)

// menu
router.get('/menus', getMenu);
router.get('/menu/:id', getMenuByUmkm);

// algoritma
router.get('/algorithm/find/driver', bubbleSort);

// user
router.get('/user/islogin/:id', isLogin);
router.get('/user/:id', userById)

// export router
module.exports = router;