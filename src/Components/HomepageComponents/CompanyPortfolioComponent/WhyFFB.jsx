import React from "react";
import "./styles.css";
import SuccessStoriesSlider from "./SuccessStoriesSlider";
import SuccessStories from "./SuccessStories";
import { PiUsersThree } from "react-icons/pi";
import { BsTools } from "react-icons/bs";
import { FaRegThumbsUp } from "react-icons/fa6";
import { BsCreditCard2Back } from "react-icons/bs";
import { RiCustomerService2Fill } from "react-icons/ri";
import { FaHandHoldingUsd } from "react-icons/fa";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { RiSecurePaymentFill } from "react-icons/ri";

const WhyFFB = () => {
  return (
    <div className="container" style={{ backgroundColor: "#EAEBEF" }}>
      <div
        className="heading row justify-content-center pt-4"
        style={{ fontWeight: "700", fontSize: "1.5rem" }}
      >
        <h2 className="text-center" style={{ fontWeight: "bold" }}>
          Why Fund For Bharat ?
        </h2>
      </div>
      <div className="heading-border mx-auto my-2 mb-4"></div>
      <div className="d-flex justify-content-center flex-wrap gap-5 my-5">
        <div className="ffb-card">
          <FaRegThumbsUp size={50} id="ffb-icon" />
          <div className="icon-border"></div>
          <p className="ffb-card-mobile">Industry’s best fundraising success rate</p>
        </div>
        <div className="ffb-card">
          <PiUsersThree size={50} id="ffb-icon" />
          <div className="icon-border"></div>
          <p className="ffb-card-mobile">Supported By 55,00,000+ Donors</p>
        </div>
        <div className="ffb-card">
          <BsTools size={50} id="ffb-icon" />
          <div className="icon-border"></div>
          <p className="ffb-card-mobile">Easy-To-Manage Tools To Boost Results</p>
        </div>
        <div className="ffb-card">
          <BsCreditCard2Back size={50} id="ffb-icon" />
          <div className="icon-border"></div>
          <p className="ffb-card-mobile">Receive donations via all popular payment modes</p>
        </div>
        <div className="ffb-card">
          <RiCustomerService2Fill size={50} id="ffb-icon" />
          <div className="icon-border"></div>
          <p className="ffb-card-mobile">Get Expert Support 24/7</p>
        </div>
        <div className="ffb-card">
          <TbDeviceDesktopAnalytics size={50} id="ffb-icon" />
          <div className="icon-border"></div>
          <p className="ffb-card-mobile">A Dedicated Smart-Dashboard</p>
        </div>
        <div className="ffb-card">
          <FaHandHoldingUsd size={50} id="ffb-icon" />
          <div className="icon-border"></div>
          <p className="ffb-card-mobile">Withdraw Funds Without Hassle</p>
        </div>
        <div className="ffb-card">
          <RiSecurePaymentFill size={50} id="ffb-icon" />
          <div className="icon-border"></div>
          <p className="ffb-card-mobile">International Payment Support</p>
        </div>
      </div>
    </div>
  );
};

export default WhyFFB;
