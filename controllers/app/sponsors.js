module.exports = (req, res, next) => {
  res.render('app/sponsors', {
    page: 'sponsors',
    title: 'Sponsorlar',
    includes: {
      external: ['fontawesome'],
      js: ['sponsors']
    },
    headerType: 'app'
  });
};