import React, { useState } from "react";
import { FaFileImage } from "react-icons/fa";
import { IoReloadOutline } from "react-icons/io5";
import { RiArrowRightSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; 
import "./style.css";

const SignUpForm3 = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [documentsType, setDocumentsType] = useState('');
  const [files, setFiles] = useState('');

  const validateDocuments = () => {
    const formErrors = {};
    if (!documentsType) {
      formErrors.documentsType = "Please choose at least one type of document";
    }
    if (!files) {
      formErrors.files = "Please choose a document to upload";
    }
    return formErrors;
  };

  const handleSelectDocuments = (document) => {
    // setDocumentsType(e.target.value); 
    // if (documentsType.includes(document)) {
    //   setDocumentsType(documentsType.filter((doc) => doc !== document))  
    // }else{
    //   setDocumentsType([...documentsType,document])
    // }
    setDocumentsType(document);
  };


  const handleDocuments = (e) => {
    e.preventDefault();
    const formErrors = validateDocuments();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      toast.error("Please correct the errors!");
    } else {
      setErrors({});
      toast.success("Patient documents submitted successfully!");
      navigate("/login"); 
    }
  };

  return (
    <div>    
        <h5>Hospital Documents</h5>
        <p>Campaigns with documents raise funds 10X faster</p>
        <form onSubmit={handleDocuments}>
        <div className="radio-inputs d-flex justify-content-center gap-5">
          <div className="d-flex align-items-center gap-2">
            <input
              type="radio"
              name="documentsType"
              value="Estimation Letter"
              // checked={documentsType.includes("Estimation Letter")}
              checked={documentsType === "Estimation Letter"}
              onChange={() => handleSelectDocuments("Estimation letter")}
            />
            <div>Estimation Letter</div>
          </div>
          <div className="d-flex align-items-center gap-2">
            <input
              type="radio"
              name="documentsType"
              value="Medical Bills"
              checked={documentsType === "Medical Bills"}
              // checked={documentsType.includes("Medical Bills")}
              onChange={() => handleSelectDocuments("Medical Bills")}
            />
            <div>Medical Bills</div>
          </div>
          <div className="d-flex align-items-center gap-2">
            <input
              type="radio"
              name="documentsType"
              value="Reports"
              checked={documentsType === "Reports"}
              // checked={documentsType === "Reports"}
              onChange={() => handleSelectDocuments("Reports")}
            />
            <div>Reports</div>
          </div>
        </div>

        {errors.documentsType && <p className="error-message">{errors.documentsType}</p>}

        <div className="m-4 p-4" style={{ border: "1px solid grey" }}>
          <div style={{ color: "grey" }}>
            <FaFileImage />
            <p>Drag files to upload</p>
          </div>
          <label
            htmlFor="file-upload"
            className="custom-file-upload p-1 px-3"
            style={{
              color: "#f15913",
              border: "2px solid #f15913",
              borderRadius: "5px",
            }}
            // required
          >
            Choose File
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={(e) => setFiles(e.target.files[0])}
            style={{ display: "none" }}
          />
          {files && <p >{files.name}</p>}
        </div>

        {errors.files && <p className="error-message">{errors.files}</p>}

        <div className="d-flex justify-content-center align-items-center gap-3">
          <button
            type="button"
            style={{
              background: "none",
              color: "#f15913",
              border: "2px solid #f15913",
              width: "100%",
              borderRadius: "5px",
              height: "40px",
              fontWeight: "bold",
              fontSize: "20px",
            }}
            onClick={() => navigate("/login")}
            className="d-flex justify-content-center align-items-center"
          >
            Skip <IoReloadOutline size={20} />
          </button>

          <button
            type="submit"
            style={{
              background: "#f15913",
              color: "#fff",
              border: "2px solid #f15913",
              width: "100%",
              borderRadius: "5px",
              height: "40px",
              fontWeight: "bold",
              fontSize: "20px",
              
            }}
            
          >
            Finish <RiArrowRightSLine size={25} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm3;
