module.exports = (req, res, next) => {
  res.render('app/sponsors', {
    page: 'sponsors',
    title: 'Sponsorlar',
    headerType: 'app'
  });
};