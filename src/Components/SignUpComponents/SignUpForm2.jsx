import React, { useState, useEffect } from "react";
import { RiArrowRightSLine } from "react-icons/ri";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../../constants/constant.jsx";
import { IoEye, IoEyeOff } from "react-icons/io5";
import countryCodes from "../../CountriesData/CountryCodes.json";

const SignUpForm2 = ({ onContinue, selectedRole, googleData }) => {
  const [errors, setErrors] = useState({});
  const [Name, setName] = useState("");
  const [Disease, setDisease] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [city, setCity] = useState("");
  const [Age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [countryCode, setCountryCode] = useState("+91"); // 🔹 Default country code
  const [bloodGroup, setBloodGroup] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [patientStatus, setPatientStatus] = useState("");
  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isGoogleSignup = googleData?.verificationMethod === "google";

  useEffect(() => {
    if (googleData) {
      if (googleData.fullName) setName(googleData.fullName);
      if (googleData.email) setEmail(googleData.email);
      if (googleData.mobile) setMobile(googleData.mobile);
    }
  }, [googleData]);

  const validatePatientDetails = () => {
    const formErrors = {};
    if (!Name.trim()) formErrors.Name = "Please enter your name";

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      formErrors.email = "Please enter a valid email address";
    }

    if (!mobile.trim() || mobile.length < 10 || !/^\d+$/.test(mobile)) {
      formErrors.mobile = "Please enter a valid mobile number";
    }

    // if (!isGoogleSignup) {
    if (isGoogleSignup) {
      if (!password.trim()) {
        formErrors.password = "Password is required";
      } else {
        const passwordErrors = [];
        if (password.length < 8) passwordErrors.push("Password must be at least 8 characters long");
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) passwordErrors.push("Password must include at least one special character");
        if (passwordErrors.length > 0) {
          formErrors.password = passwordErrors.join(". ");
          // toast.error(passwordErrors[0]);
        }
      }
      if (conPassword !== password) {
        formErrors.conPassword = "Passwords do not match";
      }
    }

    if (selectedRole === "fundraiser") {
      if (!Disease.trim()) formErrors.Disease = "Please enter the disease name";
      if (!goalAmount.trim()) formErrors.goalAmount = "Please enter the goal amount";
      if (!patientStatus) formErrors.patientStatus = "Please select a patient status";
    }

    if (!city.trim()) formErrors.city = "Please enter the city name";
    if (!Age.trim() || isNaN(Age)) formErrors.Age = "Please enter a valid age";

    return formErrors;
  };

  const handleContinueClick = async (e) => {
    e.preventDefault();
    const formErrors = validatePatientDetails();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setErrors({});

    try {
      const userData = {
        fullname: Name,
        email: email,
        username: `${countryCode}${mobile}`, // 🔹 Combine country code with number
        password: password,
        address: city,
      };

      const response = await axios.post(`${BASE_URL}/auth/register`, userData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data) {
        if (response.data.token) localStorage.setItem("token", response.data.token);
        if (response.data.userId) localStorage.setItem("userId", response.data.userId);

        toast.success(
          isGoogleSignup
            ? "Google signup completed successfully!"
            : selectedRole === "fundraiser"
              ? `Patient details submitted successfully! with the Goal of ₹${goalAmount}`
              : `Details submitted successfully!`
        );
        onContinue();
      }
    } catch (error) {
      console.error("Registration error:", error);

      // Handle specific email already exists error
      if (error.response?.status === 400 || error.response?.status === 409) {
        const errorMessage = error.response?.data?.message || error.response?.data;

        // Check if error is related to email
        if (errorMessage && (
          errorMessage.toLowerCase().includes('email') &&
          (errorMessage.toLowerCase().includes('already') ||
            errorMessage.toLowerCase().includes('exists') ||
            errorMessage.toLowerCase().includes('taken'))
        )) {
          setErrors({ email: "This email is already registered. Please use a different email." });
          return;
        }

        // Check if error is related to username/mobile
        if (errorMessage && (
          errorMessage.toLowerCase().includes('username') ||
          errorMessage.toLowerCase().includes('mobile')
        )) {
          setErrors({ mobile: "This mobile number is already registered. Please use a different number." });
          return;
        }
      }

      // Generic error handling
      const errorMessage = error.response?.data?.message || error.response?.data || "Registration failed";
      // toast.error(errorMessage);
    }
  };

  return (
    <div className="signup-container2">
      <div className="signup-form">
        <form>
          {errors.Name && <p className="error-message">{errors.Name}</p>}
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Full Name"
              style={{
                height: "50px",
                backgroundColor: "rgba(0,0,0,0.6)",
                color: "#fff",
              }}
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {errors.Disease && <p className="error-message">{errors.Disease}</p>}
          {selectedRole === "fundraiser" && (
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Disease"
                style={{ height: "50px" }}
                value={Disease}
                onChange={(e) => setDisease(e.target.value)}
              />
            </div>
          )}

          {errors.goalAmount && <p className="error-message">{errors.goalAmount}</p>}
          {selectedRole === "fundraiser" && (
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Goal Amount"
                style={{ height: "50px" }}
                value={goalAmount}
                onChange={(e) => setGoalAmount(e.target.value)}
              />
            </div>
          )}

          {errors.city && <p className="error-message">{errors.city}</p>}
          <div className="d-flex gap-3 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="City Name"
              style={{ color: "#fff" }}
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Age"
              style={{ color: "#fff" }}
              value={Age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          {errors.email && <p className="error-message">{errors.email}</p>}
          <div className="input-group mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              style={{
                height: "50px",
                backgroundColor: "rgba(0,0,0,0.6)",
                color: "#fff",
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {errors.mobile && <p className="error-message">{errors.mobile}</p>}
          <div className="d-flex mb-3" style={{ gap: "10px" }}>
            {/* 🔹 Country Code Dropdown */}
            <select
              className="form-control"
              style={{
                width: "100px", height: "50px",
                backgroundColor: "rgba(0,0,0,0.6)",
                color: "#fff",
              }}
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
            >
              {countryCodes.map((country, idx) => (
                <option key={idx} value={country.dial_code}>
                  {country.code} {country.dial_code}
                </option>
              ))}
            </select>

            {/* 🔹 Phone Input */}
            <input
              type="text"
              className="form-control"
              placeholder="Mobile Number"
              style={{ color: "#fff", height: "50px" }}
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              readOnly={!!googleData?.mobile}
            />
          </div>

          {/* Password Field */}
          {/* 🔹 Password Fields Group */}
          <div className="password-fields">

            {/* Password */}
            {errors.password && <p className="error-message">{errors.password}</p>}
            <div className="password-input-wrapper" style={{ position: "relative", marginBottom: "15px" }}>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Password"
                style={{ height: "50px", paddingRight: "40px", color: "#fff" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer"
                }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoEyeOff size={20} color="#fff" /> : <IoEye size={20} color="#fff" />}
              </span>
            </div>

            {/* Confirm Password */}
            {errors.conPassword && <p className="error-message">{errors.conPassword}</p>}
            <div className="password-input-wrapper" style={{ position: "relative" }}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="form-control"
                placeholder="Confirm Password"
                style={{ height: "50px", paddingRight: "40px", color: "#fff" }}
                value={conPassword}
                onChange={(e) => setConPassword(e.target.value)}
              />
              <span
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer"
                }}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <IoEyeOff size={20} color="#fff" /> : <IoEye size={20} color="#fff" />}
              </span>
            </div>

          </div>

          {/* {errors.conPassword && <p className="error-message">{errors.conPassword}</p>} */}

          {selectedRole === "fundraiser" && (
            <>
              <h5>Is Patient?</h5>
              <div className="d-flex justify-content-center gap-4" style={{ fontSize: "16px" }}>
                {["Admitted", "Not Admitted", "Under Home Treatment"].map((status) => (
                  <div key={status} className="d-flex align-items-center gap-2">
                    <input
                      type="checkbox"
                      style={{ height: "20px", width: "20px" }}
                      checked={patientStatus === status}
                      onChange={() => setPatientStatus(status)}
                    />
                    <div>{status}</div>
                  </div>
                ))}
              </div>
              {errors.patientStatus && <p className="error-message">{errors.patientStatus}</p>}
            </>
          )}

          <div className="signup-form-continue-btn mt-2">
            <button type="submit" onClick={handleContinueClick}>
              Continue <RiArrowRightSLine size={25} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm2;
