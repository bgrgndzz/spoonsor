const {isEmpty, isEmail, isIn, equals} = require('validator');
const mongoose = require('mongoose');

const User = require('../../../models/User/User');

const renderSponsorRegister = require('./get');

module.exports = (req, res, next) => {
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
  if (!req.body.sponsorname || isEmpty(req.body.sponsorname)) {
    errors.push({
      param: 'sponsorname',
      error: 'Lütfen şirketinizin adını yazın.'
    });
  }
  if (!req.body.sponsordescription || isEmpty(req.body.sponsordescription)) {
    errors.push({
      param: 'sponsordescription',
      error: 'Lütfen şirketinizi birkaç cümleyle açıklayın.'
    });
  }
  if (!req.body.sponsorshiptype || req.body.sponsorshiptype.length === 0) {
    errors.push({
      param: 'sponsorshiptype',
      error: 'Lütfen sağlayabileceğiniz sponsorluk tipini seçin.'
    });
  } else if (
    (
      typeof req.body.sponsorshiptype === 'string' &&
      isEmpty(req.body.sponsorshiptype)
    )
    ||
    (
      Array.isArray(req.body.sponsorshiptype) &&
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

  User.findOne({'auth.email': req.body.email}, (err, userRes) => {
    if (err) errors.push({
      param: 'mongoose',
      error: 'Bilinmeyen bir hata oluştu.'
    });

    if (userRes) {
      errors.push({
        param: 'email',
        error: 'Bu e-mail ile kayıtlı bir hesap zaten var.'
      });
    }
    if (errors.length > 0) {
      req.errors = errors;
      renderSponsorRegister(req, res, next);
    } else {
      next();
    }
  });
};