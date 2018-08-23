const ios = require('express-socket.io-session');

const joinRoom = require('./functions/joinRoom');
const leaveRoom = require('./functions/leaveRoom');

module.exports = (io, session) => {
  // socket.io setup
  io.use(ios(session, {
    autoSave: true
  }));

  io.on('connection', (socket) => {
    if (socket.handshake.session && socket.handshake.session.user) {
      const user = socket.handshake.session.user;
      socket.on('join room', (data) => {
        joinRoom(user.id, data, socket);
      });
      socket.on('leave room', (data) => {
        leaveRoom(user.id, data, socket);
      });
    } 
  });
};