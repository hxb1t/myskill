import { Route, Routes } from "react-router-dom";
import "./assets/app.css";
import Layout from "./components/Layout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import CreateArticle from "./pages/CreateArticle.jsx";
import DetailArticle from "./pages/DetailArticle.jsx";
import DetailVideo from "./pages/DetailVideo.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import Register from "./pages/Register.jsx";
import UploadVideo from "./pages/UploadVideo.jsx";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<Layout />}>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/article/:contentId" element={<DetailArticle />} />
          <Route path="/video/:contentId" element={<DetailVideo />} />
          <Route path="/article/create" element={<CreateArticle />} />
          <Route path="/video/upload" element={<UploadVideo />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
