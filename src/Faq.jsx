import React from "react";
import Navbar from "./Navbar";

function Faq() {
  return (
    <>
      <Navbar />

      <div className="page-container" style={{marginTop:"100px" , marginLeft:"30%"}}>
        <h2>❓ Frequently Asked Questions (FAQ)</h2>

        <div className="faq-item">
          <h4>1. What is this OTT platform?</h4>
          <p>
            This is a streaming platform where you can watch movies, web
            series, and kids content anytime, anywhere.
          </p>
        </div>

        <div className="faq-item">
          <h4>2. Do I need to create an account?</h4>
          <p>
            Yes. You need to log in to watch content, save favorites, and
            access personalized features.
          </p>
        </div>

        <div className="faq-item">
          <h4>3. Is the content free?</h4>
          <p>
            Some content may be free. Premium content may require a
            subscription (if applicable).
          </p>
        </div>

        <div className="faq-item">
          <h4>4. How do favorites work?</h4>
          <p>
            You can add movies, web series, or kids content to your favorites
            and access them anytime from the Favorites page.
          </p>
        </div>

        <div className="faq-item">
          <h4>5. I am facing issues with playback. What should I do?</h4>
          <p>
            Please visit the <strong>Contact</strong> page and submit your
            issue. Our support team will assist you.
          </p>
        </div>

        <div className="faq-item">
          <h4>6. Can I use this platform on mobile?</h4>
          <p>
            Yes, the platform is responsive and works on mobile, tablet, and
            desktop devices.
          </p>
        </div>
      </div>
    </>
  );
}

export default Faq;
