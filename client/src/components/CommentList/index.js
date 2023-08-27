import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
} from 'react-bootstrap';

const CommentList = ({
  comments,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!comments.length) {
    return <h3>No comments Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {comments &&
        comments.map((comment) => (
          <div key={comment._id} className="card mb-3">
            <p className="card-header p-2 m-0">
                  {comment.commentAuthor} reviewed on {comment.createdAt}
            
            </p>
            <div className="card-body bg-light p-2">
              <p>{comment.commentText}</p>
            </div>
            {/* <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/comments/${comment._id}`}
            >
              Join the discussion on this comment.
            </Link> */}
          </div>
        ))}
        
    </div>
  );
};

export default CommentList;
