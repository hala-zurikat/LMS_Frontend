import { useState, useEffect } from "react";
import axios from "axios";

export function useCourses(searchTerm = "", selectedCategory = "") {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // كل ما تغيرت كلمة البحث أو التصنيف نحدث البيانات
    async function fetchCourses() {
      setLoading(true);
      setError(null);

      try {
        const params = {};
        if (searchTerm) params.search = searchTerm;
        if (selectedCategory) params.category_id = selectedCategory;

        const response = await axios.get("/api/courses", { params });
        setCourses(response.data);
      } catch (err) {
        setError("Failed to load courses");
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, [searchTerm, selectedCategory]);

  return { courses, loading, error };
}
