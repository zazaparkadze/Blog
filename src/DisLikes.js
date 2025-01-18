import React from "react";
import { useState } from "react";
import { BiDislike, BiSolidDislike } from "react-icons/bi";
import api from "./api/posts";

const DisLike = ({ post }) => {
  const [disLike, setDisLike] = useState(false);
  const [count, setCount] = useState(post.disLikes || 0);

  function handleDisLikes(count) {
    api.put("/posts", { ...post, disLikes: count });
  }

  return (
    <div className="likes">
      {!disLike ? (
        <BiDislike
          className="comments"
          onClick={async () => {
            await handleDisLikes(count + 1);
            setDisLike(true);
            setCount(count + 1);
          }}
        />
      ) : (
        <BiSolidDislike
          className="comments"
          style={{ color: "red" }}
          onClick={async () => {
            await handleDisLikes(count - 1);
            setDisLike(false);
            setCount(count - 1);
          }}
        />
      )}
      <h6>{count}</h6>
    </div>
  );
};

export default DisLike;
