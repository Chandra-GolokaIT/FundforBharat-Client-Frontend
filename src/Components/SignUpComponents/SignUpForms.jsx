import React, { useState } from "react";
import SignUpForm1 from "./SignUpForm1";
import SignUpForm2 from "./SignUpForm2";
import { useNavigate } from "react-router-dom";
import img from "../../assets/images/imgcontact.jpg";
import "./style.css";

const SignUpForms = () => {
  const [step, setStep] = useState(1);
  const [googleOrPhoneData, setGoogleOrPhoneData] = useState(null); // ✅ Store phone/google data
  const [selectedRole, setSelectedRole] = useState("fundraiser"); // optional: if role selection is required

  const navigate = useNavigate();

  const handleContinue = () => {
    setStep(2);
  };

  const handleGoogleDataReceived = (data) => {
    setGoogleOrPhoneData(data); // ✅ Save email/name/mobile
  };

  const handleRegistrationComplete = () => {
    navigate("/profile");
  };

  return (
    <div className="signup-container d-flex justify-content-around">

      <div className="d-flex">
        <div>
          <div className="px-0 pt-4 pb-0 mt-3 mb-3">
            <form className="signup-form">
              <div className="login-page-leftpart-companynamecontainer d-flex justify-content-center align-items-center mb-3">
                <h2 className="login-page-leftpart-companyname" style={{ color: "#f15913" }}>
                  Fund For Bharat
                </h2>
              </div>

              <h4 style={{ color: "#f15913", fontWeight: "bold" }}>
                Your Details
              </h4>

              {step === 1 ? (
                <SignUpForm1
                  onContinue={handleContinue}
                  onGoogleDataReceived={handleGoogleDataReceived} // ✅ pass handler
                />
              ) : (
                <SignUpForm2
                  onContinue={handleRegistrationComplete}
                  selectedRole={"fundraiser2"}
                  googleData={googleOrPhoneData} // ✅ pass data
                />
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForms;
