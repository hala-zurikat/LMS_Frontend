import React, { useEffect, useState, useContext } from "react";
import { getAssignmentsByInstructor } from "../../../services/assignmentService";
import { updateSubmissionStatus } from "../../../services/submissionService";
import styles from "./SubmissionAssignment.module.css";
import AuthContext from "../../../context/AuthContext";

export default function InstructorAssignmentsPage() {
  const { user } = useContext(AuthContext); // نفترض user يحتوي على بيانات المستخدم
  const instructorId = user?.id; // تأكد من أن الحقل هو id

  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    async function fetchAssignments() {
      if (!instructorId) {
        console.warn("Instructor ID is missing!");
        return;
      }
      try {
        const data = await getAssignmentsByInstructor(instructorId);
        setAssignments(data);
      } catch (error) {
        console.error("Failed to fetch assignments:", error);
      }
    }
    fetchAssignments();
  }, [instructorId]);

  const handleGrade = async (submissionId, newGrade) => {
    try {
      await updateSubmissionStatus(submissionId, { grade: newGrade });
      alert("Grade updated successfully");
    } catch (error) {
      console.error("Error updating grade:", error);
    }
  };

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
              {new Date(assignment.deadline).toLocaleString()}
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
                      </a>{" "}
                      <br />
                      <strong>Submitted At:</strong>{" "}
                      {new Date(sub.submitted_at).toLocaleString()}
                    </p>
                    <label>
                      Grade:
                      <input
                        type="number"
                        defaultValue={sub.grade || ""}
                        onBlur={(e) =>
                          handleGrade(sub.id, Number(e.target.value))
                        }
                      />
                    </label>
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
