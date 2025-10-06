import React, { useEffect, useState } from "react";
import GetStartedForm from "./GetStartedForm";
import "./style.css";
import FundRaiserStory from "./FundRaiserStory";
import FinalDetails from "./FinalDetails";
import Finish from "./Finish";
function FundraiseForms({ formnumber, setFormnumber }) {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    country: '',
    city: '',
    firstName: '',
    lastName: '',
    story: '',
    text: '',
    securityQuestion: '',
    securityAnswer: '',
    howYouHeard: '',
    targetAmount: ''
  });

  const [completedSteps, setCompletedSteps] = useState([]);


  const handleSubmit = () => {
    console.log("form submitted!", formData);
  }

  const markStepCompleted = (stepNumber) => {
    if (!completedSteps.includes(stepNumber)) {
      setCompletedSteps([...completedSteps, stepNumber]);
    }
  };

  return (

    <div
      className="startafundraiser-form-container"
    >
      {
        formnumber == 1 && (
          <GetStartedForm
            formnumber={formnumber}
            setFormnumber={setFormnumber}
            formData={formData}
            setFormData={setFormData}
            onComplete={() => markStepCompleted(1)}
          />
        )
      }
      {
        formnumber == 2 && (
          <FundRaiserStory
            formnumber={formnumber}
            setFormnumber={setFormnumber}
            formData={formData}
            setFormData={setFormData}
            onComplete={() => markStepCompleted(2)}

          />
        )
      }
      {/* {
        formnumber == 3 && (
          <FinalDetails
            formnumber={formnumber}
            setFormnumber={setFormnumber}
            formData={formData}
            setFormData={setFormData}
            onComplete={() => markStepCompleted(3)}
          />


        )
      } */}
      {
        formnumber == 3 && (
          <Finish
            formnumber={formnumber}
            setFormnumber={setFormnumber}
            formData={formData}
            onSubmit={handleSubmit}
            onComplete={() => markStepCompleted(3)}
          />
        )
      }
    </div>
  );
}

export default FundraiseForms;
