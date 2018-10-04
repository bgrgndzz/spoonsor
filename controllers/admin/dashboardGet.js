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
              if (req.query.date) {
                const today = new Date();
                if (req.query.date === 'day') {
                  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                  users = users.filter(user => user._id.getTimestamp() > todayStart);
                  messages = messages.filter(message => message._id.getTimestamp() > todayStart);
                } else if (req.query.date === 'week') {
                  const weekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
                  users = users.filter(user => user._id.getTimestamp() > weekStart);
                  messages = messages.filter(message => message._id.getTimestamp() > weekStart);
                } else if (req.query.date === 'month') {
                  const monthStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30);
                  users = users.filter(user => user._id.getTimestamp() > monthStart);
                  messages = messages.filter(message => message._id.getTimestamp() > monthStart);
                } else if (req.query.date === 'year') {
                  const yearStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 365);
                  users = users.filter(user => user._id.getTimestamp() > yearStart);
                  messages = messages.filter(message => message._id.getTimestamp() > yearStart);
                }
              }
              const etkinlik = users.filter(user => user.user.userType === 'etkinlik');
              const etkinlikCount = etkinlik.length;
              const sponsor = users.filter(user => user.user.userType === 'sponsor');
              const sponsorCount = sponsor.length;
              const messageCount = messages.length;
              
              const messageSenders = 
                messages
                  .filter(
                    (message, index, array) =>
                      array
                        .map(mappedMessage => mappedMessage.from._id)
                        .indexOf(message.from._id) === index)
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
                  ],
                  js: ['/admin/dashboard']
                },
                data: {
                  etkinlik,
                  etkinlikCount,
                  sponsor,
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