import { useState, useEffect } from "react";
import axios from "axios";

export function useCourses(selectedCategory = "") {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      async function fetchCourses() {
        setLoading(true);
        setError(null);

        try {
          const params = {};
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
    }, 500); // تأخير 500 مللي ثانية

    return () => clearTimeout(delayDebounceFn); // تنظيف الـ timeout لو تغير selectedCategory بسرعة
  }, [selectedCategory]);

  return { courses, loading, error };
}
