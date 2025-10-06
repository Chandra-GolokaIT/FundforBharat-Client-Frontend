import React from "react";
import img from "../../assets/images/transplant-gem.webp";
import { Navigate, useNavigate } from "react-router-dom";

const FlagSection = () => {
  const navigate = useNavigate();
  return (
    <div className="flag-section">
      <div className="p-5 flag-section-content">
        <h1
          className="text-center pt-4"
          style={{ fontWeight: "bold", color: "#ffe15f" }}
        >
          How Fund for Bharat Works
        </h1>
        <p style={{ fontSize: "1.2em" }} className="text-center pt-3">
          Welcome to Fund for Bharat! We're here to make fundraising simple,
          transparent, and effective. Whether you're raising money for a
          personal cause, medical emergency, or community project, our platform
          provides all the tools you need to succeed. Follow our step-by-step
          guide to start your campaign and reach your fundraising goals quickly.
        </p>
        {/* <button type="button" onClick={() => navigate('/start-fundraiser')} >Start a fundraiser</button> */}
      </div>
    </div>
  );
};

export default FlagSection;
