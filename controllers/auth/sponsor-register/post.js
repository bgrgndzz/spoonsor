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
      name: req.body.sponsorname,
      userType: 'sponsor',
      description: req.body.sponsordescription,
      sponsorshipType: req.body.sponsorshiptype,
      active: true
    }
  };

  const newUser = new User(newUserData);
  newUser.save(err => {
    if (err) return res.status(500).send(err);
    
    base('Üyeler').create({
      'İsim': req.body.sponsorname,
      'Ad': req.body.name,
      'Soyad': req.body.surname,
      'Email': req.body.email,
      'Telefon': req.body.phone,
      'Tip': ['sponsor'],
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
      }, 'sponsorRegister', (err, info) => {
        if (err) return console.log(err);
        res.redirect('/app');
      });
    });
  });
};