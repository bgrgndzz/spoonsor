const mongoose = require('mongoose');
const User = require('../models/User/User');

module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    User.findOne({'auth.email': req.session.user.email}, (err, userRes) => {
      if (err) return res.status(500).send('noppe');
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