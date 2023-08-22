const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const movieSchema = new Schema({

  movieId: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  overview: {
    type: String,
    required: true,
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

module.exports = movieSchema;