import React, { useState, useEffect } from "react";
import {
  getCategories,
  createCourse,
} from "../../../services/instructorService";
import { useNavigate } from "react-router-dom";
import styles from "./AddCoursePage.module.css";

export default function AddCoursePage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    category_id: "",
    thumbnail_url: "",
  });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCategories() {
      const data = await getCategories();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await createCourse(form);
    if (success) {
      navigate("/instructor/courses");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Add New Course</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="title"
          placeholder="Course Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Course Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />

        <input
          type="text"
          name="thumbnail_url"
          placeholder="Thumbnail URL"
          value={form.thumbnail_url}
          onChange={handleChange}
        />

        <select
          name="category_id"
          value={form.category_id}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <button type="submit">Create Course</button>
      </form>
    </div>
  );
}
