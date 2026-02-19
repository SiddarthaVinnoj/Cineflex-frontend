import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://cineflex-backend.onrender.com/user/login",
        {
          email,
          password,
        }
      );

      const data = response.data;

      // ✅ STORE TOKEN
      localStorage.setItem("token", data.token);

      // ✅ STORE USER (VERY IMPORTANT FOR ADMIN NAVBAR)
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login successful");

      // Redirect to home
      navigate("/");
      window.location.reload(); // refresh navbar state
    } catch (error) {
      alert(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
