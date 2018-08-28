const mongoose = require('mongoose');
const User = require('../../../models/User/User');

module.exports = (req, res, next) => {
  User.findById(req.session.user.id, (err, user) => {
    if (err) return console.log(err);

    if (req.file) user.user.profilepicture = req.file.filename;
    user.preSave = false;

    user.save(err => {
      if (err) return console.log(err);

      req.session.user = {
        ...req.session.user,
        ...user.user,
      };
      return res.status(200).json({success: true});
    });
  });
};