import React, { useState } from 'react';
import {
  Container,
  Card,
} from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import Auth from '../utils/auth';
import { searchSingle } from '../utils/API';
import { useParams } from 'react-router-dom';


const SingleMovie = () => {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState({});

    try {
      const response = searchSingle({movieId});
      const { result } =  response.json();
      
      const Data = {
        movieId: movieId,
        title: result.title,
        overview: result.overview,
        image: `https://image.tmdb.org/t/p/w500/${result.poster_path}`,
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
    


  return (
    <>
    <Container>
    <Card key={movieId} border='dark'>
        {movieData.image ? (
          <Card.Img src={movieData.image} alt={`The cover for ${movieData.title}`} variant='top' />
        ) : null}
        <Card.Body>
          <Card.Title>{movieData.title}</Card.Title>
          <p className='small'>Release Date: {movieData.releaseDate}</p>
          <p className='small'>Rating: {movieData.voteAverage}/10</p>
          <Card.Text>{movieData.overview}</Card.Text>
          <a href='movieData.homepage'><button>Visit Movie Homepage</button></a>
        </Card.Body>
      </Card>
    </Container>



    </>
  );
};

export default SingleMovie;
