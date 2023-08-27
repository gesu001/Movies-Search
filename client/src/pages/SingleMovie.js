import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';
import { searchSingle } from '../utils/API';
import { useParams } from 'react-router-dom';
import { saveMovieIds, getSavedMovieIds } from '../utils/localStorage';
import { useMutation } from '@apollo/client';
import { SAVE_MOVIE } from '../utils/mutations';

import { QUERY_ME } from '../utils/queries';

import Comments from '../components/Comments';
import CommentForm from '../components/CommentForm';


const SingleMovie = () => {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState({});
  const [savedMovieIds, setSavedMovieIds] = useState(getSavedMovieIds());
  const [saveMovie, { error }] = useMutation(SAVE_MOVIE, {
    update(cache, { data: { saveMovie } }) {
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
                { ...saveMovie }
              ],
            },
          },
        });
      } catch (e) {}
    },
  });

  useEffect(() => {
    return () => saveMovieIds(savedMovieIds);
  });
  
  const getSingleMovie = async (query)=> {
    
    try {
      const response = await searchSingle (query);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const result = await response.json();
      
      const Data = {
        movieId: movieId,
        title: result.title,
        overview: result.overview,
        image: `https://image.tmdb.org/t/p/original/${result.poster_path}`,
        releaseDate: result.release_date,
        voteAverage: result.vote_average,
        runtime: result.runtime,
        homepage: result.homepage
      }
      console.log(Data)
      setMovieData(Data);
    } catch (err) {
      console.error(err);
    }
  }
  
  useEffect(()=> {
    getSingleMovie(movieId)
  }, [])
  
  const handleSaveMovie = async () => {
    // get tokens
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

    try {
      await saveMovie({
        variables: { ...movieData},
      });

      // if book successfully saves to user's account, save book id to state
      setSavedMovieIds([...savedMovieIds, movieId]);
      saveMovieIds(savedMovieIds);
    } catch (err) {
      // console.log(error.networkError.result.errors);

      console.error(err);
    }
  };

  return (
    <>
    <Container>
    {/* <Row class='g-0'> */}
    {/* <Col md="8"> */}
    <Card key={movieId} border='dark' style={{width:"100%"}}>
      <Row class='g-0'>

        <Col md='4'>
        {movieData.image ? (
          <Card.Img src={movieData.image} alt={`The cover for ${movieData.title}`} variant='top' />
        ) : null}
        </Col>

        <Col md='8'>
        <Card.Body>
          <Card.Title>{movieData.title}</Card.Title>
          <p className='small'>Release Date: {movieData.releaseDate}</p>
          <p className='small'>Rating: {movieData.voteAverage}/10</p>
          <Card.Text>{movieData.overview}</Card.Text>
          <a href={movieData.homepage} target="_blank" rel="noopener noreferrer">Visit Movie Homepage</a> 
        </Card.Body>
        </Col>
        <Col>
        <Card.Footer className="text-muted, text-center">{Auth.loggedIn() && (
            <Button
              disabled={savedMovieIds?.some((savedMovieId) => savedMovieId === movieId)}
              className='btn-block btn-info'
              onClick={() => handleSaveMovie(movieId)}>
              {savedMovieIds?.some((savedMovieId) => savedMovieId === movieId)
                ? 'This movie has already been saved!'
                : 'Save this Movie!'}
            </Button>
          )}</Card.Footer>
          </Col>

        </Row>
      </Card>
      {/* </Col> */}
      <Col md="4">
      <p>{movieId}</p>
      <div className="my-5">
        <Comments movieId={ movieId }/>
      </div>
      <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <CommentForm movieId={ movieId } />
      </div>
        </Col>
        {/* </Row> */}
    </Container>
    </>
  );
};

export default SingleMovie;
