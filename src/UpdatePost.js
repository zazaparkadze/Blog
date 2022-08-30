import React from 'react';

const updatePost = ({
    postTitle,
    setPostTitle,
    postBody,
    setPostBody,
    handleUpdate,
}) => {
    return (
        <main className='NewPost'>
            <form className='newPostForm' onSubmit={handleUpdate}>
                <label htmlFor='postTitle'>Post Title</label>
                <input
                    id='PostTitle'
                    type='text'
                    required
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                ></input>
                <label htmlFor='postBody'>Post</label>
                <textarea
                    id='postBody'
                    required
                    value={postBody}
                    onChange={(e) => setPostBody(e.target.value)}
                ></textarea>
                <button type='submit' style={{ backgroundColor: 'lightgreen' }}>
                    Update Post
                </button>
            </form>
        </main>
    );
};

export default updatePost;
