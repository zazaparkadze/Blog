import React from "react";

const UpdatePost = ({
  updatePostTitle,
  setUpdatePostTitle,
  updatePostBody,
  setUpdatePostBody,
  handleUpdate,
  _id
}) => {
    return (
    <main className="PostPage"> 
      <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="title">New Title</label>
        <input
          type="text"
          id="title"
          value={updatePostTitle}
          onChange={(e) => setUpdatePostTitle(e.target.value)}
        />
        <label htmlFor="NewPost"> New Post</label>
        <textarea
          name="updatePost"
          id="updatePost"
          value={updatePostBody}
          onChange={(e) => setUpdatePostBody(e.target.value)}
        ></textarea>
        <button type="submit" style={{ background: "green" }} onClick={() => handleUpdate(_id)}>
          Submit
        </button>
      </form>
    </main>
  );
};

export default UpdatePost;