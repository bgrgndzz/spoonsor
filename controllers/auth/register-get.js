module.exports = (req, res, next) => {
  res.render('register', {
    page: 'register',
    title: 'Kayıt Ol',
    includes: {
      external: ['animate.css'],
      js: [
        'register',
        'util/toggleDisplay',
        'util/scrollTo'
      ],
    },
    headerType: 'register'
  });
};