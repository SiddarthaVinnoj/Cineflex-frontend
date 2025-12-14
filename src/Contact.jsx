// ContactUs.jsx
import React, { useState } from "react";
import Navbar from "./Navbar";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle sending the form data to backend or email service
    alert("Thank you for contacting us! We will get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: "90px", fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "auto" }} className="page-container">
        <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Contact Us</h1>
        <p style={{ textAlign: "center", marginBottom: "20px" }} className="contact">
          Have questions or feedback? We’d love to hear from you. Fill out the form below, and our team will get in touch with you.
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            style={{ padding: "10px", fontSize: "16px" }}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            style={{ padding: "10px", fontSize: "16px" }}
          />
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            required
            style={{ padding: "10px", fontSize: "16px" }}
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            required
            rows="5"
            style={{ padding: "10px", fontSize: "16px" }}
          ></textarea>

          <button type="submit" style={{ padding: "12px", fontSize: "16px", backgroundColor: "#ff4c4c", color: "#fff", border: "none", cursor: "pointer" }}>
            Send Message
          </button>
        </form>

        <div style={{ marginTop: "40px", textAlign: "center", fontSize: "16px" }} className="contact">
          <p>Email: support@cineflex.com</p>
          <p>Phone: +91 12345 67890</p>
          <p>Address: CineFlex Studios, Hyderabad, India</p>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
