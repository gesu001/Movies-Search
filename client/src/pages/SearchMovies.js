import React, { useState} from 'react';
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import Auth from '../utils/auth';
import { search} from '../utils/API';

const SearchMovies = () => {
  // create state for holding returned google api data
  const [searchedMovies, setSearchedMovies] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // const getPopularMovie = async () => {
  //   try {
  //     const response = await popularMovie();

  //     if (!response.ok) {
  //       throw new Error('something went wrong!');
  //     }

  //     // const { items } = await response.json();
  //     const { results } = await response.json();

  //     const popularMovie = results.map((result) => ({
  //       movieId: result.id,
  //       title: result.title,
  //       overview: result.overview,
  //       image: `https://image.tmdb.org/t/p/original/${result.poster_path}`,
  //       releaseDate: result.release_date,
  //       voteAverage: result.vote_average
  //     }))

  //     setSearchedMovies(popularMovie);
  //   } catch (err) {
  //     console.error(err);
  //   }

  // useEffect(()=> {
  //   getPopularMovie()
  // }, [])

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
      <div className='text-light bg-primary pt-5'>
        <Container>
          <h1>Search for Movies!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a movie'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
        <h2 className='pt-5'>
          {searchedMovies.length
            ? `Viewing ${searchedMovies.length} results:`
            : 'Search for a movie to begin'}
        </h2>
        <Row>
          {searchedMovies.map((movie) => {
            return (
              <Col md="3">
                <Card key={movie.movieId} border='dark'>
                  {movie.image ? (
                    <Card.Img src={movie.image} alt={`The cover for ${movie.title}`} variant='top' />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <p className='small'>Release Date: {movie.releaseDate}</p>
                    <p className='small'>Rating: {movie.voteAverage}/10</p>
                    <Card.Text>{movie.overview}</Card.Text>
                    <Link className='btn-block btn-info' to={`/movie/${movie.movieId}`}
                        >View Details</Link>
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

export default SearchMovies;
