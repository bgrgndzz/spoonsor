const mongoose = require('mongoose');
const User = require('../../models/User/User');

module.exports = (req, res, next) => {
  User
    .find({ _id: { $ne: req.session.user.id } })
    .byType('sponsor')
    .sort('-user.priority')
    .exec((err, users) => {
      if (err) return res.status(500).send(err);

      res.render('app/sponsors', {
        page: 'app/sponsors',
        title: 'Sponsorlar',
        includes: {
          external: ['fontawesome'],
          js: [
            'app/sponsors',
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