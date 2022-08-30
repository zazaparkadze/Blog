import React from 'react';
import Post from './Post';
const Feed = ({ posts, setPostTitle, setPostBody, postID }) => {
    return (
        <>
            {posts.map((post) => (
                <Post
                    key={post.id}
                    post={post}
                    setPostTitle={setPostTitle}
                    setPostBody={setPostBody}
                    postID={postID}
                />
            ))}
        </>
    );
};

export default Feed;
