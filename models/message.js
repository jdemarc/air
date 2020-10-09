const mongoose = require('mongoose');

// TO IMPLEMENT
const userSchema = new mongoose.Schema({
  content: String,

}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);