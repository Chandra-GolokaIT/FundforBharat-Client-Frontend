import React, { useState } from "react";
import "../../assets/styles/StartFundaraiserSteps.css";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { ToastContainer, toast } from "react-toastify";

const StartFundraiserSteps = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);
  const [videoSrc, setVideoSrc] = useState(
    "https://d2aq6dqxahe4ka.cloudfront.net/themes/neumorphism/images/hiw/Step-1_Final-Comp_v4-1.mp4"
  );

  const handleStepClick = (step, src) => {
    setActiveStep(step);
    setVideoSrc(src);
  };

  const [errors, setErrors] = useState({});
  const [Name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [Reason, setReason] = useState('');
  const [EstimatedCost, setEstimatedCost] = useState('');
  const [language, setLanguage] = useState('');

  const validateRequestForm = () => {
    const formErrors = {};
    if (!Name.trim()) {
      formErrors.Name = "Please enter your name";
    }
    if (!phoneNumber.trim() || phoneNumber.length !== 10 || !/^\d+$/.test(phoneNumber)) {
      formErrors.phoneNumber = "Please enter a valid 10-digit phone number";
    }
    if (!Reason.trim()) {
      formErrors.Reason = "Please enter a valid reason";
    }
    if (!EstimatedCost.trim()) {
      formErrors.EstimatedCost = "Please enter the estimated cost";
    }
    if (!language.trim()) {
      formErrors.language = "Please choose your preferred language";
    }
    return formErrors;
  };

  const handleCallBack = (e) => {
    e.preventDefault(); 
    const formErrors = validateRequestForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors); 
      toast.error("Please enter all required details before submitting!");
    } else {
      setErrors({}); 
      console.log("Form submitted successfully with Name:", Name);
      setTimeout(() => {
        toast.success(`Your request has been submitted successfully!`);
        // Resetting the form fields after successful submission
        setName('');
        setPhoneNumber('');
        setReason('');
        setEstimatedCost('');
        setLanguage('');
        // Close modal manually if required
        const modal = document.getElementById('searchModal');
        const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
        modal.classList.remove('show');
        modal.style.display = 'none';
        modalBackdrop.remove();
        document.body.classList.remove('modal-open');
      }, 300);
    }
  };

  return (
    <>
      <div style={{ margin: "20px 0", padding: "50px 0", background: "#fafafa" }}>
        <div className="steps-container-buttons">
          <h5 className="text-center fs-4">
            Ready to make a difference? Let's get started on your fundraising journey!
          </h5>
          <div className="d-flex flex-wrap justify-content-center">
            <button type="button" onClick={() => navigate("/start-fundraiser")}>
              Start a free fundraiser
            </button>
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#searchModal"
            >
              Get a callback
            </button>
          </div>
        </div>
      </div>
      {/* Callback Modal */}
      <div
        className="modal fade"
        id="searchModal"
        tabIndex="-1"
        aria-labelledby="searchModalLabel"
        aria-hidden="true"
        style={{ top: "140px", paddingBottom: "140px" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <RxCross2 size={25} />
              </button>
            </div>
            <div className="modal-body">
              <h5 className="text-center">Fund for Bharat</h5>
              <p className="text-center">
                Fill in the details and our team will connect shortly{" "}
              </p>

              <form onSubmit={handleCallBack}>
                <div className="mb-3">
                  <label htmlFor="nameInput" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nameInput"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.Name && (<p className="error-message">{errors.Name}</p>)}
                </div>
                <div className="mb-3">
                  <label htmlFor="phoneInput" className="form-label">
                    Phone No
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phoneInput"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  {errors.phoneNumber && (<p className="error-message">{errors.phoneNumber}</p>)}
                </div>
                <div className="mb-3">
                  <label htmlFor="reasonInput" className="form-label">
                    Reason for raising fund
                  </label>
                  <select
                    className="form-select"
                    id="reasonInput"
                    value={Reason}
                    onChange={(e) => setReason(e.target.value)}
                  >
                    <option value=""></option>
                    <option value="Cancer treatment">Cancer treatment</option>
                    <option value="Liver transplant">Liver transplant</option>
                    <option value="Kidney transplant">Kidney transplant</option>
                    <option value="Cardiac surgery">Cardiac surgery</option>
                    <option value="Medications">Medications</option>
                    <option value="Education">Education</option>
                    <option value="Others">Others</option>
                  </select>
                  {errors.Reason && (<p className="error-message">{errors.Reason}</p>)}
                </div>
                <div className="mb-3">
                  <label htmlFor="estimatedCostInput" className="form-label">
                    Estimated cost
                  </label>
                  <select
                    className="form-select"
                    id="estimatedCostInput"
                    value={EstimatedCost}
                    onChange={(e) => setEstimatedCost(e.target.value)}
                  >
                    <option value=""></option>
                    <option value="Between 1 lakh and 5 lakhs">Between 1 lakh and 5 lakhs</option>
                    <option value="More than 5 lakhs">More than 5 lakhs</option>
                    <option value="More than 10 lakhs">More than 10 lakhs</option>
                    <option value="Others">Others</option>
                  </select>
                  {errors.EstimatedCost && (<p className="error-message">{errors.EstimatedCost}</p>)}
                </div>
                <div className="mb-3">
                  <label htmlFor="languageInput" className="form-label">
                    Preferred language
                  </label>
                  <select
                    className="form-select"
                    id="languageInput"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value=""></option>
                    <option value="Hindi">Hindi</option>
                    <option value="English">English</option>
                    <option value="Punjabi">Punjabi</option>
                    <option value="Gujrati">Gujrati</option>
                    <option value="Marathi">Marathi</option>
                    <option value="Telugu">Telugu</option>
                    <option value="Bengali">Bengali</option>
                  </select>
                  {errors.language && (<p className="error-message">{errors.language}</p>)}
                </div>
                <button type="submit" className="btn" id="form-submit-btn">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StartFundraiserSteps;
