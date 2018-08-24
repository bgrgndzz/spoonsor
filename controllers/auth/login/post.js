const mongoose = require('mongoose');
const User = require('../../../models/User/User');

module.exports = (req, res, next) => {
  req.session.user = {
    ...req.validatedUser.user,
    email: req.validatedUser.person.email,
    id: req.validatedUser._id
  };
  return res.status(200).json({success: true});
};