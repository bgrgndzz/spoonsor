const express = require('express');
const router = express.Router();

// require controllers
const sponsorsController = require('../controllers/app/sponsors');

// routing
// get
router.get('/sponsors', sponsorsController);
// post

module.exports = router;