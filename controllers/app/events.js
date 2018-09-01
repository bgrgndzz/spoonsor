const mongoose = require('mongoose');
const User = require('../../models/User/User');

module.exports = (req, res, next) => {
  User
    .find({ _id: { $ne: req.session.user.id } })
    .byType('etkinlik')
    .sort('-user.priority')
    .exec((err, users) => {
      if (err) return res.status(500).send(err);

      res.render('app/events', {
        page: 'app/events',
        title: 'Etkinlikler',
        includes: {
          external: ['fontawesome'],
          js: [
            'app/events',
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