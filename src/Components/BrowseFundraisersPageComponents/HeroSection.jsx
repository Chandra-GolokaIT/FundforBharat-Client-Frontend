import React, { useEffect } from "react";
import useTypingAnimation from "../../hooks/useTypingAnimation";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();
  let animatedmessage = useTypingAnimation("Transform Lives Today");
  const handleDonate = () => {
    navigate('/DonationForm');
  }

  return (
    <div className="browse-hero-section">
      <div className="browse-hero-section-content ">
        <h1> {animatedmessage}</h1>
        <h4>
          Make a lasting impact by supporting sustainable community projects
          across the nation.
        </h4>
        {/* <button type="button"
        onClick={handleDonate}
        >Donate Now</button> */}
      </div>
    </div>
  );
}

export default HeroSection;
