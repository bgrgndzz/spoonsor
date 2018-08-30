const express = require('express');
const router = express.Router();

// require controllers
const indexController = require('../controllers/index/index');
const activateController = require('../controllers/index/activate');
const errorController = require('../controllers/index/404');

// require middleware
const notLoggedIn = require('../middleware/notLoggedIn');

// routing
router.get(
  '/', 
    notLoggedIn,
    indexController
);
router.get('/activate', activateController);
router.get('*', errorController);

module.exports = router;