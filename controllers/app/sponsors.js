module.exports = (req, res, next) => {
  res.render('app/sponsors', {
    page: 'sponsors',
    title: 'Sponsorlar',
    includes: {
      external: ['fontawesome'],
      js: [
        'sponsors',
        'utils/toggleDisplay'
      ]
    },
    headerType: 'app'
  });
};