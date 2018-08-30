const mongoose = require('mongoose');
const User = require('../../models/User/User');

module.exports = (req, res, next) => {
  User
    .find({ _id: { $ne: req.session.user.id } })
    .byType('sponsor')
    .exec((err, users) => {
      if (err) return res.status(500).send(err);

      res.render('app/sponsors', {
        page: 'sponsors',
        title: 'Sponsorlar',
        includes: {
          external: ['fontawesome'],
          js: [
            'sponsors',
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