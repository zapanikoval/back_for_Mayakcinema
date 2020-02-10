const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CommentSchema = require("./comment");
const RateSchema = require("./rate");

soonFilmSchema = new Schema({
  type: String,
  link: String,
  smallPoster: String,
  fullPoster: String,
  name: String,
  originalName: String,
  producer: String,
  releaseDate: String,
  style: String,
  studio: String,
  mainRoles: String,
  description: String,
  likes: Number,
  dislike: Number,
  rates: [RateSchema],
  comments: [CommentSchema]
});

module.exports = mongoose.model("SoonFilm", soonFilmSchema);
