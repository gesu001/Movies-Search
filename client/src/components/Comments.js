import React from 'react';
import { useQuery } from '@apollo/client';

import CommentList from './CommentList';

import { QUERY_COMMENTS } from '../utils/queries';

const Comments= ({movieId}) => {
  const { loading, data } = useQuery(QUERY_COMMENTS, {
    variables: {movieId: movieId}
  });
  const comments = data?.comments || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <CommentList
              comments={comments}
              title="Movie Reviews"
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Comments;
