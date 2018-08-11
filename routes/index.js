const express = require('express');
const router = express.Router();

// require controllers
const indexController = require('../controllers/index/index');

// routing
// get
router.get('/', indexController);
// post

module.exports = router;