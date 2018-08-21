const express = require('express');
const router = express.Router();

// require controllers
const sponsorsController = require('../controllers/app/sponsors');
const seekersController = require('../controllers/app/seekers');

// require middleware
const loggedIn = require('../middleware/loggedIn');
router.use(loggedIn);

// routing
// get
router.get('/sponsors', sponsorsController);
router.get('/seekers', seekersController);
// post

module.exports = router;