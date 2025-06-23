import React, { useEffect, useState } from "react";
import styles from "./ManageQuizzes.module.css";
import {
  getAllQuizzesGrouped,
  deleteQuiz,
} from "../../../services/quizService";

export default function ManageQuizzesPage() {
  const [groupedQuizzes, setGroupedQuizzes] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const data = await getAllQuizzesGrouped();
      setGroupedQuizzes(data);
    } catch (err) {
      console.error("❌ Failed to fetch quizzes:", err.message);
    }
  }

  const handleDelete = async (quizId) => {
    if (!window.confirm("Are you sure you want to delete this quiz?")) return;

    try {
      await deleteQuiz(quizId);
      // بعد الحذف، نعيد تحميل البيانات
      fetchData();
    } catch (err) {
      console.error("❌ Failed to delete quiz:", err.message);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Manage Quizzes</h2>

      {groupedQuizzes.map((course) => (
        <div key={course.course_id} className={styles.courseBlock}>
          <h3>{course.course_title}</h3>

          {course.modules.map((mod) => (
            <div key={mod.module_id} className={styles.moduleBlock}>
              <h4>{mod.module_title}</h4>

              <ul className={styles.quizList}>
                {mod.quizzes.map((quiz) => (
                  <li key={quiz.id} className={styles.quizItem}>
                    <strong>Question:</strong> {quiz.question} <br />
                    <strong>Options:</strong> {quiz.options.join(", ")} <br />
                    <strong>Answer:</strong> {quiz.correct_answer}
                    <br />
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(quiz.id)}
                    >
                      🗑 Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
