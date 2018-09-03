const {isEmpty, isEmail, isIn, equals, matches} = require('validator');
const mongoose = require('mongoose');

const User = require('../../../models/User/User');

const renderRegister = require('./get');

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
  
  if (!req.body.etkinlikname || isEmpty(req.body.etkinlikname)) {
    errors.push({
      param: 'etkinlikname',
      error: 'Lütfen etkinliğinizin ismini girin.'
    });
  }
  if (!req.body.start || isEmpty(req.body.start)) {
    errors.push({
      param: 'start',
      error: 'Lütfen etkinliğinizin başlangıç tarihini girin.'
    });
  } else if (!matches(req.body.start, dateRegex)) {
    errors.push({
      param: 'start',
      error: 'Girdiğiniz etkinlik başlangıç tarihi geçerli değil.'
    });
  }
  if (!req.body.end || isEmpty(req.body.end)) {
    errors.push({
      param: 'end',
      error: 'Lütfen etkinliğinizin bitiş tarihini girin.'
    });
  } else if (!matches(req.body.end, dateRegex)) {
    errors.push({
      param: 'end',
      error: 'Girdiğiniz etkinlik bitiş tarihi geçerli değil.'
    });
  }
  if (!req.body.location || isEmpty(req.body.location)) {
    errors.push({
      param: 'location',
      error: 'Lütfen etkinliğinizin olacağı yeri girin.'
    });
  }
  if (!req.body.type || !req.body.type[0] || isEmpty(req.body.type[0])) {
    errors.push({
      param: 'type',
      error: 'Lütfen etkinliğinizin türünü girin.'
    });
  }
  if (!req.body.subject || !req.body.subject[0] || isEmpty(req.body.subject[0])) {
    errors.push({
      param: 'subject',
      error: 'Lütfen etkinliğinizin konusunu girin.'
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
      renderRegister(req, res, next);
    } else {
      next();
    }
  });
};