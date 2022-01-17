const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      trim: true,
      required: true,
    },
    address: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 2,
      max: 64,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);