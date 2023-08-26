const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const movieSchema = new Schema({

  movieId: {
    type: String,
  },

  title: {
    type: String,
  },

  overview: {
    type: String,
  },

  image: {
    type: String,
  },

  releaseDate: {
    type: String,
  },

  voteAverage: {
    type: Number,
  },

  homePage: {
    type: String,
  },

  runtime: {
    type: Number,
  },

  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    }
  ]
});
const Movie = model('Movie', movieSchema);

module.exports = Movie;
