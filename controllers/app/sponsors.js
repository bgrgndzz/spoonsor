module.exports = (req, res, next) => {
  res.render('app/sponsors', {
    page: 'sponsors',
    title: 'Sponsorlar',
    includes: {
      js: ['sponsors']
    },
    headerType: 'app'
  });
};