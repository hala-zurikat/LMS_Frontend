import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./AddQuizPage.module.css";
import api from "../../../services/api";

export default function AddQuizPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [maxScore, setMaxScore] = useState(10);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !question.trim() ||
      options.some((opt) => !opt.trim()) ||
      !correctAnswer.trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (!options.includes(correctAnswer)) {
      setError("Correct answer must match one of the options.");
      return;
    }

    try {
      setLoading(true);
      await api.post("/quizzes", {
        lesson_id: parseInt(lessonId),
        question,
        options,
        correct_answer: correctAnswer,
        max_score: parseInt(maxScore),
      });
      navigate(`/lessons/${lessonId}`);
    } catch (err) {
      console.error(err);
      setError("Failed to create quiz.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Add Quiz to Lesson {lessonId}</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Question:
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </label>

        {options.map((opt, index) => (
          <label key={index}>
            Option {index + 1}:
            <input
              type="text"
              value={opt}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              required
            />
          </label>
        ))}

        <label>
          Correct Answer:
          <input
            type="text"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            required
          />
        </label>

        <label>
          Max Score:
          <input
            type="number"
            value={maxScore}
            onChange={(e) => setMaxScore(e.target.value)}
            min="1"
          />
        </label>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.actions}>
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Quiz"}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className={styles.cancelBtn}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
