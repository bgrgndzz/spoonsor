const mongoose = require('mongoose');
const User = require('../../../models/User/User');

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
      userType: req.body.type,
    }
  };
  
  if (req.body.type === 'etkinlik') {
    newUserData.user = {
      ...newUserData.user,
      name: req.body.etkinlikname,
      start: req.body.etkinlikstart,
      end: req.body.etkinlikend,
      sponsorshipType: req.body.sponsorshiptype,
      seekerSubject: req.body.etkinliksubject,
      etkinlikPlace: req.body.etkinlikplace,
      etkinlikType: req.body.etkinliktype
    };
  } else if (req.body.type === 'proje') {
    newUserData.user = {
      ...newUserData.user,
      name: req.body.projename,
      start: req.body.projestart,
      end: req.body.projeend,
      sponsorshipType: req.body.sponsorshiptype,
      seekerSubject: req.body.projesubject
    };
  }

  const newUser = new User(newUserData);
  newUser.save(err => {
    if (err) return res.status(500).send(err);
    
    req.session.user = newUser.user;
    return res.status(200).json({success: true});
  });
};