import React, { useEffect } from "react";
import { Layout } from "./components/Layout";
import {Routes, Route} from 'react-router-dom'
import { MainPage } from "./pages/MainPage";
import { PostsPage } from "./pages/PostsPage";
import { AddPostPage } from "./pages/AddPostPage";
import { LoginPage } from "./pages/LoginPage";
import { RegPage } from "./pages/RegPage";
import { EditPostPage } from "./pages/EditPostPage";
import { ToastContainer } from 'react-toastify'
import { PostPage } from "./pages/PostPage";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { getMe } from "./redux/features/auth/authSlice";


function App() {
  const dispatch = useDispatch()
  useEffect(()=>{dispatch(getMe())}, [dispatch])
  return (
    <Layout>
      <Routes>
        <Route path ="/" element={<MainPage />} />
        <Route path ="posts" element={<PostsPage />} />
        <Route path ="post/:id" element={<PostPage />} />
        <Route path ="new" element={<AddPostPage />} />
        <Route path ="login" element={<LoginPage />} />
        <Route path ="register" element={<RegPage />} />
        <Route path ="edit" element={<EditPostPage />} />
      </Routes>

      <ToastContainer position="bottom-right"/>
    </Layout>
  );
}

export default App;
