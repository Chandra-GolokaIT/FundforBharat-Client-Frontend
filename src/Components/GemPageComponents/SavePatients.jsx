import React, { useState } from "react";
import img from "../../assets/images/scpi-img.webp";
import logo1 from "../../assets/images/Artboard–2.png";
import logo2 from "../../assets/images/Artboard–3.png";
import logo3 from "../../assets/images/Artboard–4.png";
import { FaHandHoldingUsd } from "react-icons/fa";
import DonationForm from "./DonationForm"; // Import the DonationForm component

const SavePatients = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="save-patient d-flex align-items-center justify-content-center gap-5 p-5">
      <div className="save-patient-content">
        <h1>
          Save Critical Patients In India With{" "}
          <span style={{ color: "#dd591c" }}>
            <i>Life Patron</i>
          </span>{" "}
          Subscription  
        </h1>
        <p className="my-3">
          GEM, a monthly donation subscription, provides urgent financial help
          to lakhs of patients who wouldn't have access to life-saving treatment
          otherwise.
        </p>
        <h5 className="my-3" style={{ color: "#dd591c", fontWeight: "bold" }}>
          Give Every Month to:
        </h5>
        <div className="my-2">
          <img src={logo1} alt="Timely treatment" />
          Provide timely treatment to critical patients in India.
        </div>
        <div className="my-2">
          <img src={logo2} alt="Financial help" />
          Save them from life-long financial debts.
        </div>
        <div className="my-2">
          <img src={logo3} alt="Support lives" /> Support a minimum of 12 lives each year!
        </div>
        <h3 
          className="d-flex gap-2 align-items-center justify-content-center" 
          style={{
            border: "solid green 2px",
            borderRadius: "15px",
            width: "40%",
            backgroundColor: "#147a56", 
            color: "white",
            padding: "10px",
            cursor: "pointer"
          }}
          onClick={() => setShowForm(true)}
        >
          <FaHandHoldingUsd size={25} /> Give every month
        </h3>
      </div>
      <div className="save-patient-img">
        <img src={img} className="save-patient-img" alt="Patients in need" />
      </div>

      {/* Donation Form Modal */}
      {showForm && <DonationForm onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default SavePatients;