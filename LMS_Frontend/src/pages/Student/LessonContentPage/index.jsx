import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLessonContent } from "../../../services/lessonService";
import styles from "./LessonContentPage.module.css";

function LessonContentPage() {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    async function fetchLesson() {
      try {
        const data = await getLessonContent(lessonId);
        console.log("Lesson data:", data);
        setLesson(data);
      } catch (err) {
        console.error("Error fetching lesson:", err);
      }
    }
    fetchLesson();
  }, [lessonId]);

  if (!lesson) return <p>Loading...</p>;

  const handleSelect = (questionId, selectedOption) => {
    setAnswers((prev) => ({ ...prev, [questionId]: selectedOption }));
  };

  const handleSubmit = () => {
    let correct = 0;
    lesson.questions.forEach((q) => {
      if (answers[q.id] === q.correct_answer) correct++;
    });
    setScore(correct);
  };

  return (
    <div className={styles.lessonContainer}>
      <h2 className={styles.lessonTitle}>{lesson.title}</h2>

      {/* عرض الفيديو */}
      {lesson.content_type === "video" && (
        <div className={styles.videoContainer}>
          <video
            className={styles.videoPlayer}
            controls
            src={lesson.content_url}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {/* عرض نص فقط */}
      {lesson.content_type === "text" && (
        <div className={styles.textContent}>
          <p>{lesson.content_url}</p>
        </div>
      )}

      {/* عرض الكويز (quiz) */}
      {/* عرض الكويز (quiz) */}
      {lesson.content_type === "quiz" &&
      lesson.questions &&
      lesson.questions.length > 0 ? (
        <>
          {lesson.questions.map((q) => (
            <div key={q.id} className={styles.questionBox}>
              <h4>{q.question}</h4>
              <div className={styles.optionsGroup}>
                {q.options.map((opt, index) => (
                  <label key={index} className={styles.option}>
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={opt}
                      checked={answers[q.id] === opt}
                      onChange={() => handleSelect(q.id, opt)}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          ))}

          <button
            onClick={handleSubmit}
            className={styles.submitButton}
            disabled={Object.keys(answers).length !== lesson.questions.length}
          >
            Submit Quiz
          </button>

          {score !== null && (
            <p className={styles.result}>
              Your score: {score} / {lesson.questions.length}
            </p>
          )}
        </>
      ) : (
        <p className={styles.noQuizMessage}>No quiz questions available.</p>
      )}
    </div>
  );
}

export default LessonContentPage;
