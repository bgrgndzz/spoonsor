const express = require('express');
const router = express.Router();

// require controllers
const loginGetController = require('../controllers/auth/login/get');
const registerGetController = require('../controllers/auth/register/get');
const markaRegisterGetController = require('../controllers/auth/sponsor-register/get');
const logoutController = require('../controllers/auth/logout');
const lostPasswordGetController = require('../controllers/auth/lost-password/get');
const resetPasswordGetController = require('../controllers/auth/lost-password/resetGet');

const loginPostController = require('../controllers/auth/login/post');
const registerPostController = require('../controllers/auth/register/post');
const markaRegisterPostController = require('../controllers/auth/sponsor-register/post');
const lostPasswordPostController = require('../controllers/auth/lost-password/post');
const resetPasswordPostController = require('../controllers/auth/lost-password/resetPost');

// require validators
const loginPostValidator = require('../controllers/auth/login/validate');
const registerPostValidator = require('../controllers/auth/register/validate');
const markaRegisterPostValidator = require('../controllers/auth/sponsor-register/validate');
const lostPasswordPostValidator = require('../controllers/auth/lost-password/emailValidate');
const resetPasswordPostValidator = require('../controllers/auth/lost-password/passwordValidate');

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
router.get(
  '/lost-password', 
    notLoggedIn,
    lostPasswordGetController
);
router.get(
  '/lost-password/:uid/:hash',
    notLoggedIn,
    resetPasswordGetController
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
router.post(
  '/lost-password',
    notLoggedIn,
    lostPasswordPostValidator,
    lostPasswordPostController
);
router.post(
  '/lost-password/:uid/:hash',
    notLoggedIn,
    resetPasswordPostValidator,
    resetPasswordPostController
);

module.exports = router;