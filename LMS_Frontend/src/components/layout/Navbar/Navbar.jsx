// src/components/Navbar/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../../assets/images/logo1.jpg";
import { FaBars } from "react-icons/fa";

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
      setIsMenuOpen(false); // اغلاق القائمة بعد البحث
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <Link to="/" className={styles.logoLink}>
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
          <li>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/courses" onClick={() => setIsMenuOpen(false)}>
              Discover Courses
            </Link>
          </li>
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
