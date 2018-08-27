const mongoose = require('mongoose');
const User = require('../../../models/User/User');

module.exports = (req, res, next) => {
  res.render('app/profile', {
    page: 'profile',
    title: 'Profil',
    includes: {
      external: ['fontawesome'],
      js: [
        'profile',
        'utils/toggleDisplay'
      ]
    },
    headerType: 'app',
    user: req.session.user,
    edit: true
  });
};