import Header from "./Header";
import Nav from "./Nav";
import Home from "./Home";
import Footer from "./Footer";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import UpdatePost from "./UpdatePost";
import About from "./About";
import Missing from "./Missing";
/* import CommentPage from "./CommentPage"; */
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const API_URI = "http://localhost:3500/posts";
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(API_URI);
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [updatePostTitle, setUpdatePostTitle] = useState("");
  const [updatePostBody, setUpdatePostBody] = useState("");
  const [_id, set_id] = useState("0");
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const postsList = posts.filter((post) => post.id !== id);
    setPosts(postsList);
    const fetchOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    };
    await fetch(API_URI, fetchOptions);
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      id: posts.length ? posts[posts.length - 1].id + 1 : 1,
      title: postTitle,
      dateTime: new Date().toString().substring(4, 24),
      postBody: postBody,
    };
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
    setPostTitle("");
    setPostBody("");
    navigate("/");
    //console.log(data);
  };

  const handleUpdate = async (id) => {
    const dateTime = new Date().toDateString();
    const updatedPost = {
      id: id,
      title: updatePostTitle,
      dateTime: dateTime,
      postBody: updatePostBody,
    };
    const response = await fetch(API_URI, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPost),
    });
    const data = await response.json();
    const { _id, __v, ...rest } = data;
   // console.log(rest);
    setPosts(posts.map((post) => (post.id.toString() === id ? rest : post)));
    navigate("/");
  };

  return (
    <div className="App">
      <Header title="Zaza's NodeJS Blog" numberOfPosts={ posts.length} />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              posts={posts.filter(
                (post) =>
                  post.title.toLowerCase().includes(search.toLowerCase()) ||
                  post.postBody.toLowerCase().includes(search.toLowerCase())
              )}
              isLoading={isLoading}
            />
          }
        />
        <Route
          exect
          path="/newPost"
          element={
            <NewPost
              title="Title"
              postType="Post"
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
              handleSubmit={handleSubmit}
            />
          }
        />
        <Route
          exect
          path="/posts/:id"
          element={
            <PostPage
              posts={posts}
              setPosts={setPosts}
              handleDelete={handleDelete}
              setUpdatePostTitle={setUpdatePostTitle}
              setUpdatePostBody={setUpdatePostBody}
              set_id={set_id}
            />
          }
        />
        <Route
          path="/updatePost"
          element={
            <UpdatePost
              updatePostTitle={updatePostTitle}
              setUpdatePostTitle={setUpdatePostTitle}
              updatePostBody={updatePostBody}
              setUpdatePostBody={setUpdatePostBody}
              handleUpdate={handleUpdate}
              _id={_id}
            />
          }
        ></Route>
           <Route exect path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;