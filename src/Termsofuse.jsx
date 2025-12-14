import React from "react";
import Navbar from "./Navbar";

function TermsOfUse() {
  return (
    <>
      <Navbar />
      <div style={{ marginTop: "80px", padding: "20px", maxWidth: "900px", margin: "80px auto 0 auto" }}>
        <h1>Terms of Use</h1>
        <p>Last updated: December 2025</p>

        <p>
          Welcome to CineFlex! By accessing or using our website and services, you agree to comply with and be bound by the following terms and conditions.
        </p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use and any additional guidelines, rules, or policies posted on the platform.
        </p>

        <h2>2. Eligibility</h2>
        <p>
          You must be at least 18 years old or of legal age in your jurisdiction to use our services. By using the platform, you represent that you meet this eligibility requirement.
        </p>

        <h2>3. Account Responsibility</h2>
        <p>
          When you create an account, you are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. Notify us immediately if you suspect unauthorized use.
        </p>

        <h2>4. Use of Content</h2>
        <p>
          All content available on CineFlex, including movies, web series, and kids content, is for personal, non-commercial use only. You may not copy, distribute, modify, or publicly display content without prior written consent.
        </p>

        <h2>5. Prohibited Conduct</h2>
        <p>
          You agree not to:
          <ul>
            <li>Access, use, or attempt to access the platform unlawfully.</li>
            <li>Use the platform to transmit harmful or illegal content.</li>
            <li>Share your account with others or allow unauthorized access.</li>
          </ul>
        </p>

        <h2>6. Termination</h2>
        <p>
          We may suspend or terminate your access to the platform at our discretion if you violate these terms or engage in harmful conduct.
        </p>

        <h2>7. Disclaimer</h2>
        <p>
          CineFlex provides content "as is" without warranties of any kind. We do not guarantee uninterrupted or error-free access, and we are not liable for any loss or damage arising from your use of the platform.
        </p>

        <h2>8. Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms of Use at any time. Changes will be posted on this page with an updated effective date.
        </p>

        <h2>9. Contact</h2>
        <p>
          If you have any questions about these Terms of Use, please contact us via our Contact page.
        </p>
      </div>
    </>
  );
}

export default TermsOfUse;
