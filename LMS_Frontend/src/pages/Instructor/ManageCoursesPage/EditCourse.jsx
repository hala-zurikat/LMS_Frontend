import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getCourseById,
  updateCourse,
} from "../../../services/instructorService";
import styles from "./EditCourse.module.css";

export default function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    async function fetchCourse() {
      const data = await getCourseById(id);
      if (data) setCourse({ title: data.title, description: data.description });
    }
    fetchCourse();
  }, [id]);

  function handleChange(e) {
    setCourse({ ...course, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const updated = await updateCourse(id, course);
    if (updated) {
      alert("✅ Course updated successfully");
      navigate("/instructor/courses");
    } else {
      alert("❌ Failed to update course");
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Edit Course</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          value={course.title}
          onChange={handleChange}
          required
          className={styles.input}
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={course.description}
          onChange={handleChange}
          required
          className={styles.textarea}
        />

        <button type="submit" className={styles.submitButton}>
          Save
        </button>
      </form>
    </div>
  );
}
