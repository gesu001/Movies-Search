import React, { useState } from 'react';
import {useQuery } from '@apollo/client';


import {QUERY_COMMENT } from '../utils/queries';

const CommentList = ({ movieId }) => {

  const [commentsList, setCommentsList] = useState([]);
  const [loading, data] = useQuery(QUERY_COMMENT, {
    variables: { movieId: movieId },
  });
  const comments = data?.comment || []
  setCommentsList(comments)
  if (loading) {
    return <div>Loading...</div>;
  }



  if (!commentsList.length) {
    return <h3>No Reviews Yet</h3>;
  }

  return (
    <>
      <h3
        className="p-5 display-inline-block"
        style={{ borderBottom: '1px dotted #1a1a1a' }}
      >
        Reviews
      </h3>
      <div className="flex-row my-4">
        {commentsList &&
          commentsList.map((comment) => (
            <div key={comment._id} className="col-12 mb-3 pb-3">
              <div className="p-3 bg-dark text-light">
                <h5 className="card-header">
                  {comment.commentAuthor} reviewed{' '}
                  <span style={{ fontSize: '0.825rem' }}>
                    on {comment.createdAt}
                  </span>
                </h5>
                <p className="card-body">{comment.commentText}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default CommentList;
