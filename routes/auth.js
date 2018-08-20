const express = require('express');
const router = express.Router();

// require controllers
const loginGetController = require('../controllers/auth/login-get');
const registerGetController = require('../controllers/auth/register-get');

const registerPostController = require('../controllers/auth/register-post');

// require validators
const registerPostValidator = require('../controllers/auth/register-validate');

// require middleware
const validationResult = require('../middleware/validationResult');

// routing
// get
router.get('/login', loginGetController);
router.get('/register', registerGetController);

// post
router.post(
  '/register', 
    registerPostValidator, 
    validationResult, 
    registerPostController
);

module.exports = router;