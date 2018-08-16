module.exports = (req, res, next) => {
  res.render('register', {
    page: 'register',
    title: 'Kayıt Ol',
    includes: {
      external: ['animate.css'],
      js: ['register'],
    },
    headerType: 'register'
  });
};