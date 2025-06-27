import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createAssignment } from "../../services/assignmentService";

export default function AddAssignmentPage() {
  const { lessonId: lessonIdParam } = useParams();
  const lessonId = Number(lessonIdParam); // ✅ تحويل فوري

  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    deadline: "",
    max_score: 100,
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      lesson_id: lessonId,
      max_score: Number(form.max_score),
    };

    console.log("🚀 Data you're sending:", payload);

    try {
      await createAssignment(payload);
      alert("Assignment created successfully!");
      navigate(-1);
    } catch (error) {
      console.error(
        "❌ Error response:",
        error.response?.data || error.message
      );
      alert("Failed to create assignment.");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 16 }}>
      <h2>Add Assignment</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: 8, padding: 6 }}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 8, padding: 6 }}
        />
        <input
          name="deadline"
          type="datetime-local"
          value={form.deadline}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 8, padding: 6 }}
        />
        <input
          name="max_score"
          type="number"
          value={form.max_score}
          onChange={handleChange}
          min={0}
          max={1000}
          style={{ width: "100%", marginBottom: 8, padding: 6 }}
        />
        <button type="submit" style={{ padding: "8px 12px" }}>
          Create Assignment
        </button>
      </form>
    </div>
  );
}
