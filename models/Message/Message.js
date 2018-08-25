const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// require functions
const findMessagedUsers = require('./functions/findMessagedUsers');
const findMessagesWithUser = require('./functions/findMessagesWithUser');

const MessageSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId, 
    ref: 'User'
  },
  to: {
    type: Schema.Types.ObjectId, 
    ref: 'User'
  },
  message: {
    type: String, 
    required: true
  },
  date: {
    type: Date, 
    default: Date.now
  }
});

MessageSchema.virtual('shortenedMessage').get(function() {  
  return this.message.substring(0, 50);
});

MessageSchema.statics.findMessagedUsers = findMessagedUsers;
MessageSchema.statics.findMessagesWithUser = findMessagesWithUser;

module.exports = mongoose.model('Message', MessageSchema);
