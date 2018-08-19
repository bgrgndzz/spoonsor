const express = require('express');
const router = express.Router();

// require controllers
const sponsorsController = require('../controllers/app/sponsors');
const seekersController = require('../controllers/app/seekers');

// routing
// get
router.get('/sponsors', sponsorsController);
router.get('/seekers', seekersController);
// post

module.exports = router;