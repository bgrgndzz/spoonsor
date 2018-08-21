const bcrypt = require('bcrypt');

module.exports = function(next) {
  var user = this;

  bcrypt.hash(user.auth.password, 10, (err, hash) => {
    if (err) return next(err);

    user.auth.password = hash;
    next();
  });
};