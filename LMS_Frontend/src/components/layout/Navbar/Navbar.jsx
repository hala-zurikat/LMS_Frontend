import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // أضفنا useLocation
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
      <div className={styles.logoContainer}>
        <Link
          to="/"
          className={styles.logoLink}
          onClick={() => setIsMenuOpen(false)}
        >
          <img src={logo} alt="Logo" className={styles.logo} />
          <span className={styles.brandName}>EduCore</span>
        </Link>
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
            <li>
              <Link to="/courses" onClick={() => setIsMenuOpen(false)}>
                Discover Courses
              </Link>
            </li>
          )}

          {role === "instructor" && (
            <>
              {/* <li>
                <Link to="/courses/create" onClick={() => setIsMenuOpen(false)}>
                  Create Course
                </Link>
              </li> */}
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
