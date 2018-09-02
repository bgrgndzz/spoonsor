const mongoose = require('mongoose');
const User = require('../models/User/User');

module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    User.findOne({'auth.email': req.session.user.email}, (err, userRes) => {
      if (err) return console.log(err);
      if (userRes) {
        next();
      } else {
        res.redirect('/auth/login');
      }
    });
  } else {
    res.redirect('/auth/login');
  }
}