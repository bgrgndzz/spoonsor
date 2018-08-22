const express = require('express');
const router = express.Router();

// require controllers
const indexController = require('../controllers/app/index');
const sponsorsController = require('../controllers/app/sponsors');
const seekersController = require('../controllers/app/seekers');
const messagesController = require('../controllers/app/messages');

// require middleware
const loggedIn = require('../middleware/loggedIn');
router.use(loggedIn);

// routing
// get
router.get('/', indexController);
router.get('/sponsors', sponsorsController);
router.get('/seekers', seekersController);
router.get('/messages', messagesController);
// post

module.exports = router;