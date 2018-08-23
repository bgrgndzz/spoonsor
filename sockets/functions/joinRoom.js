const mongoose = require('mongoose');
const User = require('../../models/User/User');

module.exports = (user, socket) => {
  if (user) {
    User.findById(user, (err, userRes) => {
      if (userRes) socket.join(user);
    });
  }
};