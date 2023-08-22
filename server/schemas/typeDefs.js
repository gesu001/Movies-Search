const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    movieCount: Int
    movies: [Movie]
  }

  type Movie {
    _id: ID
    movieId: String
    title: String
    overview: String
    image: String
    releaseDate: String
    voteAverage: String
    homePage:String
    runtime: String
    comments: [Comment]
  }
  
  input movieInput {
    movieId: String
    title: String
    overview: String
    image: String
    releaseDate: String
    voteAverage: String
    homePage:String
    runtime: String
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(userId: ID!): User
    me: User
    movie(movieId: String): Movie
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveMovie(moveToSave: movieInput): User
    removeMovie(movieId: String!): User
    addComment(movieId: String!, commentText: String!): Movie
    removeComment(movieId: String!, commentId: ID!): Movie
  }
`;

module.exports = typeDefs;
