module.exports = (req, res, next) => {
  res.render('admin/login', {
    page: 'admin/login',
    title: 'Admin Girişi'
  });
};