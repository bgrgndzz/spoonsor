module.exports = (req, res, next) => {
  res.render('sponsor-register', {
    page: 'sponsor-register',
    title: 'Kayıt Ol',
    includes: {
      external: [
        'animate.css',
        'validator',
        'fontawesome'
      ],
      js: [
        'sponsor-register',
        'utils/toggleDisplay',
        'utils/scrollTo'
      ],
    },
    headerType: 'register'
  });
};