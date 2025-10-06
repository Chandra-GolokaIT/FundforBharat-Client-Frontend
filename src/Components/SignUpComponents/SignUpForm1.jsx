import React, { useState, useEffect } from "react";
import "./style.css";
import { RiArrowRightSLine } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import countryCodes from '../../CountriesData/CountryCodes.json';
import axios from "axios";
import { BASE_URL } from "../../constants/constant";
import { toast } from "react-toastify";
import { GoogleLogin } from '@react-oauth/google';

const SignUpForm1 = ({ onContinue, onGoogleDataReceived }) => {
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91");
  const [mobileNumber, setMobileNumber] = useState("");
  const [signupMethod, setSignupMethod] = useState("phone");

  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [timer, setTimer] = useState(60);

  const [validationErrors, setValidationErrors] = useState({});

  const handleMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
    setValidationErrors((prev) => ({ ...prev, mobileNumber: "" }));
  };

  const handleCountryCodeSelect = (code) => {
    const country = countryCodes.find((c) => c.dial_code === code);
    if (country) setSelectedCountryCode(country.dial_code);
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setOtp(value);
    setValidationErrors(prev => ({ ...prev, otp: "" }));
  };

  const sendOtp = async () => {
    if (!validateMobileNumber()) return;

    try {
      const response = await axios.post(`${BASE_URL}/api/otp/send`, {
        phone: `${selectedCountryCode}${mobileNumber}`
      });

      if (response.data.success) {
        toast.success("OTP sent successfully!");
        setShowOtpField(true);
        setIsOtpSent(true);
        setTimer(60);
      } else {
        toast.error(response.data.message || "Failed to send OTP");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Error sending OTP";
      toast.error(errorMsg);
    }
  };

  const resendOtp = async () => {
    if (timer <= 0) await sendOtp();
  };

  const verifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setValidationErrors(prev => ({ ...prev, otp: "Please enter a valid 6-digit OTP" }));
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/otp/verify`, {
        phone: `${selectedCountryCode}${mobileNumber}`,
        otp: otp
      });

      if (response.data.success) {
        toast.success("OTP verified successfully!");
        onGoogleDataReceived({
          mobile: mobileNumber,
          verificationMethod: "phone"
        });
        onContinue();
      } else {
        toast.error(response.data.message || "Invalid OTP");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Verification failed";
      toast.error(errorMsg);
    }
  };

  const handleContinueClick2 = async (e) => {
    e.preventDefault();
    if (signupMethod === "phone") {
      if (!showOtpField) {
        await sendOtp();
      } else {
        await verifyOtp();
      }
    }
  };

  useEffect(() => {
    let interval;
    if (isOtpSent && timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isOtpSent, timer]);

  const validateMobileNumber = () => {
    if (!mobileNumber.trim()) {
      setValidationErrors(prev => ({ ...prev, mobileNumber: "Mobile number is required" }));
      return false;
    }
    if (mobileNumber.length !== 10 || !/^\d+$/.test(mobileNumber)) {
      setValidationErrors(prev => ({ ...prev, mobileNumber: "Please enter a valid 10-digit Mobile Number" }));
      return false;
    }
    return true;
  };

  // ✅ Google Login success handler
  const handleGoogleSuccess = async (credentialResponse) => {
    const idToken = credentialResponse.credential;

    try {
      const response = await axios.post(`${BASE_URL}/auth/google/verify`, {
        idToken
      });

      if (response.data) {
        toast.success("Google login successful!");
        onGoogleDataReceived({
          email: response.data.email,
          fullName: response.data.fullName,
          idToken: idToken,
          verificationMethod: "google"
        });
        onContinue();
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Google login failed";
      toast.error(errorMsg);
    }
  };

  return (
    <div>
      {/* Signup Method Tabs */}
      <div className="signup-method-selection mb-4">
        <div className="d-flex gap-3 mb-3">
          <button
            type="button"
            className={`btn ${signupMethod === "phone" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setSignupMethod("phone")}
            style={{ flex: 1, height: "45px" }}
          >
            Phone Number
          </button>
          <button
            type="button"
            className={`btn ${signupMethod === "google" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setSignupMethod("google")}
            style={{ flex: 1, height: "45px" }}
          >
            <FcGoogle size={20} className="me-2" />
            Google
          </button>
        </div>
      </div>

      {/* Phone Signup Form */}
      {signupMethod === "phone" && (
        <>
          <div className="mb-3 d-flex align-items-center">
            <select
              value={selectedCountryCode}
              onChange={(e) => handleCountryCodeSelect(e.target.value)}
              style={{
                width: "160px",
                fontSize: "14px",
                padding: "6px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                marginRight: "8px",
                height: "40px"
              }}
            >
              {countryCodes.map((country) => (
                <option key={country.code} value={country.dial_code}>
                  {country.name} ({country.dial_code})
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Mobile number"
              value={mobileNumber}
              onChange={handleMobileNumberChange}
              style={{
                flex: 1,
                fontSize: "14px",
                padding: "8px",
                marginTop: "15px",
                borderRadius: "4px",
                border: validationErrors.mobileNumber ? "1px solid red" : "1px solid #ccc",
                height: "40px"
              }}
            />
          </div>

          {validationErrors.mobileNumber && (
            <div className="text-danger small mt-1">{validationErrors.mobileNumber}</div>
          )}

          {showOtpField && (
            <div className="otp-container mb-3">
              <label htmlFor="otp">Enter OTP</label>
              <div className="d-flex align-items-center">
                <input
                  type="text"
                  id="otp"
                  className="form-control"
                  placeholder="Enter 6 digit OTP"
                  value={otp}
                  onChange={handleOtpChange}
                  maxLength={6}
                  style={{
                    borderRadius: "5px",
                    border: validationErrors.otp ? "2px solid red" : "2px solid lightGrey",
                    height: "50px",
                    width: "200px",
                    marginRight: "10px"
                  }}
                />
                {timer > 0 ? (
                  <span className="text-muted">Resend in {timer}s</span>
                ) : (
                  <button onClick={resendOtp} className="btn btn-link" style={{ padding: 0 }}>
                    Resend OTP
                  </button>
                )}
              </div>
              {validationErrors.otp && (
                <div className="text-danger small mt-1">{validationErrors.otp}</div>
              )}
            </div>
          )}

          <span style={{ color: "white" }}>
            By logging in, you accept our Terms and Conditions
          </span>
          <div className="signup-form-continue-btn">
            <button onClick={handleContinueClick2}>
              Continue <RiArrowRightSLine size={25} />
            </button>
          </div>
        </>
      )}

      {/* Google Signup Form */}
      {signupMethod === "google" && (
        <div className="google-signup-container">
          <div className="text-center mb-4">
            <p style={{ color: "white" }}>
              Sign up with your Google account for quick registration
            </p>
          </div>

          <div className="d-flex justify-content-center mb-3">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => toast.error("Google Login Failed")}
            />
          </div>

          <span style={{ color: "white", fontSize: "14px" }}>
            By continuing with Google, you accept our Terms and Conditions
          </span>
        </div>
      )}
    </div>
  );
};

export default SignUpForm1;
