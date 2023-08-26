import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query User($userId: ID!) {
  user(userId: $userId) {
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
`;

export const QUERY_ME = gql`
query Me {
  me {
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
`;

export const QUERY_MOVIES = gql`
query Movies {
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
`;

export const QUERY_SINGLE_MOVIE = gql`
query SingleMovie($movieId: ID!) {
  singleMovie(movie_id: $movieId) {
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

export const QUERY_COMMENT = gql`
query Comment($movieId: String) {
  comment(movieId: $movieId) {
    _id
    movieId
    commentText
    commentAuthor
    createdAt
  }
}
`;

export const QUERY_COMMENTS = gql`
query Comments($movieId: String) {
  comments(movieId: $movieId) {
    _id
    movieId
    commentText
    commentAuthor
    createdAt
  }
}
`;