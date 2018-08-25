const mongoose = require('mongoose');
const User = require('../../../models/User/User');
const Message = require('../../../models/Message/Message');

module.exports = (req, res, next) => {
  if (
    req.body.user &&
    req.body.message
  ) {
    const newMessage = new Message({
      from: req.session.user.id,
      to: req.body.user,
      message: req.body.message
    });
    newMessage.save(err => {
      if (err) return res.status(500).send(err);
      Message
        .findById(newMessage.id)
        .populate('from', 'user')
        .exec((err, message) => {
          if (err) return res.status(500).send(err);
          res.status(200).json({
            ...message._doc,
            type: 'sent',
            user: {...message.from._doc.user}
          });
        });
    });
  }
};