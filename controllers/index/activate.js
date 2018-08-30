module.exports = (req, res, next) => {
  res.render('activate', {
    page: 'activate',
    title: 'Hesabını aktive et'
  });
};