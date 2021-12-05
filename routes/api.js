const express = require('express');
const {getAll} = require('../api/RestoController');

// Init express router
const router = express.Router();

 // Route get semua
router.get('/resto', getAll);

// export router
module.exports = router;