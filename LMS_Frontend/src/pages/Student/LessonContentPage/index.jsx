import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getLessonById } from "../../../services/courseService";

function LessonContentPage() {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLesson() {
      try {
        const data = await getLessonById(lessonId);
        setLesson(data);
      } catch (err) {
        console.error("Failed to load lesson:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchLesson();
  }, [lessonId]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (!lesson) return <p style={{ textAlign: "center" }}>Lesson not found</p>;

  return (
    <div style={{ padding: "2rem", display: "flex", justifyContent: "center" }}>
      <div
        style={{
          width: "100%",
          maxWidth: "850px",
          backgroundColor: "#fdfdfd",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Link to={-1} style={{ color: "#1976d2", textDecoration: "none" }}>
          ← Back
        </Link>

        <h2 style={{ color: "#1976d2", marginTop: "1rem" }}>{lesson.title}</h2>
        <p style={{ color: "#555", marginBottom: "1.5rem" }}>
          Content Type: <strong>{lesson.content_type}</strong>
        </p>

        {lesson.content_type === "video" && lesson.content_url && (
          <div style={{ borderRadius: "10px", overflow: "hidden" }}>
            <video
              controls
              src={lesson.content_url}
              style={{
                width: "100%",
                borderRadius: "10px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
              }}
            />
          </div>
        )}

        {lesson.content_type === "text" && (
          <div
            style={{
              background: "#eef5ff",
              padding: "1.5rem",
              borderRadius: "8px",
              fontSize: "1.1rem",
              color: "#333",
              lineHeight: "1.6",
            }}
          >
            <p>{lesson.content_url}</p>
          </div>
        )}

        {lesson.content_type === "quiz" && (
          <div style={{ marginTop: "1rem", color: "#888" }}>
            Quiz will be available soon...
          </div>
        )}
      </div>
    </div>
  );
}

export default LessonContentPage;
