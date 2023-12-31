import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation Mutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
      email
      movieCount
      movies {
        _id
        movieId
        title
        overview
        image
        releaseDate
        voteAverage
        homePage
        runtime
        comments {
          _id
          movieId
          commentText
          commentAuthor
          createdAt
        }
      }
    }
  }
}
`;

export const ADD_USER = gql`
mutation Mutation($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
      email
      password
      movieCount
      movies {
        _id
        movieId
        title
        overview
        image
        releaseDate
        voteAverage
        homePage
        runtime
        comments {
          _id
          movieId
          commentText
          commentAuthor
          createdAt
        }
      }
    }
  }
}
`;

export const SAVE_MOVIE = gql`
mutation SaveMovie($movieId: String, $title: String, $overview: String, $image: String, $releaseDate: String, $voteAverage: Float, $homePage: String, $runtime: Int) {
  saveMovie(movieId: $movieId, title: $title, overview: $overview, image: $image, releaseDate: $releaseDate, voteAverage: $voteAverage, homePage: $homePage, runtime: $runtime) {
    _id
    movieId
    title
    overview
    image
    releaseDate
    voteAverage
    homePage
    runtime
    comments {
      _id
      movieId
      commentText
      commentAuthor
      createdAt
    }
  }
}
`;

export const REMOVE_MOVIE = gql`
mutation RemoveMovie($movieId: ID!) {
  removeMovie(movie_id: $movieId) {
    _id
    movieId
    title
    overview
    image
    releaseDate
    voteAverage
    homePage
    runtime
    comments {
      _id
      movieId
      commentText
      commentAuthor
      createdAt
    }
  }
}
`;

export const ADD_COMMENT = gql`
mutation AddComment($commentText: String!, $commentAuthor: String!, $movieId: String) {
  addComment(commentText: $commentText, commentAuthor: $commentAuthor, movieId: $movieId) {
    _id
    movieId
    commentText
    commentAuthor
    createdAt
  }
}
`;

export const REMOVE_COMMENT = gql`
mutation RemoveComment($commentId: ID!) {
  removeComment(commentId: $commentId) {
    _id
    movieId
    commentText
    commentAuthor
    createdAt
  }
}
`;