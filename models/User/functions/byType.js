module.exports = function(userType) {
  if (userType === 'seeker') {
    return this.or([{'user.userType': 'etkinlik'}, {'user.userType': 'proje'}]);
  }
  return this.where({'user.userType': userType});
};