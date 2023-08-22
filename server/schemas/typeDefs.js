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
  }
  
  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  input movieInput {
    movieId: String
    title: String
    overview: String
    image: String
    releaseDate: String
    voteAverage: String
    homePage: String
    runtime: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(userId: ID!): User
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveMovie(movieToSave: movieInput): User
    removeMovie(movieId: String!): User
    addComment(thoughtId: ID!, commentText: String!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought
  }
`;

module.exports = typeDefs;
