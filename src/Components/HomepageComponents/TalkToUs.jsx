import React, { useState } from "react";
import axios from 'axios';
import "../../assets/styles/TalkToUs.css";
import { IoMdCall } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import { BASE_URL } from "../../constants/constant";

const TalkToUs = () => {
  const [errors, setErrors] = useState({});
  const [Name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [reason, setReason] = useState('');
  const [estimatedCost, setEstimatedCost] = useState('');
  const [language, setLanguage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateRequestForm = () => {
    const formErrors = {};
    if (!Name.trim()) {
      formErrors.Name = "Please enter your name";
    }
    if (!phoneNumber.trim() || phoneNumber.length !== 10 || !/^\d+$/.test(phoneNumber)) {
      formErrors.phoneNumber = "Please enter a valid 10-digit phone number";
    }
    if (!reason.trim()) {
      formErrors.reason = "Please enter a valid reason";
    }
    if (!estimatedCost.trim()) {
      formErrors.estimatedCost = "Please enter the estimated cost";
    }
    if (!language.trim()) {
      formErrors.language = "Please choose your preferred language";
    }
    return formErrors;
  };

  const handleCallBack = async (e) => {
    e.preventDefault();
    const formErrors = validateRequestForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      toast.error("Please enter all required details before submitting!");
      return;
    }

    setIsSubmitting(true);

    try {
      // Split name into first and last
      const nameParts = Name.trim().split(' ');
      const firstname = nameParts[0];
      const lastname = nameParts.slice(1).join(' ') || '';

      const formData = {
        firstname,
        lastname,
        number: phoneNumber,
        reason,
        estCost: estimatedCost,
        language,
        formType: "homepageform"
      };

      const response = await axios.post(`${BASE_URL}/api/forms/post`, formData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.data) {
        toast.success("Your request has been submitted successfully!");
        // Reset form fields
        setName('');
        setPhoneNumber('');
        setReason('');
        setEstimatedCost('');
        setLanguage('');
        closeModal();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      let errorMessage = "Failed to submit form. Please try again.";

      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        errorMessage = "No response from server. Please check your connection.";
      }

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    const modal = document.getElementById('searchModal');
    const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
    if (modalBackdrop) {
      modalBackdrop.remove();
    }
    document.body.classList.remove('modal-open');
  };

  return (
    <section className="callback-container">
      <div className="callback-content">
        <h3 style={{ color: "black" }}>Need help to setup your free fundraiser?</h3>
        <button
          id="callback-btn"
          className="btn"
          data-bs-toggle="modal"
          data-bs-target="#searchModal"
        >
          <IoMdCall size={25} /> Request a callback
        </button>
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
                onClick={closeModal}
              >
                <RxCross2 size={25} />
              </button>
            </div>
            <div className="modal-body">
              <h5 className="text-center">Fund for Bharat</h5>
              <p className="text-center">
                Fill in the details and our team will connect shortly
              </p>

              <form onSubmit={handleCallBack}>
                <div className="mb-3">
                  <label htmlFor="nameInput" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nameInput"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.Name && <p className="error-message">{errors.Name}</p>}
                </div>

                <div className="mb-3">
                  <label htmlFor="phoneInput" className="form-label">Phone No</label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    className="form-control"
                    id="phoneInput"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    maxLength="10"
                  />
                  {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}
                </div>

                <div className="mb-3">
                  <label htmlFor="reasonSelect" className="form-label">Reason for raising fund</label>
                  <select
                    className="form-select"
                    id="reasonSelect"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  >
                    <option value="">Select a reason</option>
                    <option value="Cancer treatment">Cancer treatment</option>
                    <option value="Liver transplant">Liver transplant</option>
                    <option value="Kidney transplant">Kidney transplant</option>
                    <option value="Cardiac surgery">Cardiac surgery</option>
                    <option value="Medications">Medications</option>
                    <option value="Education">Education</option>
                    <option value="Others">Others</option>
                  </select>
                  {errors.reason && <p className="error-message">{errors.reason}</p>}
                </div>

                <div className="mb-3">
                  <label htmlFor="costSelect" className="form-label">Estimated cost</label>
                  <select
                    className="form-select"
                    id="costSelect"
                    value={estimatedCost}
                    onChange={(e) => setEstimatedCost(e.target.value)}
                  >
                    <option value="">Select estimated cost</option>
                    <option value="Between 1 lakh and 5 lakhs">Between 1 lakh and 5 lakhs</option>
                    <option value="More than 5 lakhs">More than 5 lakhs</option>
                    <option value="More than 10 lakhs">More than 10 lakhs</option>
                    <option value="Others">Others</option>
                  </select>
                  {errors.estimatedCost && <p className="error-message">{errors.estimatedCost}</p>}
                </div>

                <div className="mb-3">
                  <label htmlFor="languageSelect" className="form-label">Preferred language</label>
                  <select
                    className="form-select"
                    id="languageSelect"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="">Select a language</option>
                    <option value="Hindi">Hindi</option>
                    <option value="English">English</option>
                    <option value="Punjabi">Punjabi</option>
                    <option value="Gujrati">Gujrati</option>
                    <option value="Marathi">Marathi</option>
                    <option value="Telugu">Telugu</option>
                    <option value="Bengali">Bengali</option>
                  </select>
                  {errors.language && <p className="error-message">{errors.language}</p>}
                </div>

                <button
                  type="submit"
                  className="btn"
                  id="form-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TalkToUs;


// import React, { useState } from "react";
// import "../../assets/styles/TalkToUs.css";
// import { IoMdCall } from "react-icons/io";
// import { RxCross2 } from "react-icons/rx";
// import { toast } from "react-toastify";

// const TalkToUs = () => {
//   const [errors, setErrors] = useState({});
//   const [Name, setName] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [reason, setReason] = useState('');
//   const [estimatedCost, setEstimatedCost] = useState('');
//   const [language, setLanguage] = useState('');

//   const validateRequestForm = () => {
//     // const errors = {};
//       const formErrors = {};
//       if (!Name.trim()) {
//         formErrors.Name = "Please enter your name";
//       }
//       if (!phoneNumber.trim() || phoneNumber.length !== 10 || !/^\d+$/.test(phoneNumber)) {
//         formErrors.phoneNumber = "Please enter a valid 10-digit phone number";
//       }
//       if (!reason.trim()) {
//         formErrors.reason = "Please enter a valid reason";
//       }
//       if (!estimatedCost.trim()) {
//         formErrors.estimatedCost = "Please enter the estimated cost";
//       }
//       if (!language.trim()) {
//         formErrors.language = "Please choose your preferred language";
//       }
//       return formErrors;
//   }

//   const handleCallBack = (e) => {
//     e.preventDefault(); 
//     const formErrors = validateRequestForm();
//     if (Object.keys(formErrors).length > 0) {
//       setErrors(formErrors); 
//       toast.error("Please enter all required details before submitting!");
//     } else {
//       setErrors({}); 
//       console.log("Form submitted successfully with Name:", Name);
//       setTimeout(() => {
//         toast.success(`Your request has been submitted successfully!`);
//         // Resetting the form fields after successful submission
//         setName('');
//         setPhoneNumber('');
//         setReason('');
//         setEstimatedCost('');
//         setLanguage('');
//         // Close modal manually if required
//         const modal = document.getElementById('searchModal');
//         const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
//         modal.classList.remove('show');
//         modal.style.display = 'none';
//         modalBackdrop.remove();
//         document.body.classList.remove('modal-open');
//       }, 300);
//     }
//   };

//   return (
//     <section className="callback-container">
//       <div className="callback-content" >
//         <h3       style={{color:"black"}} >Need help to setup your free fundraiser?</h3>
//         <button
//           id="callback-btn"
//           className="btn"
//           data-bs-toggle="modal"
//           data-bs-target="#searchModal"
//         >
//           <IoMdCall size={25} /> Request a callback
//         </button>
//       </div>
//       {/* Callback Modal */}
//       <div
//         className="modal fade"
//         id="searchModal"
//         tabIndex="-1"
//         aria-labelledby="searchModalLabel"
//         aria-hidden="true"
//         style={{ top: "140px", paddingBottom: "140px" }}
//       >
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <button
//                 type="button"
//                 className="btn"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               >
//                 <RxCross2 size={25} />
//               </button>
//             </div>
//             <div className="modal-body">
//               <h5 className="text-center">Fund for Bharat</h5>
//               <p className="text-center">
//                 Fill in the details and our team will connect shortly{" "}
//               </p>

//               <form  onSubmit={handleCallBack} >
//                 <div className="mb-3">
//                   <label
//                     htmlFor="exampleFormControlInput1"
//                     className="form-label"
//                   >
//                     Name
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="exampleFormControlInput1"
//                     value={Name}
//                     onChange={(e) => setName(e.target.value)}
//                   />
//                   {errors.Name && (<p className="error-message" >{errors.Name}</p>) }
//                 </div>
//                 <div className="mb-3">
//                   <label
//                     htmlFor="exampleFormControlInput1"
//                     className="form-label"
//                   >
//                     Phone No
//                   </label>
//                   <input
//                     type="tel"
//                     value={phoneNumber}
//                     className="form-control"
//                     id="exampleFormControlInput1"
//                     onChange={(e) => setPhoneNumber(e.target.value)}
//                   />
//                   {errors.phoneNumber && ( <p> {errors.phoneNumber} </p> ) }
//                 </div>
//                 <div className="mb-3">
//                   <label
//                     htmlFor="exampleFormControlInput1"
//                     className="form-label"
//                   >
//                     Reason for raising fund
//                   </label>
//                   <select className="form-select" id="inputGroupSelect01" value={reason} onChange={(e) => setReason(e.target.value)} >
//                     <option selected></option>
//                     <option value="1">Cancer treatment</option>
//                     <option value="2">Liver transplant</option>
//                     <option value="3">Kidney transplant</option>
//                     <option value="4">Cardiac surgery</option>
//                     <option value="5">Medications</option>
//                     <option value="6">Education</option>
//                     <option value="7">Others</option>
                    
//                   </select>
//                   {errors.reason && (<p>{errors.reason} </p>)}
//                 </div>
//                 <div className="mb-3">
//                   <label
//                     htmlFor="exampleFormControlInput1"
//                     className="form-label"
//                   >
//                     Estimated cost
//                   </label>
//                   <select className="form-select" id="inputGroupSelect01" value={estimatedCost} onChange={(e) => setEstimatedCose(e.target.value)} >
//                     <option selected></option>
//                     <option value="1">Between 1 lakh and 5 lakhs </option>
//                     <option value="2">More than 5 lakhs</option>
//                     <option value="3">More than 10 lakhs</option>
//                     <option value="4">Others</option>
//                   </select>
//                   {errors.estimatedCost && (<p>{errors.estimatedCost} </p>)}
//                 </div>
//                 <div className="mb-3">
//                   <label
//                     htmlFor="exampleFormControlInput1"
//                     className="form-label"
//                   >
//                     Preferred language
//                   </label>
//                   <select className="form-select" id="inputGroupSelect01" value={language} onChange={(e) => setLanguage(e.target.value)} >
//                     <option selected></option>
//                     <option value="1">Hindi</option>
//                     <option value="2">English</option>
//                     <option value="3">Punjabi</option>
//                     <option value="4">Gujrati</option>
//                     <option value="5">Marathi</option>
//                     <option value="6">Telugu</option>
//                     <option value="7">Bengali</option>
//                   </select>
//                   {errors.language && (<p>{errors.language} </p>)}
//                 </div>
//                 <button
//                   type="submit"
//                   className="btn"
//                   id="form-submit-btn"
//                   data-bs-toggle="modal"
//                   data-bs-target="#searchModal"
                  
//                 >
//                   Submit
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TalkToUs;
