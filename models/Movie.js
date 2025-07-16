const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: String,
  director: String,
  year: String,
  genre: String,
  description: String,
  image: String
}, { timestamps: true });

module.exports = mongoose.model('Movie', MovieSchema);