import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getLessonsByModule,
  deleteLesson,
} from "../../../services/lessonService";
import styles from "./ManageLessons.module.css";

export default function ManageLessons() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLessons() {
      try {
        setLoading(true);
        const data = await getLessonsByModule(moduleId);
        setLessons(data);
      } catch (error) {
        alert("Failed to load lessons");
      } finally {
        setLoading(false);
      }
    }
    fetchLessons();
  }, [moduleId]);

  const handleDelete = async (lessonId) => {
    if (!window.confirm("Are you sure you want to delete this lesson?")) return;
    try {
      await deleteLesson(lessonId);
      setLessons((prev) => prev.filter((l) => l.id !== lessonId));
    } catch {
      alert("Failed to delete lesson");
    }
  };

  const handleEdit = (lessonId) => {
    navigate(`/instructor/modules/${moduleId}/lessons/edit/${lessonId}`);
  };

  const handleAdd = () => {
    navigate(`/instructor/modules/${moduleId}/lessons/add`);
  };

  return (
    <div className={styles.container}>
      <h2>Manage Lessons for Module {moduleId}</h2>
      <button onClick={handleAdd} className={styles.addBtn}>
        + Add New Lesson
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : lessons.length === 0 ? (
        <p>No lessons found.</p>
      ) : (
        <ul className={styles.lessonList}>
          {lessons.map((lesson) => (
            <li key={lesson.id} className={styles.lessonItem}>
              <h3>{lesson.title}</h3>
              <p>Type: {lesson.content_type}</p>
              <div className={styles.actions}>
                <button onClick={() => handleEdit(lesson.id)}>Edit</button>
                <button
                  onClick={() => handleDelete(lesson.id)}
                  className={styles.deleteBtn}
                >
                  Delete
                </button>

                {lesson.content_type === "quiz" && (
                  <button
                    onClick={() =>
                      navigate(`/instructor/lessons/${lesson.id}/quizzes/add`)
                    }
                    className={styles.addQuizBtn}
                  >
                    Add Quiz
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
