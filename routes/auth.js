const express = require('express');
const router = express.Router();

// require controllers
const loginGetController = require('../controllers/auth/login/get');
const registerGetController = require('../controllers/auth/register/get');

const loginPostController = require('../controllers/auth/login/post');
const registerPostController = require('../controllers/auth/register/post');

// require validators
const loginPostValidator = require('../controllers/auth/login/validate');
const registerPostValidator = require('../controllers/auth/register/validate');

// require middleware
const notLoggedIn = require('../middleware/notLoggedIn');
router.use(notLoggedIn);

// routing
// get
router.get('/login', loginGetController);
router.get('/register', registerGetController);

// post
router.post(
  '/login', 
    loginPostValidator, 
    loginPostController
);
router.post(
  '/register', 
    registerPostValidator, 
    registerPostController
);

module.exports = router;