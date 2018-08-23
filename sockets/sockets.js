const ios = require('express-socket.io-session');

const joinRoom = require('./functions/joinRoom');

module.exports = (io, session) => {
  // socket.io setup
  io.use(ios(session, {
    autoSave: true
  }));

  io.on('connection', (socket) => {
    if (socket.handshake.session && socket.handshake.session.user) {
      socket.on('join room', (data) => {
        joinRoom(data, socket);
      });
    }
  });
};