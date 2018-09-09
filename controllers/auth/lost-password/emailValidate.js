const {isEmpty, isEmail} = require('validator');
const mongoose = require('mongoose');

const User = require('../../../models/User/User');

const renderLostPassword = require('./get');

module.exports = (req, res, next) => {
  let errors = [];
  
  if (!req.body.email || isEmpty(req.body.email)) {
    errors.push({
      param: 'email',
      error: 'Lütfen e-mailinizi girin.'
    });
  } else if (!isEmail(req.body.email)) {
    errors.push({
      param: 'email',
      error: 'Girdiğiniz e-mail geçerli değil.'
    });
  }

  if (errors.length > 0) {
    req.errors = errors;
    renderLostPassword(req, res, next);
  } else {
    User.findOne({'auth.email': req.body.email}, (err, user) => {
      if (err) return console.log(err);
      if (user) {
        req.validatedUser = user;
        next();
      } else {
        errors.push({
          param: 'email',
          error: 'Girdiğiniz e-mail ile ilişkili bir hesap yok.'
        });
        req.errors = errors;
        renderLostPassword(req, res, next);
      }
    });
  }
};