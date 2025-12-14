import React from "react";
import Navbar from "./Navbar";

function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <div style={{ marginTop: "80px", padding: "20px", maxWidth: "900px", margin: "80px auto 0 auto" }}>
        <h1>Privacy Policy</h1>
        <p>Last updated: December 2025</p>

        <p>
          CineFlex ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our platform.
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          We may collect the following information:
          <ul>
            <li>Personal information such as name, email, and contact details when you register or contact us.</li>
            <li>Usage information such as watch history, favorites, and browsing behavior on our platform.</li>
            <li>Technical information including device type, IP address, and browser type.</li>
          </ul>
        </p>

        <h2>2. How We Use Your Information</h2>
        <p>
          Your information may be used for:
          <ul>
            <li>Providing and improving our services.</li>
            <li>Personalizing your experience and recommendations.</li>
            <li>Communicating with you about updates, offers, and support.</li>
            <li>Ensuring the security and integrity of our platform.</li>
          </ul>
        </p>

        <h2>3. Sharing Your Information</h2>
        <p>
          We do not sell your personal information. We may share information with trusted third-party service providers to operate, maintain, or improve our platform, subject to confidentiality agreements.
        </p>

        <h2>4. Cookies and Tracking</h2>
        <p>
          We may use cookies and similar tracking technologies to enhance your experience, remember your preferences, and analyze usage trends.
        </p>

        <h2>5. Data Security</h2>
        <p>
          We implement reasonable security measures to protect your data. However, no method of transmission or storage is 100% secure, and we cannot guarantee absolute security.
        </p>

        <h2>6. Your Rights</h2>
        <p>
          You have the right to access, correct, or delete your personal information stored on our platform. You may also opt out of communications by contacting us directly.
        </p>

        <h2>7. Changes to Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.
        </p>

        <h2>8. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us via our Contact page.
        </p>
      </div>
    </>
  );
}

export default PrivacyPolicy;
