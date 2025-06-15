import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../../services/authService";
import styles from "./LoginPage.module.css";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await login(formData);

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      navigate("/student/dashboard");
    } catch (err) {
      const backendMessage =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message ||
        "Login failed. Please try again.";

      setError(backendMessage);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <img src="public/images/logo2.png" alt="Logo" className={styles.logo} />
        <h2>Login</h2>

        <div className={styles.inputGroup}>
          <FaEnvelope className={styles.icon} />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
        </div>

        <div className={styles.inputGroup} style={{ position: "relative" }}>
          <FaLock className={styles.icon} />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />
          {/* أيقونة تبديل رؤية كلمة السر */}
          <span
            onClick={() => setShowPassword(!showPassword)}
            className={styles.togglePasswordIcon} // استخدم هذا الكلاس من CSS module
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className={styles.rememberContainer}>
          <label className={styles.rememberLabel}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            Remember me
          </label>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.submitButton}>
          Login
        </button>

        <div className={styles.divider}>or</div>

        <button
          type="button"
          className={styles.googleButton}
          onClick={handleGoogleLogin}
        >
          <FcGoogle className={styles.googleIcon} />
          Login with Google
        </button>

        <p className={styles.signupLink}>
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")}>Sign Up</span>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
