const mongoose = require('mongoose');
const User = require('../../../models/User/User');

module.exports = (req, res, next) => {
  User.findById(req.params.uid, (err, user) => {
    if (err) return console.log(err);
    user.preSave = true;
    user.auth.password = req.body.password;

    user.save(err => {
      if (err) return console.log(err);
      res.redirect('/auth/login');
    });
  });
}