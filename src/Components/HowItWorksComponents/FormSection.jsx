import React, { useState } from "react";
import "./style.css";
import img from "../../assets/images/aboutbg.png";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { FaBold, FaPhoneAlt } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { LiaDonateSolid } from "react-icons/lia";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ContryCode from '../../CountriesData/CountryCodes.json';
import { BASE_URL } from "../../constants/constant";
import axios from "axios";

const FormSection = () => {
  const [selectedCountryCode, setSelectedCountryCode] = useState("91");
  const [errors, setErrors] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateDetails = () => {
    const formErrors = {};
    if (!firstName.trim()) {
      formErrors.firstName = "Please enter your first name";
    }
    if (!lastName.trim()) {
      formErrors.lastName = "Please enter your last name";
    }
    if (!phoneNumber.trim() || !/^\d+$/.test(phoneNumber)) {
      formErrors.phoneNumber = "Please enter a valid phone number";
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = "Please enter a valid email address";
    }
    if (!reason.trim()) {
      formErrors.reason = "Please enter what the funds will be used for";
    }
    return formErrors;
  }

  const handleSubmit = async (e, contactMethod) => {
    e.preventDefault();
    const formErrors = validateDetails();

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
        number: `${selectedCountryCode}${phoneNumber}`,
        reason: reason,
        formType: "howItWorksForm",
        description: `Funds will be used for: ${reason}`,
        contactMethod: contactMethod
      };

      // Submit to your forms endpoint
      await axios.post(
        `${BASE_URL}/api/forms/post`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      // Also submit to your contact endpoint if needed
      // await axios.post(
      //   `${BASE_URL}/api/contact/create-request`,
      //   formData,
      //   {
      //     headers: {
      //       'Content-Type': 'application/json',
      //     }
      //   }
      // );

      // Reset form
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhoneNumber('');
      setReason('');

      if (contactMethod === 'call') {
        toast.success(`Our agent will call you shortly at ${selectedCountryCode}${phoneNumber}`);
        navigate('/howitworks');
      }

    } catch (error) {
      console.error('Error submitting form:', error);
      const errorMessage = error.response?.data?.message ||
        "There was a problem submitting your request. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // const handleWhatsAppConnect = async (e) => {
  //   await handleSubmit(e, 'whatsapp');

  //   // Open WhatsApp after successful submission
  //   const prefilledMessage = `Hello! My name is ${firstName} ${lastName}. I'm contacting you regarding fundraising for: ${reason}. My email is ${email} and my phone number is ${selectedCountryCode}${phoneNumber}.`;
  //   const encodedMessage = encodeURIComponent(prefilledMessage);
  //   const whatsappUrl = `https://wa.me/${selectedCountryCode}${phoneNumber}?text=${encodedMessage}`;
  //   window.open(whatsappUrl, "_blank");
  // };

  const findCountryByCode = (code) => {
    return ContryCode.find((country) => country.dial_code === code);
  };

  const handleCountryCodeSelect = (code) => {
    const country = findCountryByCode(code);
    if (country) {
      setSelectedCountryCode(country.dial_code);
    }
  };

  return (
    <div className="form-section-hiw">
      <ToastContainer />
      <h3>Begin Your Fundraising Journey in Minutes!</h3>
      <div className="d-flex justify-content-center align-items-start gap-5">
        <div>
          <img src={img} width={"500px"} height={"300px"} className="mb-4" />
          <div
            className="strip d-flex justify-content-center align-items-center gap-5"
            style={{
              width: "100%",
              padding: "20px",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              background: "#fff",
              borderRadius: "10px",
            }}
          >
            <div>
              <h4 style={{ color: "#d54400", fontWeight: "bold" }}>72 Lakh+</h4>{" "}
              <p style={{ color: "grey" }}>DONORS</p>
            </div>
            <div>
              <h4 style={{ color: "#d54400", fontWeight: "bold" }}>
                3.2 Lakh+
              </h4>{" "}
              <p style={{ color: "grey" }}>FUNDRAISERS</p>
            </div>
            <div>
              <h4 style={{ color: "#d54400", fontWeight: "bold" }}>0%</h4>{" "}
              <p style={{ color: "grey" }}>PLATFORM FEE</p>
            </div>
          </div>
        </div>

        <div>
          <form className="donate-now_modal_body_form-container">
            <h5 style={{ fontWeight: "bold" }}>
              We know you are in urgent need of funds.
            </h5>
            <p>Instant Fundraising Assistance</p>

            {/* Split name into first and last name */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <div className="input-data" style={{ flex: 1 }}>
                <input
                  type="text"
                  placeholder="First Name *"
                  value={firstName}
                  style={{ fontWeight: "bold" }}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && <p className="error-message">{errors.firstName}</p>}
                <div className="form-input-icon">
                  <IoMdPerson />
                </div>
              </div>
              <div className="input-data" style={{ flex: 1 }}>
                <input
                  type="text"
                  placeholder="Last Name *"
                  value={lastName}
                  style={{ fontWeight: "bold" }}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && <p className="error-message">{errors.lastName}</p>}
              </div>
            </div>

            <div className="input-data">
              <input
                type="email"
                placeholder="Email ID *"
                value={email}
                style={{ fontWeight: "bold" }}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
              <div className="form-input-icon">
                <MdOutlineMailOutline />
              </div>
            </div>

            <div className="input-group" style={{ padding: "0", display: "flex" }}>
              <div className="no-input d-flex align-items-end w-100">
                <div className="dropdown">
                  <button
                    className="btn dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{
                      borderBottom: "2px solid silver",
                      borderRadius: "0px",
                    }}
                  >
                    {selectedCountryCode}
                  </button>
                  <ul className="dropdown-menu scrollable-dropdown">
                    {ContryCode.map((country) => (
                      <li key={country.dial_code}>
                        <a
                          className="dropdown-item"
                          onClick={() => handleCountryCodeSelect(country.dial_code)}
                        >
                          {country.code} {country.dial_code}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="input-data">
                  <input
                    type="text"
                    placeholder="Your Mobile Number *"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    style={{ width: "100%", paddingRight: "55px", fontWeight: "bold" }}
                    maxLength="15"
                  />
                  {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}
                  <div className="form-input-icon">
                    <FaPhoneAlt />
                  </div>
                </div>
              </div>
            </div>

            <div className="input-data">
              <input
                type="text"
                placeholder="What will be the funds used for? *"
                value={reason}
                style={{ fontWeight: "bold" }}
                onChange={(e) => setReason(e.target.value)}
              />
              {errors.reason && <p className="error-message">{errors.reason}</p>}
              <div className="form-input-icon">
                <LiaDonateSolid />
              </div>
            </div>

            <span style={{ fontSize: "12px", color: "green", fontWeight: "bold" }} className="my-2">
              102 People started a fundraiser in last 2 days
            </span>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                style={{
                  border: "2px solid #d54400",
                  color: "#d54400",
                  background: "none",
                  padding: "10px",
                  borderRadius: "5px",
                  fontWeight: "bold",
                  flex: 1
                }}
                onClick={(e) => handleSubmit(e, 'call')}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'PROCESSING...' : 'GET A CALL'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormSection;

