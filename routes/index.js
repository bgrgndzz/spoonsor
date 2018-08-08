const express = require('express');
const router = express.Router();

// require controllers
const index = require('../controllers/index/index');

// routing
// get
router.get('/', index);
// post

module.exports = router;