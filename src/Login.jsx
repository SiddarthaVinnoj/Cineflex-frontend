import React from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await axios.post("https://cineflex-backend.onrender.com/user/login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert(res.data.message);
      navigate("/");
      window.location.reload(); // refresh navbar
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="login-overlay"></div>

        <div className="login-card">
          <h1 className="logo">CineFlex</h1>
          <h2>Login</h2>

          <form onSubmit={handleSubmit}>
            <input name="email" type="email" placeholder="Email" required />
            <input name="password" type="password" placeholder="Password" required />

            <button className="login-btn" type="submit">Login</button>
          </form>

          <p className="signup-text">
            New to CineFlex?{" "}
            <Link to="/signup" style={{ textDecoration: "none" }}>
              Sign up now
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
