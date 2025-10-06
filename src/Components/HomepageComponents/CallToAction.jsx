import React, { useEffect, useState } from "react";
import "../../assets/styles/CallToAction.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


function CallToAction({ subscribeRef }) {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, isSubmitted] = useState(false);

  const navigate = useNavigate();

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
      toast.success(`Subscribed with email: ${email}!`, {
        // position: toast.POSITION.TOP_CENTER,
        // autoClose: 3000,
      });
      isSubmitted(true);
      setErrors('');
      setEmail('');
    }, 500);
  };

  // useEffect(() => {
  //   const container = document.querySelector('.calltoactioncontainer');
  //   if (container) container.scrollLeft = 0;
  // }, []);

  const handleFundraiser = () => {
    navigate('/campaign');
  }

  const handleSupportor = () => {
    navigate('/campaign');
  }



  return (
    <div ref={subscribeRef} className="calltoactioncontainer d-flex justify-content-center gap-5 text-light mx-2 flex-wrap"
      style={{ paddingBottom: "50px" }} >
      <div
        className="d-flex flex-column justify-content-center align-items-center px-4 py-5 calltoactionbox"
        style={{
          boxSizing: "border-box",
          backgroundColor: "#1B8271",
          borderRadius: "7px",
        }}
      >
        <h2 className="text-bold">Newsletter</h2>
        <p className="text-center px-2">
          Sign up for our monthly newsletter to get the latest news, volunteer
          opportunities.
        </p>
        <input

          placeholder="Enter your email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          // ref={subscribeRef}
          className=" bg-transparent calltoactioninput"
        />
        {errors.email && <p className="error-message" style={{ color: 'red' }}>{errors.email}</p>}
        <button
          type="button"
          className="calltoactionbutton"
          style={{ width: "100%", backgroundColor: "#d54400" }}
          onClick={handleSubscribe}
        >
          Subscribe Now
        </button>
      </div>
      <div
        className="d-flex flex-column justify-content-center align-items-center p-4 calltoactionbox"
        style={{
          boxSizing: "border-box",
          backgroundColor: "#d54400",
          color: "white",
          borderRadius: "7px",
        }}
      >
        <img
          src="/images/heart.png"
          style={{ height: "70px", width: "80px", marginBottom: "10px" }}
        />
        <h3 className="text-bold">Want To Help?</h3>
        <p className="text-center px-2">
          Your financial support is very important for our global projects.
        </p>
        <button
          type="button"
          className="calltoactionbutton"
          style={{ backgroundColor: "#1B8271" }}
          onClick={handleFundraiser}
        >
          Online Fundraiser
        </button>
      </div>
      <div
        className="d-flex flex-column justify-content-center align-items-center p-4 calltoactionbox"
        style={{
          boxSizing: "border-box",
          backgroundColor: "#1B8271",
          borderRadius: "7px",
        }}
      >
        <h1 className="text-bold" style={{ fontSize: "50px" }}>
          33,986+
        </h1>
        <p className="text-center px-4">
          Our campaign is powered by contributions from supporters like you
        </p>
        <button
          type="button"
          className="calltoactionbutton"
          style={{ backgroundColor: "#d54400" }}
          onClick={handleSupportor}
        >
          Supporter
        </button>
      </div>
    </div>
  );
}

export default CallToAction;
