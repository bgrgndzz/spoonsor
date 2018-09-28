module.exports = (req, res, next) => {
  req.session.user = {
    ...req.validatedUser.user,
    email: req.validatedUser.person.email,
    id: req.validatedUser._id
  };
  res.redirect('/app');
};
