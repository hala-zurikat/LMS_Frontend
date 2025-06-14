import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/Auth/LoginPage";
import Dashboard from "../pages/Dashboard";
import SignupPage from "../pages/Auth/SignupPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default AppRouter;
