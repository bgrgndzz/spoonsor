const express = require('express');
const router = express.Router();

// require controllers
const loginGetController = require('../controllers/auth/login-get');

// routing
// get
router.get('/login', loginGetController);
// post

module.exports = router;