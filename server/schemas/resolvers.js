const { AuthenticationError } = require('apollo-server-express');
const { User, Movie } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      users: async () => {
        return User.find().populate("movies");
      },

      user: async (parent, { userId }) => {
        return User.findOne({ _id: userId }).populate("movies");
      },

      movies: async () => {return Movie.find()},

      movie: async (parent, { movie_id }) => {
        return Movie.findOne({ _id: movie_id });
      },

      me: async (parent, args, context) => {
        if (context.user) {
          return User.findOne({ _id: context.user._id }).populate("movies");
        }
        throw new AuthenticationError('You need to be logged in!');
      },
      
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

      saveMovie: async (parent, { movieId,
        title,
        overview,
        image,
        releaseDate,
        voteAverage,
        homePage,
        runtime }, context) => {
        if (context.user) {
          const movie = await Movie.create({
        movieId,
        title,
        overview,
        image,
        releaseDate,
        voteAverage,
        homePage,
        runtime
          });
  
          await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { movies: movie._id } }
          );
  
          return movie;
        }
        throw new AuthenticationError('You need to be logged in!');
      },

      removeMovie: async (parent, { movie_id }, context) => {
        // if (context.user) {
        //   return User.findOneAndUpdate(
        //     { _id: context.user._id },
        //     {
        //       $pull: {
        //         movies: {
        //           movieId: movieId,
        //         },
        //       },
        //     },
        //     { new: true }
        //   );
        // }
        if (context.user) {
          const movie = await Movie.findOneAndDelete({
            _id: movie_id,
          });
  
          await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { movies: movie._id } }
          );
  
          return movie;
        }
        throw new AuthenticationError('You need to be logged in!');
      },

      addComment: async (parent, { movie_id, commentText }, context) => {
        if (context.user) {
          return Movie.findOneAndUpdate(
            { _id: movie_id },
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

       removeComment: async (parent, { movie_id, commentId }, context) => {
      if (context.user) {
        return Movie.findOneAndUpdate(
          { _id: movie_id },
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