import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/Logo1.jpg";

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
            <Link to="#">Home</Link>
          </li>
          <li>
            <Link to="#">About</Link>
          </li>
          <li>
            <Link to="#">Courses</Link>
          </li>
          <li>
            <Link to="#">FAQ</Link>
          </li>
          <li>
            <Link to="#">Privacy Policy</Link>
          </li>
          <li>
            <Link to="#">Contact</Link>
          </li>
        </ul>

        <div className={styles.socialMedia}>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
        </div>
      </div>

      <div className={styles.copyRight}>
        © {new Date().getFullYear()} EduCore. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
