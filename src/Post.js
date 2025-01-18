import React from "react";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  return (
    <div className="post">
      <Link to={`/posts/${post.id}`}>
      <h3>{post.title}</h3>
        <h6>{post.dateTime}</h6>
        </Link>
      <p>
        {post.postBody.length < 25 ? post.postBody : post.postBody.slice(0, 35) + "..."}
      </p>
    </div>
  );
};

export default Post;
