import React, { useRef, useState } from "react";
import HeroSection from "../../Components/StartFundraiserComponents/HeroSection";
import FundraiserFormSteps from "../../Components/StartFundraiserComponents/FundraiserFormSteps";
import SubscribeCard from "../../Components/StartFundraiserComponents/SubscribeCard";
import FundraiseForms from "../../Components/StartFundraiserComponents/FundraiseForms";
import "./StartFundraiserPage.css";

const StartFundraiserPage = () => {
  const [formnumber, setFormnumber] = useState(1);
  const startFundraiserRef = useRef(null);

  return (
    <div
      style={{ paddingTop: "80px" }}>
      <div
        className="form-and-steps-container d-flex justify-content-center align-items-start p-3"
        style={{ gap: "100px" }}

      >
        <div className="side-cards">
          <FundraiserFormSteps
            formnumber={formnumber}
            startFundraiserRef={startFundraiserRef}
          />
          <SubscribeCard />
        </div>
        <div>
          <FundraiseForms
            formnumber={formnumber}
            setFormnumber={setFormnumber}
          />
        </div>
      </div>
      <HeroSection startFundraiserRef={startFundraiserRef} />
    </div>
  );
};

export default StartFundraiserPage;