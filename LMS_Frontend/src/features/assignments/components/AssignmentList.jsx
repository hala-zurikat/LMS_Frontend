import React from "react";
import AssignmentCard from "./AssignmentCard";

export default function AssignmentList({ assignments }) {
  if (!assignments || assignments.length === 0) {
    return <p>No assignments found.</p>;
  }

  return (
    <div>
      {assignments.map((assignment) => (
        <AssignmentCard key={assignment.id} assignment={assignment} />
      ))}
    </div>
  );
}
