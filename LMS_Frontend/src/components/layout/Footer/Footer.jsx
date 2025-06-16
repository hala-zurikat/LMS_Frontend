import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import logo from "../../../assets/images/logo1.jpg";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.logoSection}>
          <img src={logo} alt="EduCore Logo" className={styles.logo} />
          <span className={styles.brandName}>EduCore</span>
        </div>

        <ul className={styles.links}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/courses">Courses</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>

      <div className={styles.copyRight}>
        © {new Date().getFullYear()} EduCore. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
