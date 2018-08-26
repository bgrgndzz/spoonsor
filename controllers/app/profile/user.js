const mongoose = require('mongoose');
const User = require('../../../models/User/User');

module.exports = (req, res, next) => {
  User.findById(req.body.user).exec((err, user) => {
    if (err) return res.status(500).send(err);
    if (!user) return res.status(500).send('Böyle bir kullanıcı yok');

    res.render('app/profile', {
      page: 'profile',
      title: 'Profil',
      includes: {
        external: ['fontawesome'],
        js: ['utils/toggleDisplay']
      },
      headerType: 'app',
      user: {
        ...user.user,
        id: user.id
      }
    });
  });
};