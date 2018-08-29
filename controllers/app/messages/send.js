const mongoose = require('mongoose');
const User = require('../../../models/User/User');
const Message = require('../../../models/Message/Message');

const createRoomName = require('../../../utils/createRoomName');
const sendMail = require('../../../utils/sendMail');

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
        .populate('from', 'user person')
        .populate('to', 'user person')
        .exec((err, message) => {
          if (err) return res.status(500).send(err);
          
          const messageDisplayMap = {
            ...message._doc,
            user: {
              ...message.from._doc.user,
              id: message.from.id
            },
            other: {
              ...message.to._doc.user,
              id: message.to.id
            }
          };
          const roomName = createRoomName(req.session.user.id, req.body.user);
          req.io.in(roomName).emit('new message', messageDisplayMap);

          sendMail({
            from: {
              name: message.from.user.name,
              email: message.from.person.email
            },
            to: {
              email: message.to.person.email
            },
            message: message.message
          }, 'sendMessage', (err, info) => {
            if (err) return console.log(err);
            
            res.status(200).json({success: true});
          });
        });
    });
  }
};