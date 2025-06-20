import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/Auth/LoginPage";
import SignupPage from "../pages/Auth/SignupPage";
import Dashboard from "../pages/Student/DashboardPage";
import Home from "../pages/Home/Home";
import CoursesPage from "../features/courses/CoursesPage";
import CourseDetailsPage from "../pages/Student/CourseDetailsPage";
import CourseContentPage from "../pages/Student/CourseContentPage/CourseContentPage.jsx";
import MainLayout from "../components/layout/MainLayout";
import AdminDashboard from "../pages/Admin/DashboardPage/index";
import InstructorDashboard from "../pages/Instructor/InstructorDashboardPage";
import ContactPage from "../pages/Home/ContactMe/index";
import RoleProtectedRoute from "../components/ProtectedRoutes/RoleProtectedRoute.jsx";
import Unauthorized from "../pages/Error/Unauthorized.jsx";
import ManageUsersPage from "../pages/Admin/ManageUsersPage/ManageUsers.jsx";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route path="/unauthorized" element={<Unauthorized />} />
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
        path="/admin/users"
        element={
          <RoleProtectedRoute allowedRoles={["admin"]}>
            <ManageUsersPage />
          </RoleProtectedRoute>
        }
      />

      <Route
        path="/contact"
        element={
          <MainLayout>
            <ContactPage />
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
      {/*   إضافة راوت صفحة محتوى الكورس */}
      <Route
        path="/student/courses/:courseId/content"
        element={
          <MainLayout>
            <CourseContentPage />
          </MainLayout>
        }
      />

      <Route
        path="/student/dashboard"
        element={
          <RoleProtectedRoute allowedRoles={["student"]}>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </RoleProtectedRoute>
        }
      />

      <Route
        path="/admin/dashboard"
        element={
          <RoleProtectedRoute allowedRoles={["admin"]}>
            <MainLayout>
              <AdminDashboard />
            </MainLayout>
          </RoleProtectedRoute>
        }
      />

      <Route
        path="/instructor/dashboard"
        element={
          <RoleProtectedRoute allowedRoles={["instructor"]}>
            <MainLayout>
              <InstructorDashboard />
            </MainLayout>
          </RoleProtectedRoute>
        }
      />
    </Routes>
  );
}
