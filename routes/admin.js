const express = require('express');
const router = express.Router();

const logoutController = require('../controllers/admin/logout');
const indexController = require('../controllers/admin/index');
const loginGetController = require('../controllers/admin/loginGet');
const dashboardGetController = require('../controllers/admin/dashboardGet');

const loginPostController = require('../controllers/admin/loginPost');

const isAdmin = require('../middleware/isAdmin');

router.get('/', indexController);
router.get('/login', loginGetController);
router.get(
  '/dashboard',
  isAdmin, 
  dashboardGetController
);
router.get(
  '/logout',
  isAdmin, 
  logoutController,
);

router.post('/login', loginPostController);

module.exports = router;