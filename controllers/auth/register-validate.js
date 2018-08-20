const {isEmpty, isEmail, isIn, equals, matches} = require('validator');

module.exports = (req, res, next) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  const phoneRegex = /^(?:(?:\+?([1-9]|[0-9][0-9]|[0-9][0-9][0-9])\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([0-9][1-9]|[0-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;

  let errors = [];

  if (!req.body.name || isEmpty(req.body.name)) {
    errors.push({
      param: 'name',
      error: 'Lütfen adınızı yazın.'
    });
  }
  if (!req.body.surname || isEmpty(req.body.surname)) {
    errors.push({
      param: 'surname',
      error: 'Lütfen soyadınızı yazın.'
    });
  }
  if (!req.body.email || isEmpty(req.body.email)) {
    errors.push({
      param: 'email',
      error: 'Lütfen e-mailinizi yazın.'
    });
  } else if (!isEmail(req.body.email)) {
    errors.push({
      param: 'email',
      error: 'Girdiğiniz e-mail geçerli değil.'
    });
  }
  if (!req.body.sponsorshiptype || req.body.sponsorshiptype.length === 0) {
    errors.push({
      param: 'sponsorshiptype',
      error: 'Lütfen istediğiniz sponsorluk tipini seçin.'
    });
  } else if (
    !req.body.sponsorshiptype.find(
      value => validator.isIn(value, ['İçerik', 'İndirim/Hediye Kuponu', 'Mekan', 'Stand', 'Ürün'])
    )
  ) {
    errors.push({
      param: 'sponsorshiptype',
      error: 'Seçtiğiniz sponsorluk tipi geçerli değil.'
    });
  }
  if (!req.body.phone || isEmpty(req.body.phone)) {
    errors.push({
      param: 'phone',
      error: 'Lütfen telefon numaranızı yazın.'
    });
  } else if (!matches(req.body.phone, phoneRegex)) {
    errors.push({
      param: 'phone',
      error: 'Girdiğiniz telefon numarası geçerli değil.'
    });
  }
  if (!req.body.password || isEmpty(req.body.password)) {
    errors.push({
      param: 'password',
      error: 'Lütfen bir şifre girin.'
    });
  }
  if (!req.body.password2 || isEmpty(req.body.password2)) {
    errors.push({
      param: 'password2',
      error: 'Lütfen şifrenizi tekrar yazarak doğrulayın.'
    });
  } else if (!equals(req.body.password2, req.body.password)) {
    errors.push({
      param: 'password2',
      error: 'Şifre doğrulanamadı, lütfen iki kutucuğa da aynı şifreyi yazdığınızdan emin olun.'
    });
  }
  
  if (!req.body.type || isEmpty(req.body.type)) {
    errors.push({
      param: 'type',
      error: 'Lütfen bir hesap türü seçin.'
    });
  } else if (!isIn(req.body.type, ['etkinlik', 'proje'])) {
    errors.push({
      param: 'type',
      error: 'Seçtiğiniz hesap türü geçerli değil.'
    });
  } else if (equals(req.body.type, 'etkinlik')) {
    if (!req.body.etkinlikname || isEmpty(req.body.etkinlikname)) {
      errors.push({
        param: 'etkinlikname',
        error: 'Lütfen etkinliğinizin ismini girin.'
      });
    }
    if (!req.body.etkinlikstart || isEmpty(req.body.etkinlikstart)) {
      errors.push({
        param: 'etkinlikstart',
        error: 'Lütfen etkinliğinizin başlangıç tarihini girin.'
      });
    } else if (!matches(req.body.etkinlikstart, dateRegex)) {
      errors.push({
        param: 'etkinlikstart',
        error: 'Girdiğiniz etkinlik başlangıç tarihi geçerli değil.'
      });
    }
    if (!req.body.etkinlikend || isEmpty(req.body.etkinlikend)) {
      errors.push({
        param: 'etkinlikend',
        error: 'Lütfen etkinliğinizin bitiş tarihini girin.'
      });
    } else if (!matches(req.body.etkinlikend, dateRegex)) {
      errors.push({
        param: 'etkinlikend',
        error: 'Girdiğiniz etkinlik bitiş tarihi geçerli değil.'
      });
    }
    if (!req.body.etkinlikplace || isEmpty(req.body.etkinlikplace)) {
      errors.push({
        param: 'etkinlikplace',
        error: 'Lütfen etkinliğinizin olacağı yeri girin.'
      });
    }
    if (!req.body.etkinliktype || isEmpty(req.body.etkinliktype)) {
      errors.push({
        param: 'etkinliktype',
        error: 'Lütfen etkinliğinizin türünü girin.'
      });
    }
    if (!req.body.etkinliksubject || isEmpty(req.body.etkinliksubject)) {
      errors.push({
        param: 'etkinliksubject',
        error: 'Lütfen etkinliğinizin konusunu girin.'
      });
    }
  } else if (equals(req.body.type, 'proje')) {
    if (!req.body.projename || isEmpty(req.body.projename)) {
      errors.push({
        param: 'projename',
        error: 'Lütfen projenizin ismini girin.'
      });
    }
    if (!req.body.projestart || isEmpty(req.body.projestart)) {
      errors.push({
        param: 'projestart',
        error: 'Lütfen projenizin başlangıç tarihini girin.'
      });
    } else if (!matches(req.body.projestart, dateRegex)) {
      errors.push({
        param: 'projestart',
        error: 'Girdiğiniz proje başlangıç tarihi geçerli değil.'
      });
    }
    if (!req.body.projeend || isEmpty(req.body.projeend)) {
      errors.push({
        param: 'projeend',
        error: 'Lütfen projenizin bitiş tarihini girin.'
      });
    } else if (!matches(req.body.projeend, dateRegex)) {
      errors.push({
        param: 'projeend',
        error: 'Girdiğiniz proje bitiş tarihi geçerli değil.'
      });
    }
    if (!req.body.projesubject || isEmpty(req.body.projesubject)) {
      errors.push({
        param: 'projesubject',
        error: 'Lütfen projenizin konusunu girin.'
      });
    }
  }

  if (errors.length > 0) {
    return res.status(422).json({errors});
  }
  next();
};