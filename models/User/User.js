const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  // required
  auth: {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  person: {
    name: {
      type: String,
      required: true
    },
    surname: {
      type: String,
      required: true
    },
    email: {
      type: String, 
      required: true
    },
    phone: {
      type: String, 
      required: true
    }
  },
  user: {
    // shared
    name: {
      type: String, 
      required: true
    },
    userType: {
      type: String, 
      required: true
    },
    profilepicture: {
      type: String, 
      required: true,
      default: 'default.jpg'
    },
    active: {
      type: Boolean, 
      required: true, 
      default: false
    },
    // seeker/shared
    start: Date,
    end: Date,
    sponsorshipType: String,
    seekerSubject: String,
    // seeker/etkinlik
    etkinlikPlace: String,
    etkinlikType: String,
  },
  passwordReset: {
    hash: String
  }
});

module.exports = mongoose.model('User', UserSchema);
