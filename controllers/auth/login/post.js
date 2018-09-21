const mongoose = require('mongoose');
const User = require('../../../models/User/User');

const airtable = require('airtable');
airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_API_KEY
});
const base = airtable.base('appeBo7sITVab1nYA');

module.exports = (req, res, next) => {
  base('Üyeler').select({
    filterByFormula: `{Email} = '${req.validatedUser.person.email}'`
  }).firstPage((err, records) => {
    if (err) return console.log(err);

    base('Üyeler').update(records[0].getId(), {
      'Giriş sayısı': records[0].get('Giriş sayısı') + 1
    }, (err, record) => {
      if (err) return console.log(err);

      req.session.user = {
        ...req.validatedUser.user,
        email: req.validatedUser.person.email,
        id: req.validatedUser._id
      };
      res.redirect('/app');
    });
  });
};