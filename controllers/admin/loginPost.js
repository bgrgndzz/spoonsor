module.exports = (req, res, next) => {
  if (req.body.password === process.env.ADMIN_PASSWORD) {
    req.session.admin = true;
    res.redirect('/admin/dashboard');
  } else {
    res.send('Hata: Yanlış şifre');
  }
};