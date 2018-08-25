module.exports = function (user, other, callback) {
  this
    .find({$or: [{$and: [{from: user}, {to: other}]}, {$and: [{from: other}, {to: user}]}]})
    .sort('date')
    .populate('from', 'user')
    .populate('to', 'user')
    .exec((err, messages) => {
      if (err) return callback(err);
      callback(null, messages.map(message => ({
        ...message._doc,
        type: message.from.id.toString() === user ? 'sent' : 'received',
        user: {
          ...message.from._doc.user,
          id: message.from.id
        }
      })));
    });
};