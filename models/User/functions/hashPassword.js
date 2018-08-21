module.exports = function(next) {
  var user = this;

  bcrypt.hash(user.password, salt, (err, hash) => {
    if (err) return next(err);

    user.password = hash;
    next();
  });
};