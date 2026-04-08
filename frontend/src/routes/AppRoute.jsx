import { Routes, Route } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
// import Home from "../features/auth/pages/Home";
import HomeInterview from "../features/interview/pages/HomeInterview";
import ProtectedRoute from "./ProtectedRoute";
import About from "../features/auth/pages/About";
import Contact from "../features/auth/pages/Contact";
import MainLayout from "../layouts/MainLayout"; 

const AppRoute = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
       <Route path="/" element={<HomeInterview />} />
       <Route path="/about" element={<About />} />
       <Route path="/contact" element={<Contact />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRoute;
