const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  createdAt: String,
  isAdmin: Boolean,
});

module.exports = mongoose.model("user", userSchema);
