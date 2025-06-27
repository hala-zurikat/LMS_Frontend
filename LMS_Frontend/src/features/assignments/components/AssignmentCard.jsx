import React from "react";
import { useNavigate } from "react-router-dom";

export default function AssignmentCard({ assignment }) {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/student/assignments/submit/${assignment.id}`);
  };

  const isSubmitted = !!assignment.submission_id;
  const backgroundColor = isSubmitted ? "#e7fbe7" : "#fde7e7"; // أخضر / أحمر هادئ

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: 12,
        marginBottom: 10,
        borderRadius: 6,
        backgroundColor: backgroundColor,
      }}
    >
      <h3>{assignment.title}</h3>
      <p>{assignment.description}</p>

      <p>
        <strong>Course:</strong> {assignment.course_title} <br />
        <strong>Module:</strong> {assignment.module_title} <br />
        <strong>Lesson:</strong> {assignment.lesson_title}
      </p>

      <p>
        <strong>Deadline:</strong>{" "}
        {assignment.deadline
          ? new Date(assignment.deadline).toLocaleString()
          : "No deadline"}
      </p>

      <p>
        <strong>Max Score:</strong> {assignment.max_score || 100}
      </p>

      {isSubmitted ? (
        <p>
          ✅ <strong>Submitted on:</strong>{" "}
          {new Date(assignment.submitted_at).toLocaleString()}
          <br />
          <strong>Grade:</strong>{" "}
          {assignment.grade !== null ? assignment.grade : "Pending"}
        </p>
      ) : (
        <p>
          ❌ <strong>Not submitted</strong>
        </p>
      )}

      <button
        onClick={handleSubmit}
        style={{
          marginTop: 10,
          padding: "8px 14px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        Submit Solution
      </button>
    </div>
  );
}
