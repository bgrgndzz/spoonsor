module.exports = function (user, callback) {
  this
    .find()
    .or([{from: user}, {to: user}])
    .sort('-date')
    .populate('from', 'user')
    .populate('to', 'user')
    .exec((err, messages) => {
      if (err) return callback(err);

      let uniqueUsers = [];
      callback(
        null, 
        messages
          .filter(message => {
            const otherUser = message.from.id.toString() === user ? message.to.id : message.from.id;
            if (uniqueUsers.includes(otherUser)) {
              return false;
            }
            uniqueUsers.push(otherUser);
            return true;
          })
          .map(message => ({
            message: message.message,
            date: message.date,
            shortenedMessage: message.shortenedMessage,
            user: message.from.id.toString() === user ? 
              {
                ...message.to.user,
                id: message.to.id
              } : 
              {
                ...message.from.user,
                id: message.from.id
              }
          }))
      );
    });
};