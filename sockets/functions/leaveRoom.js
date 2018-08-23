const mongoose = require('mongoose');
const User = require('../../models/User/User');

const createRoomName = require('../../utils/createRoomName');

module.exports = (fromUser, toUser, socket) => {
  if (toUser) {
    User.findById(toUser, (err, userRes) => {
      if (userRes) socket.leave(createRoomName(fromUser, toUser));
    });
  }
};