import React, { useState } from "react";
import { IoMdMail } from "react-icons/io";
import { FaLink } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { MdOutlineFacebook } from "react-icons/md";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SubscribeCard = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, isSubmitted] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    const errors = {};
    
    // Check if email is empty or not valid
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email address";
      setErrors(errors); // Set errors if any
      return;
    }
    setErrors({});
    
    setTimeout(() => {
      toast.success(`Subscribed with email: ${email}!` ,{
        // position: toast.POSITION.TOP_CENTER,
        // autoClose: 3000,
      });
      isSubmitted(true);
      setErrors('');
      setEmail('');
    }, 500);
  };

  return (
    <div className="fundraiser-subscribe-card">
      <h4 style={{ fontWeight: "bold", marginBottom: "15px" }}>
        Share this article
      </h4>
      <div
        className="d-flex align-items-center gap-4"
        style={{ fontSize: "25px" }}
      >
        <IoMdMail />
        <FaLink />
        <FaLinkedin />
        <FaTwitter />
        <MdOutlineFacebook />
      </div>
      <h4 className="mt-5" style={{ fontWeight: "bold" }}>
        Subscribe
      </h4>
      <p>
        Don't miss out on weekly insights about all things fundraising and donor
        relations!
      </p>
      
      <div >
        <form  className="d-flex" onSubmit={handleSubscribe} >
          <input
            type="email"
            placeholder="Email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "10px",
              borderBottomLeftRadius: "5px",
              borderTopLeftRadius: "5px",
              border: "none",
              background: "#F6F9FC",
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              width: "100%",
              flexGrow: 1
            }}
          />
          <button
            type="submit"
            style={{
              borderBottomRightRadius: "5px",
              borderTopRightRadius: "5px",
              background: "#F15913",
              color: "#fff",
              border: "none",
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            }}
          >
            Subscribe
          </button>
        </form>
      </div>
      {errors.email && <p className="error-message" style={{color: 'red'}}>{errors.email}</p>}
    </div>
  );
};

export default SubscribeCard;
