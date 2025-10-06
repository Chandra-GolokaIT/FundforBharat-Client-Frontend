import React, { useState } from "react";
import "./styles.css";
import JobViewerPopup from "./JobViewerpopup"; // Adjust path as needed

function HeroSection({ jobRef }) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const scrollToJobSection = () => {
    if (jobRef.current) {
      jobRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="d-flex flex-column flex-md-row herosection-container">
        <div className="herosection-left">
          <h6 style={{ fontSize: "14px", fontWeight: "700" }}>
            CAREERS AT FUND FOR BHARAT
          </h6>
          <div style={{ position: "relative" }}>
            <span
              className="display-5 typing-animatetag"
              style={{ fontWeight: "700" }}
            >
              Work with us
            </span>
          </div>

          <p style={{ fontSize: "18px", fontWeight: "400" }}>
            Explore remote-friendly, flexible opportunities and join our mission
            to make work life simpler, more pleasant and more productive.
          </p>

          <button
            className="herosection-button"
            onClick={() => {
              console.log("Opening popup...");
              setIsPopupVisible(true);
            }}
          >
            VIEW CAREERS
          </button>

        </div>
        <div className="herosection-imagecontainer" style={{ zIndex: "9" }}>
          <img
            src="https://a.slack-edge.com/ddb1dac/marketing/img/careers/img-hero-slack-careers@2x.jpg"
            className="herosection-image"
          />
        </div>
      </div>

      {/* Popup modal */}
      <JobViewerPopup
        visible={isPopupVisible}
        onClose={() => setIsPopupVisible(false)}
      />
    </>
  );
}

export default HeroSection;
