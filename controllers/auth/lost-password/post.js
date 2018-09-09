const crypto = require('crypto');

const mongoose = require('mongoose');
const User = require('../../../models/User/User');

const sendMail = require('../../../utils/sendMail');

module.exports = (req, res, next) => {
  const hash = crypto.randomBytes(20).toString('hex');
  req.validatedUser.passwordReset = {hash};
  req.validatedUser.save(err => {
    if (err) return console.log(err);
    sendMail({
      id: req.validatedUser.id,
      hash: req.validatedUser.passwordReset.hash,
      email: req.validatedUser.person.email
    }, 'resetPassword', (err, info) => {
      if (err) return console.log(err);
      res.redirect('/auth/login');
    });
  });
};