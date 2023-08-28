import React, { useState, useEffect} from 'react';
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row,
  Nav,
  CardGroup
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import Auth from '../utils/auth';
import { search, popularMovie } from '../utils/API';

const SearchMovies = () => {
  // create state for holding returned google api data
  const [searchedMovies, setSearchedMovies] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  const getPopularMovie = async () => {
    try {
      const response = await popularMovie();

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { results } = await response.json();

      const movieData = results.map((movie) => ({
        movieId: movie.id,
        title: movie.title,
        overview: movie.overview,
        image: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
        releaseDate: movie.release_date,
        voteAverage: movie.vote_average
      }))

      setSearchedMovies(movieData);
    } catch (err) {
      console.error(err);
    }

  };

  useEffect(()=> {
    getPopularMovie()
  }, [])
  

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await search(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      // const { items } = await response.json();
      const { results } = await response.json();

      const movieData = results.map((movie) => ({
        movieId: movie.id,
        title: movie.title,
        overview: movie.overview,
        image: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
        releaseDate: movie.release_date,
        voteAverage: movie.vote_average
      }))

      setSearchedMovies(movieData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };
 
  return (
    <>
      <div className='text-dark bg-dark pt-5'>
        <Container>
          {/* <h1>Search for Movies!</h1> */}
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='movie name'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant="secondary" size="lg" active>
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <div className='p-5'>
        <h2 className='pt-1'>
          {searchedMovies.length
            ? `Viewing ${searchedMovies.length} results:`
            : 'Search for a movie to begin'}
        </h2>
        <Row xs={1} md={3} lg={4} className="g-4">
          {searchedMovies.map((movie) => {
            return (
              <CardGroup>  
                <Card className="bg-dark text-white" key={movie.movieId} border='dark'>
                <Nav.Link className="boder-success-hover" as={Link} to={`/movie/${movie.movieId}`}>
                  {movie.image ? (
                    <Card.Img src={movie.image} alt={`The cover for ${movie.title}`} variant='top' />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <p >Release Date: {movie.releaseDate}</p>
                    <p>Rating: {movie.voteAverage}/10 in IMDB</p>
                    {/* <Card.Text>{movie.overview}{' '}</Card.Text> */}
                  </Card.Body>
                  </Nav.Link>
                </Card>
              </CardGroup>
            );
          })}
        </Row>
      </div>
    </>
  );
};

export default SearchMovies;
