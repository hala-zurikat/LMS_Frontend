import React, { useEffect, useState } from "react";
import { getAssignmentsByUserId } from "../../../services/assignmentService";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

export default function AllAssignmentsPage() {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAssignments() {
      if (user?.id) {
        const data = await getAssignmentsByUserId(user.id);
        setAssignments(data);
      }
    }
    fetchAssignments();
  }, [user]);

  const handleSubmitClick = (assignmentId) => {
    navigate(`/assignments/${assignmentId}/submit`);
  };

  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: 16 }}>
      <h2>Your Assignments</h2>
      {assignments.length === 0 ? (
        <p>No assignments found.</p>
      ) : (
        assignments.map((a) => (
          <div
            key={a.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: 6,
              padding: 12,
              marginBottom: 12,
              backgroundColor: "#f9f9f9",
            }}
          >
            <h3>{a.title}</h3>
            <p>{a.description}</p>
            <p>
              <strong>Course:</strong> {a.course_title} <br />
              <strong>Module:</strong> {a.module_title} <br />
              <strong>Lesson:</strong> {a.lesson_title}
            </p>
            <p>
              <strong>Deadline:</strong>{" "}
              {a.deadline
                ? new Date(a.deadline).toLocaleString()
                : "No deadline"}
            </p>
            <p>
              <strong>Max Score:</strong> {a.max_score}
            </p>
            <button
              onClick={() => handleSubmitClick(a.id)}
              style={{
                padding: "8px 16px",
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
        ))
      )}
    </div>
  );
}
