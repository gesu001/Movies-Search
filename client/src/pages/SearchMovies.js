import React, { useState } from 'react';
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
import { search } from '../utils/API';
// import { saveBookIds, getSavedBookIds } from '../utils/localStorage';

// import { useMutation } from '@apollo/client';
// import { ADD_BOOK } from '../utils/mutations';

// import { QUERY_ME } from '../utils/queries';

const SearchMovies = () => {
  // create state for holding returned google api data
  const [searchedMovies, setSearchedMovies] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved bookId values
  // const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());

  // const [addBook, { error }] = useMutation(ADD_BOOK, {
  //   // The below block ensures that as soon as the user saves a book, it appears right away in the saved books page
  //   update(cache, { data: { addBook } }) {
  //     try {
  //       const { me } = cache.readQuery({
  //         query: QUERY_ME,
  //       });

  //       cache.writeQuery({
  //         query: QUERY_ME,
  //         data: {
  //           me: {
  //             ...me,
  //             savedBooks: [
  //               ...me.savedBooks,
  //               addBook.savedBooks[addBook.savedBooks.length - 1],
  //             ],
  //           },
  //         },
  //       });
  //     } catch (e) {}
  //   },
  // });

  // useEffect(() => {
  //   return () => saveBookIds(savedBookIds);
  // });

  // create method to search for books and set state on form submit
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
        image: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
        releaseDate: movie.release_date,
        voteAverage: movie.vote_average
      }))

      setSearchedMovies(movieData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // // create function to handle saving a book to our database
  // const handleSaveBook = async (bookId) => {
  //   // find the book in `searchedMovies` state by the matching id
  //   const bookToSave = searchedMovies.find((book) => book.bookId === bookId);

  //   // get tokens
  //   const token = Auth.loggedIn() ? Auth.getToken() : null;
  //   if (!token) {
  //     return false;
  //   }

  //   try {
  //     await addBook({
  //       variables: { bookToSave },
  //     });

  //     // if book successfully saves to user's account, save book id to state
  //     setSavedBookIds([...savedBookIds, bookToSave.bookId]);
  //     saveBookIds(savedBookIds);
  //   } catch (err) {
  //     // console.log(error.networkError.result.errors);

  //     console.error(err);
  //   }
  // };

  return (
    <>
      <div className='text-light bg-dark pt-5'>
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
                    <Card.Link as={Link} to='/SingleMovie' className='btn-block btn-info'
                        >View Details</Card.Link>
                    {/* {Auth.loggedIn() && (
                      <Button
                        disabled={savedBookIds?.some((savedBookId) => savedBookId === book.bookId)}
                        className='btn-block btn-info'
                        onClick={() => handleSaveBook(book.bookId)}>
                        {savedBookIds?.some((savedBookId) => savedBookId === book.bookId)
                          ? 'This book has already been saved!'
                          : 'Save this Book!'}
                      </Button>
                    )} */}
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
