import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/Auth/LoginPage";
import SignupPage from "../pages/Auth/SignupPage";
import Dashboard from "../pages/Student/DashboardPage";
import Home from "../pages/Home/Home";
import CoursesPage from "../features/courses/CoursesPage";
import CourseDetailsPage from "../pages/Student/CourseDetailsPage";
import MainLayout from "../components/layout/MainLayout";
import AdminRoute from "../components/ProtectedRoutes/AdminRoute";
import AdminDashboard from "../pages/Admin/DashboardPage/index";

// أضف حماية للإنستركتور مثل AdminRoute
import InstructorRoute from "../components/ProtectedRoutes/InstructorRoute";
import InstructorDashboard from "../pages/Instructor/InstructorDashboardPage";

export default function AppRouter() {
  return (
    <Routes>
      {/* صفحات بدون layout */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* صفحات داخل layout */}
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
      <Route
        path="/student/courses/:courseId"
        element={
          <MainLayout>
            <CourseDetailsPage />
          </MainLayout>
        }
      />

      {/* صفحة الـ Admin محمية */}
      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <MainLayout>
              <AdminDashboard />
            </MainLayout>
          </AdminRoute>
        }
      />

      {/* صفحة الـ Instructor محمية */}
      <Route
        path="/instructor/dashboard"
        element={
          <InstructorRoute>
            <MainLayout>
              <InstructorDashboard />
            </MainLayout>
          </InstructorRoute>
        }
      />
    </Routes>
  );
}
