const mongoose = require('mongoose');
const User = require('../../models/User/User');
const Message = require('../../models/Message/Message');

module.exports = (req, res, next) => {
  User
    .find()
    .exec(
      (err, users) => {
        Message
          .find()
          .populate('from')
          .exec(
            (err, messages) => {
              const etkinlikCount = users.filter(user => user.user.userType === 'etkinlik').length;
              const sponsorCount = users.filter(user => user.user.userType === 'sponsor').length;
              const messageCount = messages.length;
              
              const messageSenders = 
                messages
                  .filter((message, index, array) => !array.includes(message.from.user.name))
                  .map(message => message.from);

              const etkinlikSenders = messageSenders.filter(sender => sender.user.userType === 'etkinlik');
              const etkinlikSenderCount = etkinlikSenders.length;
              const etkinlikMessageCount = messages.filter(message => message.from.user.userType === 'etkinlik').length;
              const sponsorSenders = messageSenders.filter(sender => sender.user.userType === 'sponsor');
              const sponsorSenderCount = sponsorSenders.length;
              const sponsorMessageCount = messages.filter(message => message.from.user.userType === 'sponsor').length;
              
              res.render('admin/dashboard', {
                page: 'admin/dashboard',
                title: 'Ana Sayfa',
                includes: {
                  external: [
                    'fontawesome',
                    'plotly'
                  ]
                },
                data: {
                  etkinlikCount,
                  sponsorCount,
                  messageCount,
                  etkinlikSenders,
                  etkinlikSenderCount,
                  etkinlikMessageCount,
                  sponsorSenders,
                  sponsorSenderCount,
                  sponsorMessageCount
                }
              });
            }
          );
      }
    );
};