import React, { useEffect } from "react";
import styles from "./AboutCard.module.css";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AboutCard() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.card} data-aos="fade-up">
        <h2 className={styles.title}>About Our Platform</h2>
        <p className={styles.description}>
          Educore is a modern Learning Management System (LMS) designed to
          empower learners and educators in the tech field. We provide a
          seamless educational experience through interactive courses, real-time
          progress tracking, and smart tools for assignment management and
          performance analysis. Whether you're a student looking to grow your
          skills or an instructor aiming to share your knowledge, Educore offers
          the tools you need — all in one intuitive platform. Our mission is to
          make tech education accessible, engaging, and impactful.
        </p>
      </div>
    </div>
  );
}
