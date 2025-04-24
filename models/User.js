// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  settings: {
    bufferTime: { type: Number, default: 5 },
    walkingSpeed: { type: Number, default: 5 }
  },
  favoriteRoutes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Route' }],
  telegramChatId: String
});

module.exports = mongoose.model('User', userSchema);
