import React from "react";
import "./style.css";
import { FaUserTie } from "react-icons/fa";
import { HiAdjustmentsVertical } from "react-icons/hi2";
import { TbHeartRateMonitor } from "react-icons/tb";
import { PiHandWithdrawLight } from "react-icons/pi";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { FaHeadset } from "react-icons/fa";
import { FaMobileScreen } from "react-icons/fa6";
import img from "../../assets/images/money-donation.webp";
import { useNavigate } from "react-router-dom";

const WhyChooseUs = () => {
  const navigate = useNavigate();
  const handleFundRaiser = () => {
    navigate('/start-fundraiser')
  }

  return (
    <div className="pricing-whychooseus">
      <h1>Why Choose Fund For Bharat?</h1>
      <div className="pricing-cards d-flex justify-content-center align-items-center gap-3 ">
        {/* <div className="pricing-image">
          <img src={img} alt="img" />
          <button
          onClick={handleFundRaiser} 
          >Start a Fundraiser</button>
        </div> */}
        <div className="card-grid d-flex justify-content-center align-items-center gap-3 flex-wrap">
          <div className="card">
            <div className="card-header">
              {" "}
              <FaUserTie className="pricing-icon" /> Dedicated Relationship
              Manager
            </div>
            <div className="card-body">
              Enjoy personalized support from our dedicated relationship
              managers who will assist you at every step of your fundraising
              journey.
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <HiAdjustmentsVertical className="pricing-icon" /> Easy Setup
            </div>
            <div className="card-body">
              Launch your fundraiser in just 3 simple steps. Our intuitive
              platform makes it easy to get started.
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <TbHeartRateMonitor className="pricing-icon" /> Smart Dashboard
            </div>
            <div className="card-body">
              Keep track of all your fundraising activities with our interactive
              dashboard. Manage withdrawals, donations, receipts, and more
              efficiently.
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <PiHandWithdrawLight className="pricing-icon" /> Hassle-Free
              Withdrawals
            </div>
            <div className="card-body">
              With our secure process, withdrawing funds is simple and safe.
              Provide the necessary documents and access your funds quickly.
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <AiOutlineSafetyCertificate className="pricing-icon" /> Top-Notch
              Security
            </div>
            <div className="card-body">
              Your funds are protected with the highest level of encryption and
              security measures. Fundraise with peace of mind.
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <FaHeadset className="pricing-icon" /> 24/7 Expert Support
            </div>
            <div className="card-body">
              Our team of experts is available around the clock to provide you
              with the support you need, whenever you need it.
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <FaMobileScreen className="pricing-icon" /> Comprehensive Mobile
              App
            </div>
            <div className="card-body">
              Manage your fundraising campaign on the go with our all-in-one
              mobile app. Stay connected and in control, anytime, anywhere.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;


export const PricingBottomStrip = () => {
  const navigate = useNavigate();
  // const handleTestimonials = (e) => {
  //   e.preventDefault();
  //   navigate('/successstories');
  // }
  return (
    <div
      className="pricing-bottom-strip"
      style={{
        background: "green",
        color: "white",
        textAlign: "center",
        padding: "30px",
      }}
    >
      <h5>
        Discover the impact of Fund for Bharat!{" "}
        <a href="successStories" style={{ color: "#FFF", fontWeight: "bold", cursor: "pointer" }}
          onClick={() => navigate('/successstories')}
        >
          Read our success stories
        </a>{" "}
        and see how we're making a difference.
      </h5>
    </div>
  );
};
