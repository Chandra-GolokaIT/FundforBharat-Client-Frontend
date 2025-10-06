import React from "react";
import "../../assets/styles/CampaignPage.css";

const TopBanner = () => {
  return (
    <div className="top-banner">
      <div className="top-banner-content d-flex flex-column-reverse justify-content-center align-items-center ">
        <h1 className="text-center py-5" style={{ fontWeight: "bold" }}>
          Top Fundraisers
        </h1>
        <div
          className="top-banner-strip d-flex justify-content-center align-items-center py-4"
          style={{ width: "100%" }}
        >
          <div className="banner-strip-content">
            <h3>30+ Lakh</h3>
            <p className="text-center">Donor Community</p>
          </div>
          <div className="banner-strip-content">
            <h3>25000+</h3>
            <p className="text-center">Patients Funded</p>
          </div>
          <div className="banner-strip-content">
            <h3>₹1 Cr</h3>
            <p className="text-center">Raised In 24 Hrs!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
