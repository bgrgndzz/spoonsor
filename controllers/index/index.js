module.exports = (req, res, next) => {
  res.render('index', {
    page: 'index',
    title: 'Sponsor Bulmanın En Kolay Yolu',
    includes: {
      external: ['animate.css'],
      js: ['index']
    },
    headerType: 'landing'
  });
};