const {check, oneOf} = require('express-validator/check');

const unknownError = 'Bilinmeyen bir hata oluştu';
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const phoneRegex = /^(?:(?:\+?([1-9]|[0-9][0-9]|[0-9][0-9][0-9])\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([0-9][1-9]|[0-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;

const exists = element => check(element).exists().withMessage('Lütfen bütün boşlukları doldurun.');

module.exports = [
  exists('name')
    .isString().withMessage(unknownError),
  exists('surname')
    .isString().withMessage(unknownError),
  exists('email')
    .isEmail().withMessage('Girdiğiniz e-mail geçerli değil.'),
  exists('type')
    .isIn(['etkinlik', 'proje']).withMessage(unknownError),
  exists('phone')
    .matches(phoneRegex).withMessage('Girdiğiniz telefon numarası geçerli değil.'),
  exists('password')
    .isString().withMessage(unknownError),
  exists('password2')
    .isString().withMessage(unknownError)
    .custom((value, {req}) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation is incorrect');
      }
    }),
  oneOf([
    [
      exists('etkinlikname')
        .isString().withMessage(unknownError),
      exists('etkinlikstart')
        .matches(dateRegex).withMessage(unknownError),
      exists('etkinlikend')
        .matches(dateRegex).withMessage(unknownError),
      exists('etkinlikplace')
        .isString().withMessage(unknownError),
      exists('etkinliktype')
        .isString().withMessage(unknownError),
      exists('etkinliksubject')
        .isString().withMessage(unknownError)
    ], 
    [
      exists('projename')
        .isString().withMessage(unknownError),
      exists('projestart')
        .matches(dateRegex).withMessage(unknownError),
      exists('projeend')
        .matches(dateRegex).withMessage(unknownError),
      exists('projesubject')
        .isString().withMessage(unknownError)
    ]
  ])
];