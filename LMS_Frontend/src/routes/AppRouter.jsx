import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/Auth/LoginPage";
import Dashboard from "../pages/Student/Dashboard";
import SignupPage from "../pages/Auth/SignupPage";
import Home from "../pages/Home/Home";
import Navbar from "../features/auth/components/Navbar/Navbar";

function AppRouter() {
  return (
    <>
      <Navbar /> {/* ✅ خارج الـ Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/student/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </>
  );
}

export default AppRouter;
