const mongoose = require('mongoose');
const User = require('../../models/User/User');

module.exports = (req, res, next) => {
  User.find().byType('seeker').exec((err, users) => {
    if (err) return res.status(500).send(err);

    res.render('app/seekers', {
      page: 'seekers',
      title: 'Sponsor Arayanlar',
      includes: {
        external: ['fontawesome'],
        js: [
          'seekers',
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