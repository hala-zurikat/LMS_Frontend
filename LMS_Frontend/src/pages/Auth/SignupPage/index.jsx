import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../../services/authService";
import styles from "./SignUpPage.module.css";
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import logo from "../../../assets/images/logo2.png";

function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const { confirmPassword, ...dataToSend } = formData; // لا نرسل confirm للسيرفر
      const data = await register(dataToSend);

      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/student/dashboard");
    } catch (err) {
      const backendMessage =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message ||
        "Registration failed";
      setError(backendMessage);
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <img src={logo} alt="Logo" className={styles.logo} />
        <h2>Sign Up</h2>

        <div className={styles.inputGroup}>
          <FaUser className={styles.icon} />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <FaEnvelope className={styles.icon} />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* كلمة السر */}
        <div className={styles.inputGroup} style={{ position: "relative" }}>
          <FaLock className={styles.icon} />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className={styles.togglePasswordIcon}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          <small className={styles.passwordHint}>
            Password must contain uppercase, lowercase, number, and special
            character.
          </small>
        </div>

        <div className={styles.inputGroup} style={{ position: "relative" }}>
          <FaLock className={styles.icon} />
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className={styles.togglePasswordIcon}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button type="submit" className={styles.submitButton}>
          Sign Up
        </button>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.divider}>or</div>

        <button
          type="button"
          className={styles.googleButton}
          onClick={handleGoogleSignup}
        >
          <FcGoogle className={styles.googleIcon} />
          Sign up with Google
        </button>

        <p className={styles.loginLink}>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </form>
    </div>
  );
}

export default SignUpPage;
