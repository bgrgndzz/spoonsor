const mongoose = require('mongoose');
const User = require('../../models/User/User');

const async = require('async');

module.exports = (req, res, next) => {
  async.parallel({
    sponsors: callback => {
      User.countDocuments({'user.userType': 'sponsor'}, callback);
    },
    events: callback => {
      User.countDocuments({'user.userType': 'etkinlik'}, callback);
    }
  }, (err, data) => {
    if (err) return console.log(err);
    res.render('index', {
      page: 'index',
      title: 'Sponsor Bulmanın En Kolay Yolu',
      includes: {
        external: [
          'animate.css',
          'fontawesome'
        ],
        js: ['index']
      },
      headerType: 'landing',
      data
    });
  });
};