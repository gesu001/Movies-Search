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
    movieId: String
    commentText: String
    commentAuthor: String
    createdAt: String
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
    comments(movieId: String): [Comment]
    comment(movieId: String): [Comment]
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
    addComment(movieId: String, commentText: String!, commentAuthor: String!): Comment
    removeComment(commentId: ID!): Comment
  }
`;

module.exports = typeDefs;
