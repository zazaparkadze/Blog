import React from "react";

const Comments = ({ comments }) => {
  return (
    <div>
          {comments.length ? 
              comments.map(comment => (
                <ul className="commentList" key={comment.id}>
                <li>{comment.title}</li>
                <li>{comment.dateTime}</li>
                <li>{comment.postBody}</li>
                </ul>  
              )) :
              (<p>Be the first to comment!!!!</p>)
             }
    </div>
  );
};

export default Comments;

