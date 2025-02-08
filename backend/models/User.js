const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  aadhaarNumber: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  anonymousID: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);
