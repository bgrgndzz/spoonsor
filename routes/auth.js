const express = require('express');
const router = express.Router();

// require controllers
const loginGetController = require('../controllers/auth/login/get');
const registerGetController = require('../controllers/auth/register/get');
const markaRegisterGetController = require('../controllers/auth/sponsor-register/get');

const loginPostController = require('../controllers/auth/login/post');
const registerPostController = require('../controllers/auth/register/post');
const markaRegisterPostController = require('../controllers/auth/sponsor-register/post');

// require validators
const loginPostValidator = require('../controllers/auth/login/validate');
const registerPostValidator = require('../controllers/auth/register/validate');
const markaRegisterPostValidator = require('../controllers/auth/sponsor-register/validate');

// require middleware
const notLoggedIn = require('../middleware/notLoggedIn');
router.use(notLoggedIn);

// routing
// get
router.get('/login', loginGetController);
router.get('/register', registerGetController);
router.get('/sponsor-register', markaRegisterGetController);

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
router.post(
  '/sponsor-register', 
    markaRegisterPostValidator, 
    markaRegisterPostController
);

module.exports = router;