import React, { useState } from "react";
import { toast } from "react-toastify";
import img from "../../assets/images/redCross.png";
import "./style.css";
import countryCodes from "../../CountriesData/CountryCodes.json";
import { Link, useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import axios from "axios";
import { BASE_URL } from "../../constants/constant";
import { GoogleLogin } from '@react-oauth/google';

function LoginSection() {
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91");
  const [show, setShow] = useState(false);

  const validateForm = async () => {
    const newErrors = {};

    // Email Validation
    if (!Email.trim() || !/@/.test(Email)) {
      newErrors.Email = "Please enter a valid email";
    }

    // Password Validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    } else if (!/[!@#$%^&*]/.test(password)) {
      newErrors.password =
        "Password must contain at least one special character";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the errors before proceeding.");
      return newErrors;
    }

    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email: Email,
        password: password,
      });

      // Save token in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("fullName", response.data.fullname);
      localStorage.setItem("imageUrl", response.data.profilePictureUrl);
      toast.success("Login successful!");

      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-page-leftpart">
        <div className="login-page-leftpart-companynamecontainer">
          <img
            src={img}
            style={{ 
             width: "30px", height: "30px", borderRadius: "50%", marginRight: "10px"
             }}
            alt="Company Logo"
          />
          <h2 className="login-page-leftpart-companyname">Fund For Bharat</h2>
        </div>
        <p className="login-page-leftpart-company_imaginarythinking">
          India's #1 Crowdfunding Platform
        </p>
        <h2 className="login-page-leftpart-login_heading">Sign In</h2>
        <span
          className="login-page-leftpart-agreement text-center"
          style={{ fontSize: "20px" }}
        >
          Didn’t have an account? <br />
          <Link to="/signup" style={{ color: "green" }}>
            Sign Up
          </Link>
        </span>

        {/* Email Input */}
        {errors.Email && <p className="error-message">{errors.Email}</p>}
        <label className="custom-field two">
          <input
            type="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            // style={{color:"#fff"}}
            placeholder=" "
            required
          />
          <span className="placeholders">Enter Email</span>
        </label>

        {/* Password Input */}
        {errors.password && <p className="error-message">{errors.password}</p>}
        <div className="password-field">
          <label className="custom-field three">
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              // style={{color:"#fff"}}
              placeholder=" "
              required
            />
            <span className="placeholders">Enter Password</span>
          </label>
          <span className="eye-symbol" onClick={() => setShow(!show)}>
            {show ? <IoEyeOff size={20} /> : <IoEye size={20} />}
          </span>
        </div>

        <button
          type="submit"
          className="login-page-leftpart-getotpbtn"
          onClick={validateForm}
        >
          Login
        </button>

        <div className="login-page-leftpart-OR-container">
          <h5 className="login-page-leftpart-OR">OR</h5>
          <div></div>
        </div>

        <div className="login-page-leftpart-otherloginoptions-container">

            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                const idToken = credentialResponse.credential;
                const res = await axios.post(`${BASE_URL}/auth/google`, { idToken });

                localStorage.setItem("token", res.data.token);
                localStorage.setItem("userId", res.data.userId);
                localStorage.setItem("fullName", res.data.fullname);
                localStorage.setItem("imageUrl", res.data.profilePictureUrl);
                toast.success("Login successful via Google!");
                navigate("/");
              }}
              onError={() => toast.error("Google login failed")}
            />

        </div>
      </div>

      <div className="login-page-imagecontainer">
      </div>
    </div>
  );
}

export default LoginSection;
