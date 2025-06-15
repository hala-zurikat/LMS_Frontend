import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import heroImage from "../../assets/images/h4-img-1.png";

function Home() {
  const navigate = useNavigate();

  const titleText = "Welcome to EduCore 🎓";
  const descText =
    "EduCore is your smart learning hub for tech, business, and more";

  const [displayTitle, setDisplayTitle] = useState("");
  const [displayDesc, setDisplayDesc] = useState("");

  const [isTypingTitle, setIsTypingTitle] = useState(true);
  const [isTypingDesc, setIsTypingDesc] = useState(true);

  const [titleIndex, setTitleIndex] = useState(0);
  const [descIndex, setDescIndex] = useState(0);

  // TITLE typing effect
  useEffect(() => {
    let timeout;
    if (isTypingTitle) {
      if (titleIndex < titleText.length) {
        timeout = setTimeout(() => {
          setDisplayTitle((prev) => prev + titleText[titleIndex]);
          setTitleIndex(titleIndex + 1);
        }, 60); // أسرع
      } else {
        timeout = setTimeout(() => {
          setIsTypingTitle(false);
        }, 800); // أقصر
      }
    } else {
      if (titleIndex > 0) {
        timeout = setTimeout(() => {
          setDisplayTitle((prev) => prev.slice(0, -1));
          setTitleIndex(titleIndex - 1);
        }, 30); // أسرع مسح
      } else {
        setIsTypingTitle(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [titleIndex, isTypingTitle]);

  // DESCRIPTION typing effect
  useEffect(() => {
    let timeout;
    if (!isTypingTitle) {
      if (isTypingDesc) {
        if (descIndex < descText.length) {
          timeout = setTimeout(() => {
            setDisplayDesc((prev) => prev + descText[descIndex]);
            setDescIndex(descIndex + 1);
          }, 60); // أسرع
        } else {
          timeout = setTimeout(() => {
            setIsTypingDesc(false);
          }, 800); // أقصر
        }
      } else {
        if (descIndex > 0) {
          timeout = setTimeout(() => {
            setDisplayDesc((prev) => prev.slice(0, -1));
            setDescIndex(descIndex - 1);
          }, 30); // أسرع مسح
        } else {
          setIsTypingDesc(true);
          setIsTypingTitle(true);
        }
      }
    }
    return () => clearTimeout(timeout);
  }, [descIndex, isTypingDesc, isTypingTitle]);

  return (
    <div className={styles.home}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          {displayTitle}
          <span className={styles.cursor}></span>
        </h1>
        <p className={styles.description}>
          {displayDesc}
          <span className={styles.cursor}></span>
        </p>

        <div className={styles.buttons}>
          <button
            onClick={() => navigate("/login")}
            className={styles.btnLogin}
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className={styles.btnSignup}
          >
            Sign Up
          </button>
        </div>
      </div>

      <div className={styles.imageContainer}>
        <img
          src={heroImage}
          alt="Learning illustration"
          className={styles.hero}
        />
      </div>
    </div>
  );
}

export default Home;
