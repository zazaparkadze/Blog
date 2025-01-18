import React, { useState } from "react";
import NewPost from "./NewPost";
import { useNavigate } from "react-router-dom";
import api from "./api/posts";

const CommentPage = ({ post, posts, setPosts }) => {
  const [commentTitle, setCommentTitle] = useState("");
  const [commentBody, setCommentBody] = useState("");
  const navigate = useNavigate();

  const filteredPosts = posts.filter(posts => posts.id !== post.id);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    //console.log(commentTitle, commentBody);

    const newComment = {
      title: commentTitle,
      dateTime: new Date().toString().substring(4, 24),
      postBody: commentBody,
    };
    const response = await api.patch("/posts", { ...newComment, id: post.id });
    console.log(response.data);
    // response.data.comments equals to [...post.comments, newComment]
    const updatedPost = { ...post, comments: [...post.comments, newComment] };
    setPosts([...filteredPosts, updatedPost]);
    setCommentTitle("");
    setCommentBody("");
    navigate("/");
  };
  return (
    <div className="newPostForm">
      <p> {`Comment to post ${post.id}`}</p>
      <NewPost
        title="Comment Title"
        postType="Comment"
        postTitle={commentTitle}
        setPostTitle={setCommentTitle}
        postBody={commentBody}
        setPostBody={setCommentBody}
        handleSubmit={handleSubmitComment}
      />
    </div>
  );
};

export default CommentPage;

/* 
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    };
    const response = await fetch(API_URI, fetchOptions);
    const data = await response.json();
    setPosts([...posts, data]);
    console.log(data);
     */
