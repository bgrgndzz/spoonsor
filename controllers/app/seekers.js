module.exports = (req, res, next) => {
  res.render('app/seekers', {
    page: 'seekers',
    title: 'Sponsor Arayanlar',
    includes: {
      external: ['fontawesome'],
      js: [
        'seekers',
        'util/toggleDisplay'
      ]
    },
    headerType: 'app'
  });
};