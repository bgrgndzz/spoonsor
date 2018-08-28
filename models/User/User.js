// require mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// require functions
const hashPassword = require('./functions/hashPassword');
const verifyPassword = require('./functions/verifyPassword');
const byType = require('./functions/byType');

const UserSchema = new Schema({
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
    description: String,
    sponsorshipType: [String],
    date: {
      start: Date,
      end: Date,
    },
    location: String,
    subject: String,
    etkinlikType: String,
    target: String,
    gender: {
      male: Number,
      female: Number
    },
    age: String,
    expectedAttendance: Number,
    sponsors: [String],
    social: {
      website: String,
      instagram: String
    },
    old: {
      attendance: Number,
      audience: String,
      promotion: String,
      sponsors: [String]
    }
  },
  passwordReset: {
    hash: String
  },
  preSave: {
    type: Boolean,
    default: true
  }
});

UserSchema.virtual('user.shortenedDescription').get(function() {  
  return this.user.description ? this.user.description.substring(0, 100) : '';
});

UserSchema.pre('save', hashPassword);
UserSchema.methods.verifyPassword = verifyPassword;
UserSchema.query.byType = byType;

module.exports = mongoose.model('User', UserSchema);
