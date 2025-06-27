import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/Auth/LoginPage";
import SignupPage from "../pages/Auth/SignupPage";
import Dashboard from "../pages/Student/DashboardPage";
import Home from "../pages/Home/Home";
import CoursesPage from "../features/courses/CoursesPage";
import CourseContentPage from "../pages/Student/CourseContentPage/CourseContentPage.jsx";
import MainLayout from "../components/layout/MainLayout";
import AdminDashboard from "../pages/Admin/DashboardPage/index";
import InstructorDashboard from "../pages/Instructor/InstructorDashboardPage";
import ContactPage from "../pages/Home/ContactMe/index";
import RoleProtectedRoute from "../components/ProtectedRoutes/RoleProtectedRoute.jsx";
import Unauthorized from "../pages/Error/Unauthorized.jsx";
import ManageUsersPage from "../pages/Admin/ManageUsersPage/ManageUsers.jsx";
import ManageCoursesPage from "../pages/Admin/ManageCoursesPage/ManageCoursesPage.jsx";
import LessonContentPage from "../pages/Student/LessonContentPage/index.jsx";
import InstructorManageCoursesPage from "../pages/Instructor/ManageCoursesPage/CourseList.jsx";
import AddCoursePage from "../pages/Instructor/AddCoursePage";
import InstructorCourseEdit from "../pages/Instructor/ManageCoursesPage/EditCourse";
import InstructorCourseView from "../pages/Instructor/ManageCoursesPage/ViewCourse";
import ManageModules from "../pages/Instructor/ManageCoursesPage/ManageModules";
import ManageLessons from "../pages/Instructor/ManageLessons/ManageLessons.jsx";
import AddLesson from "../pages/Instructor/ManageLessons/AddLesson.jsx";
import EditLesson from "../pages/Instructor/ManageLessons/EditLesson.jsx";
import AddQuizPage from "../pages/Instructor/AddQuizPage";
import ManageQuizzesPage from "../pages/Instructor/ManageQuizzes";
import ManageCategoriesPage from "../pages/Admin/ManageCategories/ManageCategories";
import SearchResultsPage from "../pages/Search/SearchResultsPage";
import AddAssignmentPage from "../pages/Assignments/AddAssignmentPage.jsx";
import StudentAssignmentsPage from "../pages/Assignments/StudentAssignmentsPage.jsx";
import InstructorAssignmentsPage from "../pages/Instructor/ManageAssignments/SubmissionAssignment.jsx";
import SubmitAssignmentPage from "../pages/Student/Assignments/SubmitAssignmentPage.jsx";

export default function AppRouter() {
  return (
    <Routes>
      {/* Public Routes */}
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
        path="/search"
        element={
          <MainLayout>
            <SearchResultsPage />
          </MainLayout>
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
        path="/courses"
        element={
          <MainLayout>
            <CoursesPage />
          </MainLayout>
        }
      />
      <Route path="/lessons/:lessonId" element={<LessonContentPage />} />

      {/* Student Routes */}
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
        path="/student/courses/:courseId"
        element={
          <MainLayout>
            <CourseContentPage />
          </MainLayout>
        }
      />
      <Route
        path="/student/assignments"
        element={
          <RoleProtectedRoute allowedRoles={["student"]}>
            <MainLayout>
              <StudentAssignmentsPage />
            </MainLayout>
          </RoleProtectedRoute>
        }
      />
      <Route
        path="/student/assignments/submit/:assignmentId"
        element={
          <RoleProtectedRoute allowedRoles={["student"]}>
            <MainLayout>
              <SubmitAssignmentPage />
            </MainLayout>
          </RoleProtectedRoute>
        }
      />

      {/* Instructor Routes */}
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
      <Route
        path="/instructor/courses"
        element={
          <RoleProtectedRoute allowedRoles={["instructor"]}>
            <MainLayout>
              <InstructorManageCoursesPage />
            </MainLayout>
          </RoleProtectedRoute>
        }
      />
      <Route
        path="/instructor/add-course"
        element={
          <RoleProtectedRoute allowedRoles={["instructor"]}>
            <MainLayout>
              <AddCoursePage />
            </MainLayout>
          </RoleProtectedRoute>
        }
      />
      <Route
        path="/instructor/courses/edit/:id"
        element={
          <MainLayout>
            <InstructorCourseEdit />
          </MainLayout>
        }
      />
      <Route
        path="/instructor/assignments"
        element={
          <RoleProtectedRoute allowedRoles={["instructor"]}>
            <MainLayout>
              <InstructorAssignmentsPage />
            </MainLayout>
          </RoleProtectedRoute>
        }
      />
      <Route
        path="/instructor/courses/view/:id"
        element={
          <MainLayout>
            <InstructorCourseView />
          </MainLayout>
        }
      />
      <Route
        path="/instructor/courses/:courseId/modules"
        element={
          <MainLayout>
            <ManageModules />
          </MainLayout>
        }
      />
      <Route
        path="/instructor/modules/:moduleId/lessons"
        element={
          <MainLayout>
            <ManageLessons />
          </MainLayout>
        }
      />
      <Route
        path="/instructor/modules/:moduleId/lessons/add"
        element={
          <MainLayout>
            <AddLesson />
          </MainLayout>
        }
      />
      <Route
        path="/instructor/modules/:moduleId/lessons/edit/:lessonId"
        element={
          <MainLayout>
            <EditLesson />
          </MainLayout>
        }
      />
      <Route
        path="/instructor/lessons/:lessonId/quizzes/add"
        element={
          <MainLayout>
            <AddQuizPage />
          </MainLayout>
        }
      />
      <Route
        path="/instructor/quizzes"
        element={
          <MainLayout>
            <ManageQuizzesPage />
          </MainLayout>
        }
      />
      <Route
        path="/instructor/lessons/:lessonId/assignments/add"
        element={
          <RoleProtectedRoute allowedRoles={["instructor"]}>
            <MainLayout>
              <AddAssignmentPage />
            </MainLayout>
          </RoleProtectedRoute>
        }
      />

      {/* Admin Routes */}
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
        path="/admin/users"
        element={
          <RoleProtectedRoute allowedRoles={["admin"]}>
            <MainLayout>
              <ManageUsersPage />
            </MainLayout>
          </RoleProtectedRoute>
        }
      />
      <Route
        path="/admin/courses"
        element={
          <RoleProtectedRoute allowedRoles={["admin"]}>
            <MainLayout>
              <ManageCoursesPage />
            </MainLayout>
          </RoleProtectedRoute>
        }
      />
      <Route
        path="/admin/categories"
        element={
          <RoleProtectedRoute allowedRoles={["admin"]}>
            <MainLayout>
              <ManageCategoriesPage />
            </MainLayout>
          </RoleProtectedRoute>
        }
      />
    </Routes>
  );
}
