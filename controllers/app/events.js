const mongoose = require('mongoose');
const User = require('../../models/User/User');

module.exports = (req, res, next) => {
  User.find().byType('etkinlik').exec((err, users) => {
    if (err) return res.status(500).send(err);

    res.render('app/events', {
      page: 'events',
      title: 'Etkinlikler',
      includes: {
        external: ['fontawesome'],
        js: [
          'events',
          'utils/toggleDisplay'
        ]
      },
      headerType: 'app',
      users: users.map(user => ({
        ...user.user,
        id: user.id,
      }))
    });
  });
};