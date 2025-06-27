import React from "react";
import AssignmentCard from "./AssignmentCard";

export default function AssignmentList({ assignments }) {
  if (!assignments || assignments.length === 0) {
    return <p>No assignments found.</p>;
  }

  const uniqueAssignments = assignments.filter(
    (item, index, self) => index === self.findIndex((t) => t.id === item.id)
  );

  return (
    <div>
      {uniqueAssignments.map((assignment) => (
        <AssignmentCard key={assignment.id} assignment={assignment} />
      ))}
    </div>
  );
}
