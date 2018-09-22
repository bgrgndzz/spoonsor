const express = require('express');
const router = express.Router();

const indexController = require('../controllers/admin/index');
const loginGetController = require('../controllers/admin/loginGet');

router.get('/', indexController);
router.get('/login', loginGetController);

module.exports = router;