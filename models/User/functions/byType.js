module.exports = function(userType) {
  return this.where({'user.userType': userType});
};