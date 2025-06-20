// src/pages/Unauthorized.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div style={{ textAlign: "center", padding: "3rem" }}>
      <h1>🚫 Unauthorized</h1>
      <p>You don't have permission to access this page.</p>
      <Link to="/login">Back to Login</Link>
    </div>
  );
}
