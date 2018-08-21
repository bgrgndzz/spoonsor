const express = require('express');
const router = express.Router();

// require controllers
const indexController = require('../controllers/index/index');

// require middleware
const notLoggedIn = require('../middleware/notLoggedIn');
router.use(notLoggedIn);

// routing
// get
router.get('/', indexController);
// post

module.exports = router;