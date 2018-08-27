const express = require('express');
const router = express.Router();

// require controllers
const loginGetController = require('../controllers/auth/login/get');
const registerGetController = require('../controllers/auth/register/get');
const markaRegisterGetController = require('../controllers/auth/sponsor-register/get');
const logoutController = require('../controllers/auth/logout');

const loginPostController = require('../controllers/auth/login/post');
const registerPostController = require('../controllers/auth/register/post');
const markaRegisterPostController = require('../controllers/auth/sponsor-register/post');

// require validators
const loginPostValidator = require('../controllers/auth/login/validate');
const registerPostValidator = require('../controllers/auth/register/validate');
const markaRegisterPostValidator = require('../controllers/auth/sponsor-register/validate');

// require middleware
const notLoggedIn = require('../middleware/notLoggedIn');
const loggedIn = require('../middleware/loggedIn');

// routing
// get
router.get(
  '/login', 
    notLoggedIn,
    loginGetController
);
router.get(
  '/register', 
    notLoggedIn,
    registerGetController
);
router.get(
  '/sponsor-register', 
    notLoggedIn,
    markaRegisterGetController
);
router.get(
  '/logout', 
    loggedIn,
    logoutController
);

// post
router.post(
  '/login', 
    notLoggedIn,
    loginPostValidator, 
    loginPostController
);
router.post(
  '/register', 
    notLoggedIn,
    registerPostValidator, 
    registerPostController
);
router.post(
  '/sponsor-register', 
    notLoggedIn,
    markaRegisterPostValidator, 
    markaRegisterPostController
);

module.exports = router;