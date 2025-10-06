import React from "react";
import { useNavigate } from "react-router-dom";

const CurveSection = () => {
  const navigate = useNavigate()
  return (
    <div class="curved-background">
      <div className="skew-background-x"></div>
      <div className="skew-background-y"></div>
      <h1 className="curve-sec-h1">Welcome to where the future works</h1>
      <div class="button-container">
        <button  >Get Started</button>
        <button  >Talk to Sales</button>
      </div>
    </div>
  );
};

export default CurveSection;
