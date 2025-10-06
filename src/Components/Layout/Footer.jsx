import React, { useState } from "react";
// import img from "../../assets/images/footer-img.png";
import img from "../../assets/images/footer_custom_image.png";

import {
  FaWhatsapp,
  FaInstagram,
  FaLinkedinIn,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Footer = () => {
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState("");

  const validate = () => {
    const errors = {}

    if (!message.trim()) {
      errors.message = "please enter a message to send";
    }
    return errors;

  };

  const sendMessage = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }


    toast.success('Message sent successfully!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setMessage("");
    setErrors({});
  }

  return (
    <footer>
      <div className="footer" style={{
        // backgroundImage: 'url("https://wordpress.themeholy.com/donat/wp-content/uploads/2024/09/footer-default-bg-mask-2.png")',
        backgroundImage: `url(${img})`
        // padding: "100px 0"
      }}>
        <Link className="navbar-brand px-5 footer-logo logo-section" to="/">
          <img src="/images/Peet2.png" alt="logo" height="180px" />
        </Link>
        <div className="quick-links quick-links-section">
          <h6>Quick Links</h6>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0" id="footer-links">
            <li className="nav-item nav-item-mobile">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item nav-item-mobile">
              <Link className="nav-link" aria-current="page" to="/about">
                About Us
              </Link>
            </li>
            <li className="nav-item nav-item-mobile">
              <Link className="nav-link" to="/careers">
                Careers
              </Link>
            </li>
            <li className="nav-item nav-item-mobile">
              <Link className="nav-link" to="/campaign">
                Campaign
              </Link>
            </li>
            <li className="nav-item nav-item-mobile">
              <Link className="nav-link" to="/contact">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="office-address">
          <h6>Office Address</h6>
          <address>
            Goregoan Mumbai 400065 Maharastra
          </address>

          <br />
          <br />
          <div className="footer-button">
            <div className="social-icons">
              <span>
                <b>Find us on</b>{" "}
              </span>

              <span className="social-links">
                <a href="#" className="link">
                  <FaWhatsapp />
                </a>
                <a href="#" className="link">
                  <FaFacebookF />
                </a>
                <a href="#" className="link">
                  <FaInstagram />
                </a>
                <a href="#" className="link">
                  <FaLinkedinIn />
                </a>
                <a href="#" className="link">
                  <FaTwitter />
                </a>
              </span>
            </div>
          </div>
        </div>

        <div className="contact-details">
          <h6 className="contact-us">Contact Us</h6>
          <address>
            <h6 className="mb-4">For any queries</h6>
            <p>Email: info@gmail.com </p>
            <p>Contact No: +91 9876543210</p>
          </address>
          <div>
            {errors.message && <p style={{
              color: "red",
              //  textAlign: "left",
              //  fontSize: 15,
              //  margin: 0,
              //   padding: 0
            }} >{errors.message}</p>}

          </div>
        </div>
      </div>
      <div className="footer-info">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms & Conditions </a>
        <a href="#">© 2024 Fund for Bharat. All rights reserved. </a>
      </div>
      <ToastContainer />
    </footer>
  );
};

export default Footer;
