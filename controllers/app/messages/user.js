const mongoose = require('mongoose');
const Message = require('../../../models/Message/Message');

module.exports = (req, res, next) => {
  Message.findMessagesWithUser(req.session.user.id, req.params.user, (err, messages) => {
    if (err) return res.status(500).send(err);
    res.status(200).json({messages});
  });
};