const {isEmpty, isEmail} = require('validator');
const mongoose = require('mongoose');

const User = require('../../../models/User/User');

const renderLostPassword = require('./get');

module.exports = (req, res, next) => {
  let errors = [];
  
  if (!req.body.password || isEmpty(req.body.password)) {
    errors.push({
      param: 'password',
      error: 'Lütfen şifrenizi girin.'
    });
  }
  if (!req.body.password2 || isEmpty(req.body.password2)) {
    errors.push({
      param: 'password2',
      error: 'Lütfen şifrenizi doğrulayın.'
    });
  } else if (req.body.password !== req.body.password2) {
    errors.push({
      param: 'password2',
      error: 'Lütfen girdiğiniz iki şifrenin de aynı olduğundan emin olun.'
    });
  }

  if (errors.length > 0) {
    req.errors = errors;
    req.reset = true;
    renderLostPassword(req, res, next);
  } else {
    next();
  }
};