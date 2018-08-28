const {isIn, matches} = require('validator');

module.exports = (req, res, next) => {
  const urlRegex = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b[-a-zA-Z0-9@:%_\+.~#?&/=]*$/;

  let errors = [];

  if (
    req.body.sponsorshiptype &&
    !req.body.sponsorshiptype.every(
      value => isIn(
        value, 
        [
          'İçerik/Konuşmacı', 
          'İndirim/Hediye Kuponu', 
          'Mekan', 
          'Nakit', 
          'Stand', 
          'Tanıtım', 
          'Ürün'
        ])
    )
  ) {
    errors.push({
      param: 'sponsorshiptype',
      error: 'Seçtiğiniz sponsorluk tipi geçerli değil.'
    });
  }
  if (
    req.body.age &&
    !isIn(
      req.body.age, 
      [
        '0-6',
        '7-14',
        '15-17',
        '18-24',
        '25-34',
        '35-44',
        '45-65',
        '65+'
      ]
    )
  ) {
    errors.push({
      param: 'age',
      error: 'Seçtiğiniz yaş grubu geçerli değil.'
    });
  }
  if (req.body.website && !matches(req.body.website, urlRegex)) {
    errors.push({
      param: 'website',
      error: 'Girdiğiniz internet sitesi geçerli değil.'
    });
  }
  
  if (errors.length > 0) {
    return res.status(422).json({errors});
  } else {
    next();
  }
};