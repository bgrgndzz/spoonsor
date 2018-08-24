const async = require('async');

const mongoose = require('mongoose');
const User = require('../../../models/User/User');
const Message = require('../../../models/Message/Message');

module.exports = (req, res, next) => {
  async.parallel({
    messages: callback => {
      Message.findMessagesWithUser(req.session.user.id, req.params.user, (err, messages) => {
        if (err) return callback(err);
        callback(null, messages);
      });
    },
    user: callback => {
      User.findById(req.params.user, (err, user) => {
        if (err) return callback(err);
        callback(null, {
          ...user.user,
          id: user.id
        });
      });
    }
  }, (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(results);
  });
  
};