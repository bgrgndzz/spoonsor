module.exports = (req, res, next) => {
  res.render('404', {
    page: '404',
    title: 'Böyle bir sayfa yok',
    headerType: '404'
  });
};