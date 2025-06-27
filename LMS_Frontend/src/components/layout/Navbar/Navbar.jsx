import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../../assets/images/logo1.jpg";
import { FaBars } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";

function Navbar() {
  const { user } = useAuth();
  const role = user?.role || "guest";

  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div
        className={styles.logoContainer}
        onClick={() => {
          setIsMenuOpen(false);
          if (role === "admin") {
            navigate("/admin/dashboard");
          } else if (role === "instructor") {
            navigate("/instructor/dashboard");
          } else if (role === "student") {
            navigate("/student/dashboard");
          } else {
            navigate("/");
          }
        }}
        style={{ cursor: "pointer" }}
      >
        <img src={logo} alt="Logo" className={styles.logo} />
        <span className={styles.brandName}>EduCore</span>
      </div>

      <button className={styles.menuToggle} onClick={toggleMenu}>
        <FaBars />
      </button>

      <div
        className={`${styles.navLinksContainer} ${
          isMenuOpen ? styles.showMenu : ""
        }`}
      >
        <ul className={styles.navLinks}>
          {location.pathname === "/" && (
            <li>
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
            </li>
          )}

          {/* روابط خاصة بالطالب */}
          {role === "student" && (
            <>
              <li>
                <Link to="/courses" onClick={() => setIsMenuOpen(false)}>
                  Discover Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/student/assignments"
                  onClick={() => setIsMenuOpen(false)}
                >
                  All Assignments
                </Link>
              </li>
            </>
          )}

          {/* روابط خاصة بالمعلم */}
          {role === "instructor" && (
            <>
              <li>
                <Link
                  to="/instructor/courses"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Manage Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/instructor/quizzes"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Manage Quizzes
                </Link>
              </li>
              <li>
                <Link
                  to="/instructor/assignments"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Manage Assignments
                </Link>
              </li>
            </>
          )}

          {/* روابط خاصة بالأدمن */}
          {role === "admin" && (
            <>
              <li>
                <Link to="/admin/users" onClick={() => setIsMenuOpen(false)}>
                  Manage Users
                </Link>
              </li>
              <li>
                <Link to="/admin/courses" onClick={() => setIsMenuOpen(false)}>
                  Manage Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/categories"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Manage Categories
                </Link>
              </li>
            </>
          )}

          <li>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
              Contact Us
            </Link>
          </li>
        </ul>

        <form className={styles.searchForm} onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>
            🔍
          </button>
        </form>
      </div>
    </nav>
  );
}

export default Navbar;
