import React from "react";
import Feed from "./Feed";

const Home = ({ posts, isLoading }) => {
  return (
    <div className="Home">
      {isLoading ? (
        <p style={{ marginTop: "2rem" }}> Is Loading....</p>
      ) : !posts.length && !isLoading ? (
        <p style={{ marginTop: "2rem" }}> Posts list is empty</p>
      ) : (
        posts.map((post) => <Feed key={post.id} post={post} />)
      )}
    </div>
  );
};
export default Home;
