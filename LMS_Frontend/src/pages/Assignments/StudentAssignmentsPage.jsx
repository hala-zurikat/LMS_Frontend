import React, { useEffect, useState } from "react";
import { getAssignmentsByUserId } from "../../services/assignmentService";
import useAuth from "../../hooks/useAuth";
import AssignmentList from "../../features/assignments/components/AssignmentList";

export default function StudentAssignmentsPage() {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    async function fetchAssignments() {
      if (user?.id) {
        const data = await getAssignmentsByUserId(user.id);
        setAssignments(data);
      }
    }
    fetchAssignments();
  }, [user]);

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 16 }}>
      <h2>Your Assignments</h2>
      <AssignmentList assignments={assignments} />
    </div>
  );
}
