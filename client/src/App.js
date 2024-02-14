import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./components/UserContext";
import { API_BASE_URL } from "./constants";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";
import SelectCategory from "./components/SelectCategory";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getPosts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/post`);
      const data = await res.json();
      return setPosts(data);
    } catch (error) {
      console.log(
        "Fetche error: The post could not be displayed, please try again.",
        error
      );
    } finally {
      return setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getPosts();
  }, []);

  return (
    <main className="mb-32 p-2.5 m-auto mt-16 md:max-w-4xl lg:max-w-5xl xl:max-w-7xl">
      <BrowserRouter>
        <UserContextProvider>
          <Header />
          <Routes>
            <Route path="/" exact element={<Home posts={posts} isLoading={isLoading} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/create"
              element={<CreatePost getPosts={getPosts} />}
            />
            <Route
              path="/post/:id"
              element={<PostPage getPosts={getPosts} />}
            />
            <Route
              path="/edit/:id"
              element={<EditPost getPosts={getPosts} />}
            />
            <Route path="category">
              <Route path=":id" element={<SelectCategory posts={posts} />} />
            </Route>
          </Routes>
        </UserContextProvider>
      </BrowserRouter>
    </main>
  );
};

export default App;
