import React from "react";
import Post from "./Post";
import DisLikes from "./DisLikes";
import Likes from "./Likes";

const Feed = ({ post }) => {
  return (
    <>
      <div className="likes">
        <Post post={post} />
      </div>
      <div className="likes">
        <Likes post={post} />
        <DisLikes post={post} />
        <p
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            padding: "0.25rem",
            color: "green",
          }}
        >
          {post.comments.length}{" "}
          {post.comments.length === 1 ? "comment" : "comments"}
        </p>
        <br />
      </div>
    </>
  );
};

export default Feed;
