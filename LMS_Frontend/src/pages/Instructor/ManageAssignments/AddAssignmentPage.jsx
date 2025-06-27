import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import assignmentService from "../../services/assignmentService"; // الخدمة الخاصة بالواجبات
import courseService from "../../services/courseService"; // لجلب بيانات الكورس والوحدات والدروس
import styles from "./AddAssignmentPage.module.css";

function AddAssignmentPage() {
  const { courseId } = useParams(); // لو استعملتي راوت مرتبط بالكورس
  const navigate = useNavigate();

  // الحالة
  const [modules, setModules] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [formData, setFormData] = useState({
    moduleId: "",
    lessonId: "",
    title: "",
    description: "",
    deadline: "",
    maxScore: 100,
  });

  const [loadingModules, setLoadingModules] = useState(true);
  const [loadingLessons, setLoadingLessons] = useState(false);
  const [error, setError] = useState("");

  // جلب Modules عند تحميل الصفحة
  useEffect(() => {
    async function fetchModules() {
      try {
        setLoadingModules(true);
        const data = await courseService.getModulesByCourseId(courseId);
        setModules(data);
      } catch (err) {
        setError("Failed to load modules");
      } finally {
        setLoadingModules(false);
      }
    }
    if (courseId) fetchModules();
  }, [courseId]);

  // جلب Lessons عند اختيار Module
  useEffect(() => {
    async function fetchLessons() {
      if (!formData.moduleId) {
        setLessons([]);
        setFormData((prev) => ({ ...prev, lessonId: "" }));
        return;
      }
      try {
        setLoadingLessons(true);
        const data = await courseService.getLessonsByModuleId(
          formData.moduleId
        );
        setLessons(data);
      } catch (err) {
        setError("Failed to load lessons");
      } finally {
        setLoadingLessons(false);
      }
    }
    fetchLessons();
  }, [formData.moduleId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.moduleId || !formData.lessonId || !formData.title) {
      setError("Please fill all required fields");
      return;
    }

    try {
      await assignmentService.createAssignment({
        lesson_id: formData.lessonId,
        title: formData.title,
        description: formData.description,
        deadline: formData.deadline || null,
        max_score: Number(formData.maxScore) || 100,
      });
      alert("Assignment created successfully!");
      navigate(
        `/instructor/courses/${courseId}/modules/${formData.moduleId}/lessons/${formData.lessonId}`
      );
    } catch (err) {
      setError("Failed to create assignment. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Add New Assignment</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Select Module*:
          {loadingModules ? (
            <p>Loading modules...</p>
          ) : (
            <select
              name="moduleId"
              value={formData.moduleId}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Module --</option>
              {modules.map((mod) => (
                <option key={mod.id} value={mod.id}>
                  {mod.title}
                </option>
              ))}
            </select>
          )}
        </label>

        <label>
          Select Lesson*:
          {loadingLessons ? (
            <p>Loading lessons...</p>
          ) : (
            <select
              name="lessonId"
              value={formData.lessonId}
              onChange={handleChange}
              required
              disabled={!formData.moduleId}
            >
              <option value="">-- Select Lesson --</option>
              {lessons.map((les) => (
                <option key={les.id} value={les.id}>
                  {les.title}
                </option>
              ))}
            </select>
          )}
        </label>

        <label>
          Assignment Title*:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter assignment title"
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Optional description"
          />
        </label>

        <label>
          Deadline:
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
          />
        </label>

        <label>
          Max Score:
          <input
            type="number"
            name="maxScore"
            min={0}
            value={formData.maxScore}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Add Assignment</button>
      </form>
    </div>
  );
}

export default AddAssignmentPage;
