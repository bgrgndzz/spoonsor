module.exports = (req, res, next) => {
  req.session.destroy(err => {
    if (err) return res.status(500).send(err);
    return res.redirect('/admin/');
  });
};