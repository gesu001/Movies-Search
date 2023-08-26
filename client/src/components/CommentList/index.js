import React from 'react';
import { Link } from 'react-router-dom';

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
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${comment.commentAuthor}`}
                >
                  {comment.commentAuthor} <br />
                  <span style={{ fontSize: '1rem' }}>
                    had this comment on {comment.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You had this comment on {comment.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{comment.commentText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/comments/${comment._id}`}
            >
              Join the discussion on this comment.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default CommentList;
