const { AuthenticationError } = require('apollo-server-express');
const { User, Movie } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      user: async (parent, { userId }) => {
        return User.findOne({ _id: userId });
      },

      me: async (parent, args, context) => {
        if (context.user) {
          return User.findOne({ _id: context.user._id }).select('-__v -password').populate("movies");
        }
        throw new AuthenticationError('You need to be logged in!');
      },
      movie: async (parent, { movieId }) => {
        return Movie.findOne({ movieId: movieId });
      }
    },
  
    Mutation: {
      addUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      },

      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError('No user found with this email address');
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const token = signToken(user);
  
        return { token, user };
      },

      saveMovie: async (parent, { movieToSave }, context) => {
        if (context.user) {
          const updatedmovies = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { movies: movieToSave } },
            { new: true }
          ).populate('movies');
  
          return updatedmovies;
        }
        throw new AuthenticationError('You need to be logged in!');
      },

      removeMovie: async (parent, { movieId }, context) => {
        if (context.user) {
          return User.findOneAndUpdate(
            { _id: context.user._id },
            {
              $pull: {
                movies: {
                  movieId: movieId,
                },
              },
            },
            { new: true }
          );
        }
        throw new AuthenticationError('You need to be logged in!');
      },

      addComment: async (parent, { movieId, commentText }, context) => {
        if (context.user) {
          return Movie.findOneAndUpdate(
            { movieId: movieId },
            {
              $addToSet: {
                comments: { commentText, commentAuthor: context.user.username },
              },
            },
            {
              new: true,
              runValidators: true,
            }
          );
        }
        throw new AuthenticationError('You need to be logged in!');
      },

      removeComment: async (parent, { movieId, commentId }, context) => {
        if (context.user) {
          return Movie.findOneAndUpdate(
            { movieId: movieId },
            {
              $pull: {
                comments: {
                  _id: commentId,
                  commentAuthor: context.user.username,
                },
              },
            },
            { new: true }
          );
        }
        throw new AuthenticationError('You need to be logged in!');
      },
    },
  };
  
  module.exports = resolvers;