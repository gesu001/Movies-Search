const { AuthenticationError } = require('apollo-server-express');
const { User, Movie, Comment } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      users: async () => {
        return User.find().populate("movies");
      },

      user: async (parent, { userId }) => {
        return User.findOne({ _id: userId }).populate("movies");
      },

      movies: async () => {
        return Movie.find().populate("comments");
      },

      singleMovie: async (parent, { movie_id }) => {
        return Movie.findOne({ _id: movie_id }).populate("comments");
      },

      me: async (parent, args, context) => {
        if (context.user) {
          return User.findOne({ _id: context.user._id }).populate("movies");
        }
        throw new AuthenticationError('You need to be logged in!');
      },

      comments: async (parent, { movieId }) => {
        return Comment.find({movieId}).sort({ createdAt: -1 });
      },

      comment: async (parent, { movieId }) => {
        return Comment.find({movieId}).sort({ createdAt: -1 });
      },
      
    },
  
    Mutation: {
      addUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      },

      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email }).populate("movies");
  
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
            { $addToSet: { movies: movie._id } },
            { new: true }
          );
  
          return movie;
        }
        throw new AuthenticationError('You need to be logged in!');
      },

      removeMovie: async (parent, { movie_id }, context) => {
 
        if (context.user) {
          const movie = await Movie.findOneAndDelete({
            _id: movie_id,
          });
  
          await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { movies: movie._id } },
            { new: true },
          );
  
          return movie;
        }
        throw new AuthenticationError('You need to be logged in!');
      },

      addComment: async (parent, {movieId, commentText }, context) => {
        if (context.user) {
          const comment = await Comment.create({
            movieId,
            commentText,
            commentAuthor: context.user.username
              });
          
              // await Movie.findOneAndUpdate(
              //   { _id: movie_id },
              //   { $addToSet: { comments: comment._id  } },
              //   { new: true }
              // );
      
              return comment;
        }
        throw new AuthenticationError('You need to be logged in!');
      },

      removeComment: async (parent, {commentId }, context) => {
      if (context.user) {
        const comment = await Comment.findOneAndDelete(
          { _id: commentId,
            commentAuthor: context.user.username,
           });

        // await User.findOneAndUpdate(
        //   { _id: context.user._id },
        //   { $pull: { comments: comment._id}}},
        //   {new: true}
        // );

        return comment;
      throw new AuthenticationError('You need to be logged in!');
    }
    },
  }
  };
  
  module.exports = resolvers;