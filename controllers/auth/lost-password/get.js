module.exports = (req, res, next) => {
  res.render('auth/lost-password', {
    page: 'auth/lost-password',
    title: 'Şifreni Sıfırla',
    includes: {
      external: ['fontawesome'],
      js: [
        'utils/toggleDisplay',
        'auth/lost-password'
      ],
    },
    headerType: 'login',
    errors: req.errors || [],
    reset: req.reset
  });
};