const mongoose = require('mongoose');
const User = require('../../../models/User/User');

const renderLostPassword = require('./get');

module.exports = (req, res, next) => {
  if (req.params.hash && req.params.uid) {
    User.findById(req.params.uid, (err, user) => {
      if (err) return console.log(err);
      if (user.passwordReset && user.passwordReset.hash === req.params.hash) {
        req.reset = true;
        renderLostPassword(req, res, next);
      } else {
        req.reset = false;
        req.errors = [{
          error: 'Bu şifre sıfırlama talebi geçerli değil.',
          param: 'hash'
        }];
        renderLostPassword(req, res, next);
      }
    });
  } else {
    res.redirect('/auth/lost-password');
  }
}