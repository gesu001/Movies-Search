import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
} from 'react-bootstrap';
import Auth from '../../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { REMOVE_COMMENT } from '../../utils/mutations';
import { QUERY_COMMENTS } from '../../utils/queries';
const CommentList = ({
  comments,
  movieId,
  title,
  showTitle = true,
  // showUsername = true,
}) => {
  const [removeComment, { error }] = useMutation(REMOVE_COMMENT,{
    refetchQueries: [ QUERY_COMMENTS]});
  if (!comments.length) {
    return <h3>No Reviews Yet</h3>;
  }
  const handleRemoveComment = async (commentId) => {
    console.log({commentId})
    try {
      const { data } = await removeComment({
        variables: {commentId}
    });
   } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {comments &&
        comments.map((comment) => (
          <div key={comment._id} className="card mb-3">
            <p className="card-header p-2 m-0">
                  <span className='fw-bolder'>{comment.commentAuthor}</span> reviewed on {comment.createdAt}
            </p>
            <div className="card-body bg-light p-2">
              <p>{comment.commentText}</p>
            </div>
            {Auth.loggedIn() && (
                    <button
                      className="btn btn-sm btn-danger ml-auto"
                      onClick={() => handleRemoveComment(comment._id)}
                    >
                      Delete Comment!
                    </button>
                  )}
          </div>
        ))}
        
    </div>
  );
};

export default CommentList;
