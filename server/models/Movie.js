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
    type: String,
  },

  homePage: {
    type: String,
  },

  runtime: {
    type: String,
  },

  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ]
});
const Movie = model('Movie', movieSchema);

module.exports = Movie;
