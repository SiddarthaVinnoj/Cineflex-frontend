import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullname = e.target.fullname.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await axios.post("https://cineflex-backend.onrender.com/user/signup", {
        fullname,
        email,
        password,
      });

      alert(res.data.message);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="signup-container">
        <div className="signup-overlay"></div>

        <div className="signup-card">
          <h1 className="logo">CineFlex</h1>
          <h2>Create Account</h2>

          <form onSubmit={handleSubmit}>
            <input name="fullname" type="text" placeholder="Full Name" required />
            <input name="email" type="email" placeholder="Email address" required />
            <input name="password" type="password" placeholder="Password" required />

            <button className="signup-btn" type="submit">Sign Up</button>

            <p className="signin-text">
              Already have an account?{" "}
              <Link to="/login" style={{ textDecoration: "none" }}>Login</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
