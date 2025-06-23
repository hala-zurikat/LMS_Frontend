import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createLesson } from "../../../services/lessonService";
import styles from "./ManageLessons.module.css";

export default function AddLesson() {
  const { moduleId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content_type: "video", // default
    content_url: "",
    duration: 0,
    order: 1,
    is_free: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await createLesson({ ...formData, module_id: Number(moduleId) });
      navigate(`/instructor/modules/${moduleId}/lessons`);
    } catch (err) {
      setError(err.message || "Failed to add lesson");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Add New Lesson to Module {moduleId}</h2>
      {error && <p className={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Content Type:
          <select
            name="content_type"
            value={formData.content_type}
            onChange={handleChange}
          >
            <option value="video">Video</option>
            <option value="quiz">Quiz</option>
            <option value="text">Text</option>
          </select>
        </label>

        <label>
          Content URL:
          <input
            type="url"
            name="content_url"
            value={formData.content_url}
            onChange={handleChange}
            placeholder="Optional"
          />
        </label>

        <label>
          Duration (minutes):
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            min="0"
          />
        </label>

        <label>
          Order:
          <input
            type="number"
            name="order"
            value={formData.order}
            onChange={handleChange}
            min="1"
            required
          />
        </label>

        <label>
          Free Lesson:
          <input
            type="checkbox"
            name="is_free"
            checked={formData.is_free}
            onChange={handleChange}
          />
        </label>

        <div className={styles.formActions}>
          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Lesson"}
          </button>
          <button
            type="button"
            onClick={() => navigate(`/instructor/modules/${moduleId}/lessons`)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
