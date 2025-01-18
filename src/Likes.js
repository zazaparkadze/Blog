import React from "react";
import { useState } from "react";
import { BiLike, BiSolidLike } from "react-icons/bi";
import api from "./api/posts";

const Likes = ({post}) => {
  const [count, setCount] = useState(post.likes || 0);
  const [like, setLike] = useState(false);
    
  function handleLikes(count) {
    api.put("/posts", { ...post, likes: count });
  }
    
  return (
    <div className="likes">
      {!like ? (
        <BiLike
          className="comments"
          onClick={async () => {
            await handleLikes(count + 1);
            setLike(true);
            setCount(count + 1);
          }}
        />
      ) : (
        <BiSolidLike
          className="comments"
          style={{ color: "green" }}
          onClick={async () => {
            setLike(false);
            setCount(count - 1);
            await handleLikes(count - 1);
          }}
        />
      )}
      <h6>{count}</h6>
    </div>
  );
};

export default Likes;
