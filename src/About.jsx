// AboutUs.jsx
import React from "react";
import Navbar from "./Navbar";

function AboutUs() {
  return (
    <>
      <Navbar />
      <div style={{ marginTop: "80px", padding: "40px", fontFamily: "Arial, sans-serif" }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>About CineFlex</h1>

        <p style={{ maxWidth: "800px", margin: "0 auto", lineHeight: "1.6", fontSize: "18px" }}>
          CineFlex is your ultimate destination for streaming Movies, Webseries, and Kids content
          all in one place. Our mission is to provide high-quality entertainment that is accessible,
          personalized, and enjoyable for everyone. Whether you are a movie buff, a webseries enthusiast,
          or looking for fun and educational content for kids, CineFlex has got you covered.
        </p>

        <h2 style={{ marginTop: "40px", textAlign: "center" }}>Our Mission</h2>
        <p style={{ maxWidth: "700px", margin: "20px auto", lineHeight: "1.6", fontSize: "16px" }}>
          Our mission is to bring the world of entertainment to your fingertips. We aim to curate
          the best content from across the globe and provide an intuitive platform for seamless
          streaming experience. Your satisfaction is our top priority.
        </p>

        <h2 style={{ marginTop: "40px", textAlign: "center" }}>Why Choose CineFlex?</h2>
        <ul style={{ maxWidth: "700px", margin: "20px auto", fontSize: "16px", lineHeight: "1.8" }}>
          <li>🎬 Extensive library of Movies, Webseries, and Kids content</li>
          <li>📱 Stream on multiple devices anytime, anywhere</li>
          <li>⭐ Personalized recommendations based on your interests</li>
          <li>🔒 Safe and family-friendly environment</li>
          <li>⚡ High-quality video with minimal buffering</li>
        </ul>

        <h2 style={{ marginTop: "40px", textAlign: "center" }}>Join Us Today</h2>
        <p style={{ maxWidth: "700px", margin: "20px auto", lineHeight: "1.6", fontSize: "16px" }}>
          Sign up today and explore a world of entertainment. CineFlex is more than just streaming,
          it’s a community for movie lovers, series enthusiasts, and families looking for fun and
          educational content. Enjoy your favorite shows and discover new ones every day!
        </p>
      </div>
    </>
  );
}

export default AboutUs;
