const mongoose = require('mongoose');
const User = require('../../models/User/User');

module.exports = (req, res, next) => {
  User
    .find()
    .byType('etkinlik')
    .sort('-user.priority')
    .exec((err, users) => {
      if (err) return res.status(500).send(err);

      res.render('events', {
        page: 'events',
        title: 'Etkinlikler',
        headerType: 'landing',
        users: users.map(user => ({
          ...user.user,
          id: user.id,
        }))
      });
    });
};