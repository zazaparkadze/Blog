import Feed from './Feed';

const Home = ({ posts, isLoading, setPostTitle, setPostBody, postID }) => {
    return (
        <main className='Home'>
            {isLoading ? (
                <p style={{ marginTop: '2rem' }}> Is Loading....</p>
            ) : !posts.length && !isLoading ? (
                <p style={{ marginTop: '2rem' }}> Posts list is empty</p>
            ) : (
                <Feed
                    posts={posts}
                    setPostTitle={setPostTitle}
                    setPostBody={setPostBody}
                    postID={postID}
                />
            )}
        </main>
    );
};

export default Home;
