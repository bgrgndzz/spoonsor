module.exports = (req, res, next) => {
  if (
    req.session.userType === 'etkinlik' ||
    req.session.userType === 'etkinlik'
  ) {
    res.redirect('/app/sponsors');
  }
};