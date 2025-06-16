import React, { useState, useEffect } from "react";
import { useCourses } from "../../hooks/useCourses";
import CourseCard from "../courses/components/CourseCard";
import { enrollInCourse } from "../../services/courseService";
import { getCategories } from "../../services/categoryService";
import styles from "./CoursesPage.module.css";

function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const { courses, loading, error } = useCourses(searchTerm, selectedCategory);

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data))
      .catch((err) => console.error("Failed to fetch categories:", err));
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      await enrollInCourse(courseId);
      alert("✅ تم التسجيل بالكورس بنجاح!");
      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
      alert("⚠️ حدث خطأ أثناء التسجيل. قد تكون مسجل مسبقًا.");
    }
  };

  return (
    <div className={styles.coursesPage}>
      <h1>All Courses</h1>

      <form onSubmit={(e) => e.preventDefault()} className={styles.filterForm}>
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className={styles.selectInput}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className={styles.messageError}>{error}</p>}

      {!loading && !error && (
        <div className={styles.coursesGrid}>
          {courses.length === 0 ? (
            <p>No courses found.</p>
          ) : (
            courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onEnroll={handleEnroll}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default CoursesPage;
