module.exports = (req, res, next) => {
  res.render('auth/login', {
    page: 'auth/login',
    title: 'Giriş Yap',
    headerType: 'login',
    includes: {
      external: [
        'fontawesome',
        'validator',
      ],
      js: [
        'utils/toggleDisplay',
        'auth/login'
      ]
    }
  });
};