const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  message: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  channel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Channel'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Message', messageSchema);