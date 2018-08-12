module.exports = (req, res, next) => {
  res.render('login', {
    page: 'login',
    title: 'Giriş Yap',
    headerType: 'login'
  });
};