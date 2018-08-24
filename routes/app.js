const express = require('express');
const router = express.Router();

// require controllers
const indexController = require('../controllers/app/index');
const sponsorsController = require('../controllers/app/sponsors');
const seekersController = require('../controllers/app/seekers');
const messagesIndexController = require('../controllers/app/messages/index');
const messagesUserController = require('../controllers/app/messages/user');

// require middleware
const loggedIn = require('../middleware/loggedIn');
router.use(loggedIn);

// routing
// get
router.get('/', indexController);
router.get('/sponsors', sponsorsController);
router.get('/seekers', seekersController);
router.get('/messages', messagesIndexController);
router.get('/messages/:user', messagesUserController);
// post

module.exports = router;