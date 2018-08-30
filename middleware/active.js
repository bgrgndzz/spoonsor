const mongoose = require('mongoose');
const User = require('../models/User/User');

module.exports = (req, res, next) => {
  User.findById(req.session.user.id, (err, user) => {
    if (err) return console.log(err);
    if (!user) return res.status(500).send('Bilinmeyen bir hata oluştu.');

    if (!user.user.active) return res.redirect('/activate');
    next();
  });
};