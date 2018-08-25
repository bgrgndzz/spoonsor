const express = require('express');
const router = express.Router();

// require controllers
const indexController = require('../controllers/app/index');
const sponsorsController = require('../controllers/app/sponsors');
const seekersController = require('../controllers/app/seekers');
const messagesIndexController = require('../controllers/app/messages/index');
const messagesUserController = require('../controllers/app/messages/user');

const messagesSendController = require('../controllers/app/messages/send');

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
router.post('/messages/send', messagesSendController);

module.exports = router;