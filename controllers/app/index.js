module.exports = (req, res, next) => {
  if (
    req.session.user.userType === 'etkinlik' ||
    req.session.user.userType === 'proje'
  ) {
    res.redirect('/app/sponsors');
  } else if (req.session.user.userType === 'sponsor') {
    res.redirect('/app/seekers');
  }
};