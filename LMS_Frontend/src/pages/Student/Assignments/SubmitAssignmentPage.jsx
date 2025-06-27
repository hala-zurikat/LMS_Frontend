import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAssignmentById } from "../../../services/assignmentService";
import { submitAssignment } from "../../../services/submissionService";
import useAuth from "../../../hooks/useAuth";

export default function SubmitAssignmentPage() {
  const { assignmentId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [assignment, setAssignment] = useState(null);
  const [submissionUrl, setSubmissionUrl] = useState("");

  useEffect(() => {
    async function fetchAssignment() {
      const data = await getAssignmentById(Number(assignmentId));
      setAssignment(data);
    }
    fetchAssignment();
  }, [assignmentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!submissionUrl.trim()) {
      alert("Please enter a submission URL.");
      return;
    }

    try {
      await submitAssignment({
        assignment_id: Number(assignmentId),
        user_id: user.id,
        submission_url: submissionUrl.trim(),
      });
      alert("Submission sent successfully!");
      navigate("/student/assignments");
    } catch (error) {
      alert("Failed to submit assignment");
      console.error(error);
    }
  };

  if (!assignment) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 16 }}>
      <h2>Submit Assignment</h2>
      <h3>{assignment.title}</h3>
      <p>{assignment.description}</p>
      <p>
        Deadline:{" "}
        {assignment.deadline
          ? new Date(assignment.deadline).toLocaleString()
          : "No deadline"}
      </p>
      <p>Max Score: {assignment.max_score}</p>

      <form onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="Enter submission URL"
          value={submissionUrl}
          onChange={(e) => setSubmissionUrl(e.target.value)}
          required
          style={{ width: "100%", marginBottom: 12, padding: 6 }}
        />
        <button type="submit" style={{ padding: "8px 12px" }}>
          Submit
        </button>
      </form>
    </div>
  );
}
