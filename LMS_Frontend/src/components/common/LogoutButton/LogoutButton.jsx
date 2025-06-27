import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import styles from "./LogoutButton.module.css";

export default function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button className={styles.logoutButton} onClick={handleLogout}>
      Logout
    </button>
  );
}
