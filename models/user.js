const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// How complex you want the salt to be.
const SALT_ROUNDS = 6;

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  password: String
}, {
  timestamps: true
});

// When a password is created, the old password is deleted and replaced with
// serialized one.
userSchema.set('toJSON', {
  transform: function(doc, ret) {
    // remove the password property when serializing doc to JSON
    delete ret.password;
    return ret;
  }
});

// Runs before the user is saved.
userSchema.pre('save', function(next) {
  const user = this; // the current document

  // If the password hasn't changed, leave.
  if (!user.isModified('password')) return next();
  
  // If password has changed or it is the first time creating the password
  // args: data to be hashed, number of salt rounds, cb (function to be fired once encryption complete)
  // node function... error first signature
  bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash) {
    if (err) return next(err);

    // Update clear-text password with the hash
    user.password = hash;
  
    next(); // Tells Mongoose we are done with this function.
  });
});

userSchema.pre('findOneAndUpdate', async function(next) {
  const user = await this.getUpdate();
  
  const hash = await bcrypt.hash(user.password, SALT_ROUNDS);

  user.password = hash;

  next();
});

// Instance method -- callable on the document itself.
userSchema.methods.comparePassword = function(tryPassword, cb) {
  // Compare passed password with document's password.

  bcrypt.compare(tryPassword, this.password, cb);
};

module.exports = mongoose.model('User', userSchema);

// Fat models, skinny controllers.