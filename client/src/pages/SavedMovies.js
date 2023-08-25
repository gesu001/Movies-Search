import React from 'react';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { removeMovieId } from '../utils/localStorage';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_MOVIE } from '../utils/mutations';

const SavedMovies = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const userData = data?.me || {};


  const [removeMovie, { error }] = useMutation(REMOVE_MOVIE, {
    update(cache, { data: { removeMovie } }) {
      try {
        const { me } = cache.readQuery({
          query: QUERY_ME,
        });

        cache.writeQuery({
          query: QUERY_ME,
          data: {
            me: {
              ...me,
              movies: [
                ...me.movies,
                { ...removeMovie }
              ],
            },
          },
        });
      } catch (e) {}
    },
  });

  const handleDeleteMovie = async (movieId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
     const movie = await removeMovie({
        variables: {movieId},
      });

      removeMovieId(movie.data.removeMovie.movieId);
      document.getElementById(movie.data.removeMovie.movieId).remove();
     
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  
  return (
    <>
      <div fluid className='text-light bg-dark p-5'>
        <Container>
          <h1>Viewing saved movies!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {(userData.movies || []).length
            ? `Viewing ${userData.movies.length} saved ${userData.movies.length === 1 ? 'movie' : 'movies'}:`
            : 'You have no saved movies!'}
        </h2>
        <Row>
          {userData?.movies?.map((movie) => {
            return (
              <Col md="4">
                <Card key={movie.movieId} border='dark'>
                  {movie.image ? <Card.Img src={movie.image} alt={`The cover for ${movie.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>{movie.overview}</Card.Text>
                    <p>{movie._id}</p>
                    <Link className='btn-block btn-info' to={`/movie/${movie.movieId}`}
                        >View Details</Link>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteMovie(movie._id)}>
                      Delete this Movie!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedMovies;