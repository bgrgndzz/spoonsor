const mongoose = require('mongoose');
const User = require('../../../models/User/User');
const Message = require('../../../models/Message/Message');

module.exports = (req, res, next) => {
  Message.findMessagedUsers(req.session.user.id, (err, messagedUsers) => {
    if (err) res.status(500).send(err);
    res.render('app/messages', {
      page: 'messages',
      title: 'Mesajlar',
      headerType: 'app',
      includes: {
        external: [
          'fontawesome',
          'socket.io'
        ],
        js: [
          'messages',
          'utils/toggleDisplay'
        ]
      },
      messagedUsers,
      to: req.query.to || ''
    });
  });
};