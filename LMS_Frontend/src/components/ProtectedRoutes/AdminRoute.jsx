// src/components/ProtectedRoutes/AdminRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

export default function AdminRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user || user.role !== "admin") {
    // إذا المستخدم مش موجود أو مش admin نعيد توجيه لصفحة تسجيل الدخول
    return <Navigate to="/login" replace />;
  }

  // إذا كل شيء تمام نعرض المحتوى (dashboard مثلاً)
  return children;
}
