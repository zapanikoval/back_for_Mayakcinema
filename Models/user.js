const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  userRole: {
    type: String,
    required: true
  },
  confirmEmail: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model("user", userSchema);
