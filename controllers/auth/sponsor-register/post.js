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

    sendMail({
      name: newUser.user.name,
      email: newUser.person.email
    }, 'sponsorRegister', (err, info) => {
      if (err) return console.log(err);
      
      res.status(200).json({success: true});
    });
  });
};