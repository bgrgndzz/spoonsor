module.exports = (req, res, next) => {
  res.render('auth/sponsor-register', {
    page: 'auth/sponsor-register',
    title: 'Kayıt Ol',
    includes: {
      external: [
        'animate.css',
        'validator',
        'fontawesome'
      ],
      js: [
        'auth/sponsor-register',
        'utils/toggleDisplay',
        'utils/scrollTo'
      ],
    },
    headerType: 'register',
    errors: req.errors || []
  });
};