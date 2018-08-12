const express = require('express');
const router = express.Router();

// require controllers
const loginGetController = require('../controllers/auth/login-get');
const registerGetController = require('../controllers/auth/register-get');

// routing
// get
router.get('/login', loginGetController);
router.get('/register', registerGetController);
// post

module.exports = router;