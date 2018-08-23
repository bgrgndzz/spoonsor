module.exports = (req, res, next) => {
  res.render('app/messages', {
    page: 'messages',
    title: 'Mesajlar',
    headerType: 'app',
    includes: {
      external: ['fontawesome'],
      js: [
        'messages',
        'utils/toggleDisplay'
      ]
    }
  });
};