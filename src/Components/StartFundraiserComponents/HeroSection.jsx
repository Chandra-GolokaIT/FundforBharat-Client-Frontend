import React from "react";
import "./style.css";
import img from "../../assets/images/startfundraiser-herosection-img.jpeg";
import { FaHandHoldingUsd } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const HeroSection = ({startFundraiserRef}) => {
  const navigate = useNavigate()
  const handleExplore = () =>{
    navigate('/howitworks')
  }


  const scrollToGetStarted = () => {
    if (startFundraiserRef.current) {
      startFundraiserRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };


  return (
    <div className="start-fundraiser-hero-section">
      <div className="start-fundraiser-image-section">
        <button onClick={handleExplore}
        >
          <FaArrowLeft /> Explore more
        </button>
        <img src={img} alt="start-fundraiser-hero-section-img" />
      </div>
      <div ref={startFundraiserRef} className="start-fundraiser-content-section">
        <button style={{ background: "#FFEEC3" }}
        onClick={(e) => {
          e.preventDefault();
          scrollToGetStarted();
        }}
        >
          <FaHandHoldingUsd size={30} style={{ color: "orange" }} /> Start
          Fundraising
        </button>
        <h1>Kickstart Your Fundraiser in Minutes</h1>
        <h4>
          Join our community of passionate fundraisers and make a real
          difference. Follow our easy steps to set up your campaign and start
          raising funds for your cause today.
        </h4>
      </div>
    </div>
  );
};

export default HeroSection;
