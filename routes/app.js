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

const messagesSendController = require('../controllers/app/messages/send');
const profileEditController = require('../controllers/app/profile/edit');
const profilePictureController = require('../controllers/app/profile/profilepicture');

// require validators
const profileEditValidator = require('../controllers/app/profile/validate');

// require middleware
const loggedIn = require('../middleware/loggedIn');
const active = require('../middleware/active');
const uploadProfilePicture = require('../middleware/uploadProfilePicture');
router.use(loggedIn);

// routing
// get
router.get('/', indexController);
router.get('/sponsors', sponsorsController);
router.get('/events', eventsController);
router.get(
  '/messages', 
    active, 
    messagesIndexController
);
router.get(
  '/messages/:user', 
    active, 
    messagesUserController
);
router.get('/profile', profileIndexController);
router.get('/profile/:user', profileUserController);
// post
router.post(
  '/messages/send', 
    active, 
    messagesSendController
);
router.post(
  '/profile/edit', 
    profileEditValidator, 
    profileEditController
);
router.post(
  '/profile/profilepicture',
    uploadProfilePicture,
    profilePictureController
);

module.exports = router;