const mongoose = require('mongoose');
const User = require('../../../models/User/User');

const airtable = require('airtable');
airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_API_KEY
});
const base = airtable.base('appeBo7sITVab1nYA');

const sendMail = require('../../../utils/sendMail');

module.exports = (req, res, next) => {
  let newUserData = {
    auth: {
      email: req.body.email,
      password: req.body.password
    },
    person: {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      phone: req.body.phone
    },
    user: {
      userType: 'etkinlik',
      name: req.body.etkinlikname,
      date: {
        start: req.body.start,
        end: req.body.end,
      },
      sponsorshipType: req.body.sponsorshiptype,
      subject: req.body.subject,
      location: req.body.location,
      etkinlikType: req.body.type
    }
  };

  const newUser = new User(newUserData);
  newUser.save(err => {
    if (err) return console.log(err);

    base('Üyeler').create({
      'İsim': req.body.etkinlikname,
      'Ad': req.body.name,
      'Soyad': req.body.surname,
      'Email': req.body.email,
      'Telefon': req.body.phone,
      'Tip': ['etkinlik'],
      'Giriş sayısı': 1
    }, (err, record) => {
      if (err) return console.log(err);

      req.session.user = {
        ...newUser.user,
        email: newUser.person.email,
        id: newUser._id
      };
  
      sendMail({
        name: newUser.user.name,
        email: newUser.person.email
      }, 'etkinlikRegister', (err, info) => {
        if (err) return console.log(err);
        res.redirect('/app');
      });
    });
  });
};