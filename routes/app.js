const express = require('express');
const router = express.Router();

// require controllers
const indexController = require('../controllers/app/index');
const sponsorsController = require('../controllers/app/sponsors');
const eventsController = require('../controllers/app/events');
const messagesIndexController = require('../controllers/app/messages/index');
const messagesUserController = require('../controllers/app/messages/user');
const profileIndexController = require('../controllers/app/profile/index');
const profileUserController = require('../controllers/app/profile/user');
const profileEditController = require('../controllers/app/profile/edit');

const messagesSendController = require('../controllers/app/messages/send');

// require validators
const profileEditValidator = require('../controllers/app/profile/validate');

// require middleware
const loggedIn = require('../middleware/loggedIn');
router.use(loggedIn);

// routing
// get
router.get('/', indexController);
router.get('/sponsors', sponsorsController);
router.get('/events', eventsController);
router.get('/messages', messagesIndexController);
router.get('/messages/:user', messagesUserController);
router.get('/profile', profileIndexController);
router.get('/profile/:user', profileUserController);
// post
router.post('/messages/send', messagesSendController);
router.post('/profile/edit', profileEditValidator, profileEditController);

module.exports = router;