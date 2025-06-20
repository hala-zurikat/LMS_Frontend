import React, { useEffect, useState } from "react";
import { getAllCourses } from "../../../services/courseService";
import CourseCard from "./CourseCard";
import styles from "./FeaturedCourses.module.css";

function getRandomCourses(courses, count) {
  const shuffled = [...courses].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default function FeaturedCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const data = await getAllCourses();
        const publishedCourses = data.filter((c) => c.is_published);
        const randomCourses = getRandomCourses(publishedCourses, 8);
        setCourses(randomCourses);
      } catch (error) {
        console.error("Failed to fetch courses", error);
      }
    }

    fetchCourses();
  }, []);

  const handleEnroll = (courseId) => {
    console.log("Enroll clicked for course", courseId);
  };

  return (
    <div className={styles.section}>
      <h2 className={styles.heading}>Featured Courses</h2>

      <div className={styles.grid}>
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} onEnroll={handleEnroll} />
        ))}
      </div>
    </div>
  );
}
