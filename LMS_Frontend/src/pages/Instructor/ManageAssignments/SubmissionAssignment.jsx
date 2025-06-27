import React, { useEffect, useState, useContext } from "react";
import { getAssignmentsByInstructor } from "../../../services/assignmentService";
import { updateSubmissionStatus } from "../../../services/submissionService";
import styles from "./SubmissionAssignment.module.css";
import AuthContext from "../../../context/AuthContext";

export default function InstructorAssignmentsPage() {
  const { user } = useContext(AuthContext);
  const instructorId = user?.id;

  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // نخزن العلامات المحلية لكل submission
  const [grades, setGrades] = useState({}); // key: submissionId, value: grade

  useEffect(() => {
    async function fetchAssignments() {
      if (!instructorId) return;

      setLoading(true);
      setError(null);
      try {
        const data = await getAssignmentsByInstructor(instructorId);
        setAssignments(data);

        // نهيئ حالة العلامات local grades
        const initialGrades = {};
        data.forEach((assignment) => {
          assignment.submissions.forEach((sub) => {
            initialGrades[sub.id] = sub.grade ?? "";
          });
        });
        setGrades(initialGrades);
      } catch (err) {
        setError("Failed to fetch assignments.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchAssignments();
  }, [instructorId]);

  const handleInputChange = (submissionId, value) => {
    setGrades((prev) => ({
      ...prev,
      [submissionId]: value,
    }));
  };

  const handleSave = async (submissionId) => {
    const newGrade = Number(grades[submissionId]);
    if (isNaN(newGrade) || newGrade < 0) {
      alert("Please enter a valid grade.");
      return;
    }
    try {
      await updateSubmissionStatus(submissionId, { grade: newGrade });
      alert("Grade updated successfully");

      // تحديث العلامة في assignments محليًا
      setAssignments((prevAssignments) =>
        prevAssignments.map((assignment) => ({
          ...assignment,
          submissions: assignment.submissions.map((sub) =>
            sub.id === submissionId ? { ...sub, grade: newGrade } : sub
          ),
        }))
      );
    } catch (error) {
      console.error("Error updating grade:", error);
      alert("Failed to update grade.");
    }
  };

  if (loading) return <p>Loading assignments...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      <h2>Manage Assignments</h2>
      {assignments.length === 0 ? (
        <p>No assignments found.</p>
      ) : (
        assignments.map((assignment) => (
          <div key={assignment.id} className={styles.card}>
            <h3>{assignment.title}</h3>
            <p>{assignment.description}</p>
            <p>
              <strong>Course:</strong> {assignment.course_title} |{" "}
              <strong>Lesson:</strong> {assignment.lesson_title}
            </p>
            <p>
              <strong>Deadline:</strong>{" "}
              {assignment.deadline
                ? new Date(assignment.deadline).toLocaleString()
                : "No deadline"}
            </p>

            {assignment.submissions && assignment.submissions.length > 0 ? (
              <>
                <h4>Submissions:</h4>
                {assignment.submissions.map((sub) => (
                  <div key={sub.id} className={styles.submissionBox}>
                    <p>
                      <strong>Student:</strong> {sub.user_name} <br />
                      <strong>URL:</strong>{" "}
                      <a
                        href={sub.submission_url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Open
                      </a>
                      <br />
                      <strong>Submitted At:</strong>{" "}
                      {new Date(sub.submitted_at).toLocaleString()}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <label style={{ margin: 0, whiteSpace: "nowrap" }}>
                        Grade:
                        <input
                          type="number"
                          value={grades[sub.id] ?? ""}
                          onChange={(e) =>
                            handleInputChange(sub.id, e.target.value)
                          }
                          style={{ marginLeft: "4px" }}
                        />
                      </label>
                      <button
                        onClick={() => handleSave(sub.id)}
                        style={{
                          marginLeft: "auto", // هذا يزحف بالزر على أقصى اليمين
                          padding: "4px 12px",
                          backgroundColor: "#4CAF50",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <p>No submissions yet.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}
