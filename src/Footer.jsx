import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="ott-footer">
      <div className="footer-top">
        <h2 className="brand">CineFlex</h2>
        <p className="tagline">Your world of movies, shows & entertainment.</p>
      </div>

      <div className="footer-links">
        
        <div className="footer-section">
          <h4>Browse</h4>
          <Link to="/movies">Movies</Link>
          <Link to="/webseries">Web Series</Link>
          <Link to="/kids">Kids</Link>
        </div>

        <div className="footer-section">
          <h4>Help</h4>
          <Link to="/support">Support</Link>
          <Link to="/faq">FAQs</Link>
        </div>

        <div className="footer-section">
          <h4>Company</h4>
          <Link to="/aboutus">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/termsofuse">Terms of Use</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2025 CineFlex. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
