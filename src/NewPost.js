import React from 'react';

const NewPost = ({title, postType, postTitle, setPostTitle, postBody, setPostBody, handleSubmit}) => {
  return (
  
    <form className='newPostForm' onSubmit={handleSubmit}>
      <label className='newPost' htmlFor='title'>{title }</label>
      <input
        type='text'
        id='title'
        required
        value={postTitle}
        onChange={(e) => setPostTitle(e.target.value)}
      >
      </input>
      <label htmlFor="postBody">{ postType }</label>
      <textarea
        name="postBody"
        id="postBody"
        required
        value={postBody}
        onChange={(e) => setPostBody(e.target.value)}
      ></textarea>
      <button
          type='submit'
      >
        Submit
      </button>
      </form>
   
  );
}

export default NewPost;
