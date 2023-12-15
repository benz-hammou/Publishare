import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./components/UserContext";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";

const App = () => {
  return (
    <main className="mb-32 p-2.5 m-auto mt-16 md:max-w-4xl lg:max-w-5xl xl:max-w-7xl">
      <BrowserRouter>
        <UserContextProvider>
          <Header />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/edit/:id" element={<EditPost />} />
          </Routes>
        </UserContextProvider>
      </BrowserRouter>
    </main>
  );
};

export default App;
