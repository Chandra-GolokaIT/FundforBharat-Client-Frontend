import React, { useState, useEffect } from "react";
import "./style.css";
import { GiCheckMark } from "react-icons/gi";

const steps = [
  {
    id: 1,
    title: "Get Started",
    caption:
      "Set essential fundraiser details such as fundraiser title, target and currency",
  },
  {
    id: 2,
    title: "Fundraiser Story",
    caption: "Tell your story! Add your description, images, videos and more",
  },
  // {
  //   id: 3,
  //   title: "Final Details",
  //   caption: "Add team members, customize visibility, and more.",
  // },
  { id: 3, title: "Finish", caption: "Review and submit your fundraiser" },
];

const FundraiserFormSteps = ({ formnumber, completedSteps }) => {
  const [activeStep, setActiveStep] = useState(formnumber);

  const handleStepClick = (stepId) => {
    console.log("Clicked step:", stepId);
    setActiveStep(stepId);
  };

  useEffect(() => {
    setActiveStep(formnumber)
  }, [formnumber])

  return (
    <div className="fundraise-form-steps-container">
      {steps.map((step) => (
        <div
          key={step.id}
          className={`step ${step.id < activeStep ? "step-active" : ""}`}
          onClick={() => handleStepClick(step.id)}
        >
          <div>
            <div className="step-circle">
              {step.id < activeStep ? <GiCheckMark /> : step.id}
            </div>
          </div>
          <div>
            <div className="step-title">{step.title}</div>
            <div className="step-caption">{step.caption}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FundraiserFormSteps;
