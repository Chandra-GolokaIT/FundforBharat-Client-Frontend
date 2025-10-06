
import React, { useEffect, useState } from "react";
import "./style.css";
import { MdOutlineReplay } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaHeartbeat } from "react-icons/fa";
import { RiSecurePaymentFill } from "react-icons/ri";
import { FaHeadset } from "react-icons/fa";
import { BASE_URL } from "../../constants/constant";
import { toast } from "react-toastify";
import axios from "axios";

const FundraiseForModal = ({ cause }) => {
  const [selectedCause, setSelectedCause] = useState("");
  const [errors, setErrors] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [reason, setReason] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setSelectedCause(cause);
  }, [cause]);

  const validateForm = () => {
    const errors = {};
    if (!firstName.trim()) {
      errors.firstName = "Please Enter First Name";
    }
    if (!lastName.trim()) {
      errors.lastName = "Please Enter Last Name";
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!phoneNumber.trim() || phoneNumber.length !== 10 || !/^\d+$/.test(phoneNumber)) {
      errors.phoneNumber = "Mobile number should be exactly 10 digits";
    }
    if (!reason.trim()) {
      errors.reason = "Please add a reason";
    }
    return errors;
  };

  const handleAddFundraise = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      toast.error("Please fill all required fields correctly");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = {
        firstname: firstName,
        lastname: lastName,
        email: email,
        number: phoneNumber,
        reason: reason,
        formType: `fundraiseFor${selectedCause.replace(/\s+/g, '')}`, // Remove spaces from cause
        description: `Fundraising for ${selectedCause}: ${reason}` // Additional info
      };

      // // Option 1: Submit to your existing campaigns endpoint
      // const token = localStorage.getItem('token');
      // await axios.post(
      //   `${BASE_URL}/api/forms/post`,
      //   formData,
      //   {
      //     headers: {
      //       'Authorization': `Bearer ${token}`,
      //       'Content-Type': 'application/json',
      //     }
      //   }
      // );

      // Option 2: Also submit to your forms endpoint if needed
      await axios.post(
        `${BASE_URL}/api/forms/post`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      toast.success("Fundraiser request submitted successfully!");

      // Reset form
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhoneNumber("");
      setReason("");

    } catch (error) {
      console.error('Error submitting fundraiser:', error);
      const errorMessage = error.response?.data?.message ||
        "There was a problem submitting your fundraiser request.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container register">
      <div className="row">
        <div className="col-md-3 register-left">
          <FaHeartbeat id="heart-icon" />
          <h3 style={{ fontWeight: "bold" }}>Start your fundraiser</h3>
          <ul>
            <li><MdOutlineReplay /> Quick and easy setup</li>
            <li><FaUsers /> Reach a wide audience</li>
            <li><RiSecurePaymentFill /> Secure payment methods</li>
            <li><FaHeadset /> 24/7 Support</li>
          </ul>
        </div>
        <div className="col-md-9 register-right">
          <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="home" role="tabpanel">
              <h3 className="register-heading">Fundraise For {selectedCause}</h3>
              <div className="register-form">
                <form onSubmit={handleAddFundraise}>
                  <div className="">
                    <div className="form-group custom-select">
                      <select
                        className="form-control"
                        value={selectedCause}
                        onChange={(e) => setSelectedCause(e.target.value)}
                      >
                        <option className="hidden" value="" disabled>
                          Please select your Purpose of raising funds
                        </option>
                        <option value="Medical Treatment">Medical Treatment</option>
                        <option value="NGO & Charity">NGO / Charity</option>
                        <option value="Other Cause">Other Cause</option>
                      </select>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <div className="form-group" style={{ width: "100%" }}>
                        <input
                          type="text"
                          placeholder="First Name *"
                          value={firstName}
                          className="form-control"
                          style={{ width: "100%" }}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                        {errors.firstName && <p className="error-message">{errors.firstName}</p>}
                      </div>
                      <div className="form-group" style={{ width: "100%" }}>
                        <input
                          type="text"
                          placeholder="Last Name *"
                          value={lastName}
                          className="form-control"
                          style={{ width: "100%" }}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                        {errors.lastName && <p className="error-message">{errors.lastName}</p>}
                      </div>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Add a reason *"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                      />
                      {errors.reason && <p className="error-message">{errors.reason}</p>}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Your Email Address *"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {errors.email && <p className="error-message">{errors.email}</p>}
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        minLength={10}
                        maxLength={10}
                        value={phoneNumber}
                        className="form-control"
                        placeholder="Your Phone Number *"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                      {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}
                    </div>
                    <button
                      type="submit"
                      className="btnRegister"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Register"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundraiseForModal;
