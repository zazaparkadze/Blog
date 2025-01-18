import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { BiComment } from "react-icons/bi";
import CommentPage from "./CommentPage";
import Comments from "./Comments";

const PostPage = ({
  posts,
  setPosts,
  handleDelete,
  setUpdatePostBody,
  setUpdatePostTitle,
  set_id,
}) => {
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);
  const [commentIsClicked, setCommentIsClicked] = useState(false);

  return (
    <article className="PostPage">
      {!commentIsClicked && post && (
        <>
          <h3>{post.title}</h3>
          <h6>{post.dateTime}</h6>
          <br />
          <article>{post.postBody}</article>
          <Link to="/updatePost">
            <button
              style={{ background: "green" }}
              onClick={() => {
                setUpdatePostTitle(post.title);
                setUpdatePostBody(post.postBody);
                set_id(id);
              }}
            >
              Update Post
            </button>
          </Link>
          <button
            onClick={() => {
              handleDelete(post.id);
            }}
          >
            Delete Post
          </button>
          <BiComment
            style={{
              color: "blue",
              fontSize: "2.5rem",
              position: "relative",
              top: "19px",
            }}
            onClick={() => setCommentIsClicked(true)}
          />

          <Comments key={post.id} comments={post.comments} />
        </>
      )}
      {commentIsClicked && post && (
        <CommentPage post={post} posts={posts} setPosts={setPosts} />
      )}
      {!post && (
        <>
          <h2>Post Not Found</h2>
          <p>
            <Link to="/">Visit Our HomePage</Link>
          </p>
        </>
      )}
    </article>
  );
};

export default PostPage;
