module.exports = (req, res, next) => {
  res.render('register', {
    page: 'register',
    title: 'Kayıt Ol',
    includes: {
      external: [
        'animate.css',
        'validator',
        'fontawesome'
      ],
      js: [
        'register',
        'utils/toggleDisplay',
        'utils/scrollTo'
      ],
    },
    headerType: 'register'
  });
};