const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
  {
    // username will be a studio / company name for creators
    username: {
      type: String,
      required: [true, 'Username is required.'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Email address is required.'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: [8, 'Password must be at least 8 characters.'],
    },
  },
  { timestamps: true }
);

// Add this line to define the unique index for username
UserSchema.index({ username: 1 }, { unique: true });

// the 'virtual' and 'pre' fields are used for front end password validation
UserSchema.virtual('confirmPassword')
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));

UserSchema.pre('validate', function (next) {
  // console.log('in validate');

  if (this.password !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'Passwords must match.');
    console.log('Passwords don\'t match.');
  }
  next();
});

// AUTH: the pre property is needed to handle AUTH. Takes password, hashes it, and stores it
UserSchema.pre('save', function (next) {
  // console.log('in pre save');

  bcrypt.hash(this.password, 10).then((hashedPassword) => {
    // console.log('in hash');
    this.password = hashedPassword;
    next();
  });
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
