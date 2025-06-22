import React from "react";
import { Link, useParams } from "react-router-dom";

function CourseDetailsPage({ modules }) {
  //modules: array with lessons inside

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Modules & Lessons</h2>
      {modules.map((module) => (
        <div key={module.id} style={{ marginBottom: "1rem" }}>
          <h3>{module.title}</h3>
          <ul style={{ listStyle: "none", paddingLeft: 0 }}>
            {module.lessons.map((lesson) => (
              <li
                key={lesson.id}
                style={{
                  padding: "0.5rem",
                  borderBottom: "1px solid #eee",
                  background: "red",
                }}
              >
                <Link
                  to={`/lessons/${lesson.id}`}
                  style={{ textDecoration: "none", color: "#007bff" }}
                >
                  📘 {lesson.title} ({lesson.content_type})
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default CourseDetailsPage;
