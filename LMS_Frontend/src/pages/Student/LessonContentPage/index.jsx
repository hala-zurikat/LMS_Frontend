import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getLessonContent,
  getQuizzesByLessonId,
} from "../../../services/lessonService";
import styles from "./LessonContentPage.module.css";

function LessonContentPage() {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getLessonContent(lessonId);
        setLesson(data);

        if (data.content_type === "quiz") {
          const quizData = await getQuizzesByLessonId(lessonId);
          setQuizzes(quizData);
        } else {
          setQuizzes([]);
          setAnswers({});
          setScore(null);
        }
      } catch (err) {
        console.error("Error fetching lesson or quizzes:", err);
      }
    }
    fetchData();
  }, [lessonId]);

  if (!lesson) return <p>Loading...</p>;

  const handleSelect = (questionId, selectedOption) => {
    setAnswers((prev) => ({ ...prev, [questionId]: selectedOption }));
  };

  const handleSubmit = () => {
    let correctCount = 0;

    quizzes.forEach((q) => {
      if (answers[q.id] === q.correct_answer) correctCount++;
    });

    setScore(correctCount);
  };

  return (
    <div className={styles.lessonContainer}>
      <h2 className={styles.lessonTitle}>{lesson.title}</h2>

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

      {lesson.content_type === "text" && (
        <div className={styles.textContent}>
          <p>{lesson.content_url}</p>
        </div>
      )}

      {lesson.content_type === "quiz" ? (
        quizzes.length > 0 ? (
          <>
            {quizzes.map((q, idx) => (
              <div key={q.id} className={styles.questionBox}>
                <h4>
                  Question {idx + 1}: {q.question}
                </h4>
                <div className={styles.optionsGroup}>
                  {q.options.map((opt, i) => (
                    <label key={i} className={styles.option}>
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
              disabled={Object.keys(answers).length !== quizzes.length}
            >
              Submit Quiz
            </button>

            {score !== null && (
              <p className={styles.result}>
                Your score: {score} / {quizzes.length}
              </p>
            )}
          </>
        ) : (
          <p className={styles.noQuizMessage}>No quiz questions available.</p>
        )
      ) : null}
    </div>
  );
}

export default LessonContentPage;
