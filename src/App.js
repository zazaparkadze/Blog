import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import UpdatePost from './UpdatePost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

function App() {
    const API_URI = 'http://localhost:3500/posts';
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(API_URI);
                const listPosts = await response.json();
                //  console.log(listPosts);
                setPosts(listPosts);
            } catch (err) {
                console.log(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        (async () => await fetchPosts())();
    }, []);

    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [postID, setPostID] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const newPost = { id, title: postTitle, datetime, body: postBody };
        const allPosts = [...posts, newPost];
        setPosts(allPosts);
        setPostTitle('');
        setPostBody('');
        navigate(-1);
        // write post in mongoDB collection
        const response = await fetch(API_URI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                title: postTitle,
                datetime: datetime,
                body: postBody,
            }),
        });
        const result = await response.json();
        console.log(result);
    };

    const handleDelete = async (id) => {
        const filteredArray = posts.filter((post) => post.id !== id);
        setPosts(filteredArray);
        navigate(-1);
        // delete post in mongoDB collection
        const response = await fetch(API_URI, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id }),
        });
        const result = await response.json();
        console.log(result);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        console.log(`updayting post ... `);
        const foundPost = posts.find((post) => post.id === Number(postID));
        const filteredPosts = posts.filter(
            (post) => post.id !== Number(postID)
        );
        //
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        foundPost.datetime = datetime;
        foundPost.title = postTitle;
        foundPost.body = postBody;
        const listPosts = [...filteredPosts, foundPost].sort(
            (a, b) => a.id - b.id
        );
        setPosts(listPosts);
        setPostTitle('');
        setPostBody('');
        setPostID(0);
        navigate(-2);

        const result = await (
            await fetch(API_URI, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json ',
                },
                body: JSON.stringify(foundPost),
            })
        ).json();
        console.log(result);
    };

    useEffect(() => {
        const postList = posts.filter(
            (post) =>
                post.body.toLowerCase().includes(search.toLowerCase()) ||
                post.title.toLowerCase().includes(search.toLowerCase())
        );
        setSearchResults(postList);
    }, [search, posts]);

    return (
        <div className='App'>
            <Header title='React JS Blog' />
            <Nav search={search} setSearch={setSearch} />
            <Routes>
                <Route
                    path='/'
                    element={
                        <Home
                            posts={searchResults}
                            isLoading={isLoading}
                            setPostTitle={setPostTitle}
                            setPostBody={setPostBody}
                            postID={postID}
                        />
                    }
                />
                <Route
                    path='/post'
                    element={
                        <NewPost
                            postTitle={postTitle}
                            setPostTitle={setPostTitle}
                            postBody={postBody}
                            setPostBody={setPostBody}
                            handleSubmit={handleSubmit}
                        />
                    }
                />
                <Route
                    path='/update'
                    element={
                        <UpdatePost
                            postTitle={postTitle}
                            setPostTitle={setPostTitle}
                            postBody={postBody}
                            setPostBody={setPostBody}
                            handleUpdate={handleUpdate}
                        />
                    }
                />
                <Route
                    path='/post/:id'
                    element={
                        <PostPage
                            posts={posts}
                            handleDelete={handleDelete}
                            setPostID={setPostID}
                        />
                    }
                />
                <Route path='/about' element={<About />} />
                <Route path='*' element={<Missing />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;

/* [
        {
            id: 1,
            title: 'My First Post',
            datetime: 'July 01, 2021 11:17:36 AM',
            body: 'ZazaLorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!',
        },
        {
            id: 2,
            title: 'My 2nd Post',
            datetime: 'July 01, 2021 11:17:36 AM',
            body: 'TusyaLorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!',
        },
        {
            id: 3,
            title: 'My 3rd Post',
            datetime: 'July 01, 2021 11:17:36 AM',
            body: 'MishkaLorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!',
        },
        {
            id: 4,
            title: 'My Fourth Post',
            datetime: 'July 01, 2021 11:17:36 AM',
            body: 'YuvalLorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!',
        },
    ] */
