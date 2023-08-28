import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_COMMENT } from '../utils/mutations';
import { QUERY_COMMENTS } from '../utils/queries';


import Auth from '../utils/auth';

const CommentForm = ({ movieId }) => {

  const [commentText, setCommentText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addComment, { error }] = useMutation(ADD_COMMENT, {
    update(cache, { data: { addComment } }) {
      try {
        const { comments } = cache.readQuery({ 
          query: QUERY_COMMENTS,
          variables: { movieId: movieId }
        });

        cache.writeQuery({
          query: QUERY_COMMENTS,
          data: { comments: [addComment, ...comments] },
          variables: {movieId: movieId}
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      // const { me } = cache.readQuery({ query: QUERY_ME });
      // cache.writeQuery({
      //   query: QUERY_ME,
      //   data: { me: { ...me, thoughts: [...me.thoughts, addThought] } },
      // });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addComment({
        variables: {
          movieId: movieId,
          commentText,
          commentAuthor: Auth.getProfile().data.username,
        },
      });

      setCommentText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'commentText' && value.length <= 280) {
      setCommentText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <p className='fs-4'>Share your reviews on this movie?</p>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
            {error && <span className="ml-2">{error.message}</span>}
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12">
              <textarea
                name="commentText"
                placeholder="Add your review..."
                value={commentText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-6">
              <button className="btn btn-secondary btn-block" type="submit">
                Add Review
              </button>
            </div>
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your reviews. Please{' '}
          Login or Sign Up.
        </p>
      )}
    </div>
  );
};

export default CommentForm;
