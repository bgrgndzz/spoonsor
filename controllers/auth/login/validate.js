const {isEmpty, isEmail, isIn, equals, matches} = require('validator');
const mongoose = require('mongoose');

const User = require('../../../models/User/User');

const renderLogin = require('./get');

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
  if (!req.body.password || isEmpty(req.body.password)) {
    errors.push({
      param: 'password',
      error: 'Lütfen şifrenizi girin.'
    });
  }

  if (errors.length > 0) {
    req.errors = errors;
    renderLogin(req, res, next);
  } else {
    User.findOne({'auth.email': req.body.email}, (err, userRes) => {
      if (err) errors.push({
        param: 'mongoose',
        error: 'Bilinmeyen bir hata oluştu.'
      });
  
      if (userRes) {
        userRes.verifyPassword(req.body.password, (err, passwordRes) => {
          if (!passwordRes) {
            errors.push({
              param: 'password',
              error: 'Girdiğiniz şifre yanlış.'
            });
            req.errors = errors;
            renderLogin(req, res, next);
          } else {
            req.validatedUser = userRes;
            next();
          }
        });
      } else {
        errors.push({
          param: 'email',
          error: 'Bu e-mail ile kayıtlı bir hesap yok.'
        });
        req.errors = errors;
        renderLogin(req, res, next);
      }
    });
  }
};