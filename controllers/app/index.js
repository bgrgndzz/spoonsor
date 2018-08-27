module.exports = (req, res, next) => {
  if (req.session.user.userType === 'etkinlik') {
    res.redirect('/app/sponsors');
  } else if (req.session.user.userType === 'sponsor') {
    res.redirect('/app/events');
  }
};