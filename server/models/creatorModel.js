const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const CreatorSchema = new mongoose.Schema(
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
    studio: {
      type: String,
      required: [true, 'Studio name is required for creators.'],
    },
  },
  { timestamps: true }
);

// the 'virtual' and 'pre' fields are used for front end password validation
CreatorSchema.virtual('confirmPassword')
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));

CreatorSchema.pre('validate', function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'Passwords must match.');
  }
  next();
});

// AUTH: the pre property is needed to handle AUTH. Takes password, hashes it, and stores it
CreatorSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 10).then((hashedPassword) => {
    this.password = hashedPassword;
    next();
  });
});

const Creator = mongoose.model('Creator', CreatorSchema);

module.exports = Creator;
