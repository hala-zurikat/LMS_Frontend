import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import heroImage from "../../assets/images/h4-img-1.png";
import AboutCard from "./components/AboutCard";
import FeaturedCourses from "../../features/courses/components/FeaturedCourses";
import TestimonialCard from "../../components/common/TestimonialCard/TestimonialCard";

function Home() {
  const navigate = useNavigate();

  const titleText = "Welcome to EduCore 🎓";
  const descriptions = [
    "Your smart learning hub for tech.",
    "Master business and leadership skills.",
    "Explore coding, design, and beyond.",
    "Learn anytime, anywhere with EduCore.",
  ];

  const [displayDesc, setDisplayDesc] = useState("");
  const [descIndex, setDescIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  // Description typing & deleting effect
  useEffect(() => {
    const currentText = descriptions[descIndex];
    let timeout;

    if (isTyping) {
      if (charIndex < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayDesc((prev) => prev + currentText[charIndex]);
          setCharIndex((prev) => prev + 1);
        }, 70);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 1500); // Wait before deleting
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setDisplayDesc((prev) => prev.slice(0, -1));
          setCharIndex((prev) => prev - 1);
        }, 30);
      } else {
        setIsTyping(true);
        setDescIndex((prev) => (prev + 1) % descriptions.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isTyping, descIndex]);

  return (
    <div className={styles.home}>
      <div className={styles.content}>
        <h1 className={styles.title}>{titleText}</h1>
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

      <div className={styles.aboutSection}>
        <AboutCard />
      </div>
      <FeaturedCourses />
      <div className={styles.testimonialsSection}>
        <h2 className={styles.testimonialsHeading}>What People Say About Us</h2>
        <div className={styles.testimonialsGrid}>
          <TestimonialCard
            name="Alice Johnson"
            rating={5}
            feedback="The courses are amazing and the instructors are very supportive!"
            avatar="https://randomuser.me/api/portraits/women/44.jpg"
          />
          <TestimonialCard
            name="Mohammed Al-Karaki"
            rating={5}
            feedback="A wonderful platform to learn new skills with practical assignments."
            avatar="https://randomuser.me/api/portraits/men/36.jpg"
          />
          <TestimonialCard
            name="Sara Omar"
            rating={5}
            feedback="I love how interactive and easy to follow the lessons are."
            avatar="https://randomuser.me/api/portraits/women/65.jpg"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
