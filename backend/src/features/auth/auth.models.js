const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, default: '' }
  },
  { timestamps: true }
);

const UserModel = mongoose.model('User', userSchema);

module.exports = { UserModel };
