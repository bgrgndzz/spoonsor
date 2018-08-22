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
      name: req.body.sponsorname,
      description: req.body.sponsordescription,
      userType: 'sponsor',
      sponsorName: req.body.sponsorname,
      sponsorDescription: req.body.sponsordescription,
      sponsorshipType: req.body.sponsorshiptype,
      active: true
    }
  };

  const newUser = new User(newUserData);
  newUser.save(err => {
    if (err) return res.status(500).send(err);
    
    req.session.user = {
      ...newUser.user,
      email: newUser.person.email
    };
    return res.status(200).json({success: true});
  });
};