module.exports = (req, res, next) => {
  res.render('login', {
    page: 'login',
    title: 'Giriş Yap',
    headerType: 'login',
    includes: {
      external: [
        'fontawesome',
        'validator'
      ],
      js: [
        'utils/toggleDisplay'
      ]
    }
  });
};