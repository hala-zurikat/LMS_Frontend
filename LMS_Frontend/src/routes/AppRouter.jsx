import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/Auth/LoginPage";
import SignupPage from "../pages/Auth/SignupPage";
import Dashboard from "../pages/Student/DashboardPage";
import Home from "../pages/Home/Home";
import CoursesPage from "../features/courses/CoursesPage";
import MainLayout from "../components/layout/MainLayout";

export default function AppRouter() {
  return (
    <Routes>
      {/* صفحات بدون layout */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* صفحات داخل layout (navbar + footer) */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
      <Route
        path="/courses"
        element={
          <MainLayout>
            <CoursesPage />
          </MainLayout>
        }
      />
      <Route
        path="/student/dashboard"
        element={
          <MainLayout>
            <Dashboard />
          </MainLayout>
        }
      />
    </Routes>
  );
}
