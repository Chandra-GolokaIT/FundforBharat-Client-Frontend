import React from "react";
import img1 from "../../assets/images/money-donation.webp";
import DonateNowModal from "../IndividualCampaignPageComponents/AdditionalSection/DonateNowModal";
import "./style.css";


const BannerSection = () => {
  const openDonateModal = () => {
    const donateModal = new window.bootstrap.Modal(
      document.getElementById("donate-now-form"),
      {
        keyboard: false,
      }
    );
    donateModal.show();
  };

   
  return (
    <div className="error-banner-section d-flex justify-content-center align-items-center">
      <img src={img1} alt="image1" />
      <div className="error-content">
        <h2>Support Lifesaving Treatments</h2>
        <h5>
          Join our monthly donation program to provide critical medical care for
          those in need. Your contributions make a real difference.
        </h5>
       
      </div>
      <button  className="donate-button"
         data-bs-toggle="modal"
         data-bs-target="#donate-now-form"
         style={{backgroundColor:"#d54410"}}
         onClick={openDonateModal}>Donate Now</button>
         <DonateNowModal />
    </div>
  );
};

export default BannerSection;
