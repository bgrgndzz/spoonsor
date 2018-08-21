const bcrypt = require('bcrypt');

module.exports = (password, callback) => {
  bcrypt.compare(password, this.password, (err, res) => {
    if (err) return callback(err);
    callback(null, res);
  });
};