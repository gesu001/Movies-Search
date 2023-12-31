import React from 'react';
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  CardGroup
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


  const [removeMovie, { error }] = useMutation(REMOVE_MOVIE, {refetchQueries: [ QUERY_ME ]});

  const handleDeleteMovie = async (movieId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
     const movie = await removeMovie({
        variables: { movieId },
      });

      removeMovieId(movie.data.removeMovie.movieId);

     
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
      <div fluid className='text-light bg-dark p-4'>
        <Container>
          <h2>Your Movie Lists</h2>
        </Container>
      </div>
      <Container>
        <h5 className='pt-5 fs-2'>
          {(userData.movies || []).length
            ? `${userData.movies.length} saved ${userData.movies.length === 1 ? 'movie' : 'movies'}:`
            : 'You have no saved movies!'}
        </h5>
        <Row xs={1} md={4} className="g-4">
          {userData?.movies?.map((movie) => {
            return (
              <CardGroup>
                <Card key={movie._id} border='dark'>
                  {movie.image ? <Card.Img src={movie.image} alt={`The cover for ${movie.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <p><Link className='btn-block btn-info' to={`/movie/${movie.movieId}`}> 
                    View Movie Details</Link></p>
                    {/* <Card.Text>{movie.overview}</Card.Text> */}
                    {/* <p>{movie._id}</p>
                    <p>{movie.movieId}</p> */}
                  </Card.Body>
                  <Card.Footer ><Button variant="outline-secondary" onClick={() => handleDeleteMovie(movie._id)}>
                      Remove this Movie!
                    </Button></Card.Footer>
                </Card>
              </CardGroup>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedMovies;
