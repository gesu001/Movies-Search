const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
  _id: ID
  username: String
  email: String
  password: String
  movieCount: Int
  movies: [Movie]!
}

type Movie {
  _id: ID
  movieId: String
  title: String
  overview: String
  image: String
  releaseDate: String
  voteAverage: Float
  homePage:String
  runtime: Int
  comments: [Comment]
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
    voteAverage: Float
    homePage: String
    runtime: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(userId: ID!): User
    me: User
    movies: [Movie]
    singleMovie(movie_id: ID!): Movie
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveMovie(movieId: String,
      title: String,
      overview: String,
      image: String,
      releaseDate: String,
      voteAverage: Float,
      homePage: String,
      runtime: Int): Movie
    removeMovie(movie_id: ID!): Movie
    addComment(movie_id: ID!, commentText: String!): Movie
    removeComment(movie_id: ID!, commentId: ID!): Movie
  }
`;

module.exports = typeDefs;
