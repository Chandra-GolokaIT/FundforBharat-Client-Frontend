import React, { useState } from "react";
import { FaFileImage } from "react-icons/fa";
import { IoReloadOutline } from "react-icons/io5";
import { RiArrowRightSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import "./style.css";

const SignUpForm0 = ({ onContinue, selectedRole, setSelectedRole }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [documentsType, setDocumentsType] = useState('');
  const [files, setFiles] = useState('');
  const [showModal, setShowModal] = useState(true);


  const handleSubmit = (e) => {
    e.preventDefault();
    onContinue();
  }
  return (
    <div className="signup-cause d-flex flex-column align-items-center justify-content-between mb-3">
      <h6> Select a preferred signup role :</h6>
      <div className="d-flex flex-column align-items-center gap-3 mt-4">
        <input type="hidden" name="role" value={selectedRole} />

        <button
          type="button"
          onClick={() => { setSelectedRole("donor"); onContinue(selectedRole); }}
          className={`d-flex justify-content-center align-items-center gap-2 w-100 ${selectedRole === "donor" ? "active-btn" : ""
            }`}
          style={{
            background: selectedRole === "donor" ? "#f15913" : "none",
            color: selectedRole === "donor" ? "#fff" : "#f15913",
            border: "2px solid #f15913",
            borderRadius: "5px",
            height: "45px",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          Sign Up as Donor <RiArrowRightSLine size={22} />
        </button>

        {/* <button
          type="button"
          onClick={() => { setSelectedRole("fundraiser"); onContinue(selectedRole); }}
          className={`d-flex justify-content-center align-items-center gap-2 w-100 ${selectedRole === "fundraiser" ? "active-btn" : ""
            }`}
          style={{
            background: selectedRole === "fundraiser" ? "#f15913" : "none",
            color: selectedRole === "fundraiser" ? "#fff" : "#f15913",
            border: "2px solid #f15913",
            borderRadius: "5px",
            height: "45px",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          Sign Up as Fundraiser <RiArrowRightSLine size={22} />
        </button> */}
      </div>
    </div>
  );
};

export default SignUpForm0;
