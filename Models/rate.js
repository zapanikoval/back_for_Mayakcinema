const mongoose = require("mongoose");
const Schema = mongoose.Schema;
module.exports = new Schema({
  user: {
    type: String,
    unique: true
  },
  type: {
    type: String,
  }
});
