import React from 'react';
import { useParams, Link } from 'react-router-dom';

const PostPage = ({ posts, handleDelete, setPostID }) => {
    const { id } = useParams();
    const post = posts.find((post) => post.id.toString() === id);
    setPostID(id);

    return (
        <main className='PostPage'>
            <article className='post'>
                {post && (
                    <>
                        <h1> {post.title}</h1>
                        <p className='postDate'> {post.datetime}</p>
                        <p className='postBody'>{post.body}</p>
                        <button onClick={() => handleDelete(post.id)}>
                            Delete Post
                        </button>
                        <Link to='/update'>
                            <button
                                type='link'
                                style={{ backgroundColor: 'green' }}
                            >
                                Update Post
                            </button>
                        </Link>
                    </>
                )}
                {!post && (
                    <>
                        <p>Sorry, the post was not found</p>
                        <Link to='/'>
                            {' '}
                            <p>Please visit out Home Page</p>
                        </Link>
                    </>
                )}
            </article>
        </main>
    );
};

export default PostPage;
