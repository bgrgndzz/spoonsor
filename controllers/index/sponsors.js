const mongoose = require('mongoose');
const User = require('../../models/User/User');

module.exports = (req, res, next) => {
  User
    .find()
    .byType('sponsor')
    .exec((err, users) => {
      if (err) return res.status(500).send(err);

      res.render('sponsors', {
        page: 'sponsors',
        title: 'Sponsorlar',
        headerType: 'landing',
        users: users.map(user => ({
          ...user.user,
          id: user.id,
        }))
      });
    });
};