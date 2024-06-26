import mongoose from 'mongoose';
import User from '../users/model'

const movieSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
  title: { type: String, required: true },
  description: { type: String },
  releaseYear: { type: Number },
  genre: { type: String },
  watched: { type: Boolean, default: false },
  rating: { type: Number, min: 1, max: 5 },
  review: { type: String }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;