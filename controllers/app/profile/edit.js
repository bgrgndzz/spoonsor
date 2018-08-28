const mongoose = require('mongoose');
const User = require('../../../models/User/User');

module.exports = (req, res, next) => {
  User.findById(req.session.user.id, (err, user) => {
    if (err) return console.log(err);

    if (req.body.description) user.user.description = req.body.description;
    if (req.body.sponsorshiptype.length > 0) user.user.sponsorshipType = req.body.sponsorshiptype;
    if (req.body.website) user.user.social.website = req.body.website;
    if (req.body.instagram) user.user.social.instagram = req.body.instagram;

    if (req.session.user.userType === 'etkinlik') {
      if (req.body.target) user.user.target = req.body.target;
      if (req.body.expectedAttendance) user.user.expectedAttendance = req.body.expectedAttendance;
      if (req.body.age) user.user.age = req.body.age;
      if (req.body.male) user.user.gender.male = req.body.male;
      if (req.body.female) user.user.gender.female = req.body.female;
      if (req.body.sponsors.length > 0) user.user.sponsors = req.body.sponsors;
      if (req.body.attendance) user.user.old.attendance = req.body.attendance;
      if (req.body.audience) user.user.old.audience = req.body.audience;
      if (req.body.promotion) user.user.old.promotion = req.body.promotion;
      if (req.body.oldsponsors.length > 0) user.user.old.sponsors = req.body.oldsponsors;
    }
    user.preSave = false;

    user.save(err => {
      if (err) return console.log(err);

      req.session.user = {
        ...req.session.user,
        ...user.user,
      };
      return res.status(200).json({success: true});
    });
  });
};