const mongoose = require("mongoose");
const Schema = mongoose.Schema;
refreshTokenSchema = new Schema({
  token: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model("refreshToken", refreshTokenSchema);
