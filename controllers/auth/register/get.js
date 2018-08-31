module.exports = (req, res, next) => {
  res.render('auth/register', {
    page: 'auth/register',
    title: 'Kayıt Ol',
    includes: {
      external: [
        'animate.css',
        'validator',
        'fontawesome'
      ],
      js: [
        'auth/register',
        'utils/toggleDisplay',
        'utils/scrollTo'
      ],
    },
    headerType: 'register'
  });
};