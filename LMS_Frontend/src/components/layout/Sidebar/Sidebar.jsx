// src/components/layout/Sidebar/Sidebar.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";

export default function Sidebar({ role = "admin" }) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const links = {
    admin: [
      { to: "/admin", label: "Dashboard" },
      { to: "/admin/users", label: "Users" },
      { to: "/admin/courses", label: "Courses" },
      { to: "/admin/settings", label: "Settings" },
    ],
  };

  // Auto close sidebar on small screen
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) setIsOpen(false);
      else setIsOpen(true);
    };

    handleResize(); // init
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <aside className={`${styles.sidebar} ${!isOpen ? styles.closed : ""}`}>
      <button className={styles.toggleBtn} onClick={toggleSidebar}>
        {isOpen ? "❮" : "❯"}
      </button>

      <h2 className={styles.title}>{isOpen && "Admin Panel"}</h2>

      <nav className={styles.nav}>
        {(links[role] || []).map((link) => (
          <Link key={link.to} to={link.to} className={styles.link}>
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
