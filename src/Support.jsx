import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function Support() {
  return (
    <>
      <Navbar />
      <div style={{  padding: "100px", maxWidth: "600px", margin: "auto", textAlign: "center" }}>
        <h2>🛠 Support</h2>
        <p>
          For any issues or queries, please use our{" "}
          <Link to="/contact" style={{ color: "#007bff", textDecoration: "underline" }}>
            Contact Page
          </Link>{" "}
          to reach out to us. We will get back to you as soon as possible.
        </p>
        <p>Thank you for using our service!</p>
      </div>
    </>
  );
}

export default Support;
