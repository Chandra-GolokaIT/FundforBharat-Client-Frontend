import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../../constants/constant";
import DonateNowModal from "../AdditionalSection/DonateNowModal";
import { IoMedkitOutline } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useParams } from "react-router-dom";
import YouTubeSharePanel from "../../HomepageComponents/ShareCard1";
import { useCurrency } from "../../Layout/CurrencyContext";
import { Navigation, Pagination } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import "./styles.css";
import DontGoYetModal from "../AdditionalSection/DontGoYetModal";
import FundraisingProgress from "./FundraisingProgress";

function MainSection({donationCount}) {
  const [campaigns, setCampaigns] = useState([]);
  const { id } = useParams();
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [selectedFundraiserId, setSelectedFundraiserId] = useState(null);
  const { formatAmount } = useCurrency();
  const openDonateModal = () => {
    const donateModal = new window.bootstrap.Modal(
      document.getElementById("donate-now-form"),
      {
        keyboard: false,
      }
    );
    donateModal.show();
  };
  const getInitials = (name) => {
  if (!name) return "??";
  const words = name.trim().split(" ");
  if (words.length === 1) {
    return words[0][0].toUpperCase();
  }
  return (words[0][0] + words[1][0]).toUpperCase();
};

  const copyUPI = () => {
    const upiText = "supportsubhash345@yesbankltd";
    navigator.clipboard.writeText(upiText).then(
      () => {
        alert("UPI ID copied to clipboard!");
      },
      (err) => {
        console.error("Failed to copy: ", err);
      }
    );
  };
  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/api/campaigns/getById/${id}`);
        const campaignData = response.data;

        const fundraiserImages = campaignData.documents?.filter(doc => doc.doc_type === "fundraiserImage") || [];
        const documentFiles = campaignData.documents?.filter(doc => doc.doc_type === "documentFiles") || [];

        setCampaigns({
          ...campaignData,
          fullName: campaignData.fullName,
          fundraiserImages,
          documentFiles,
        });

      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };
    loadCampaigns();
  }, []);

  return (
    <div>
      <div className="main-section-heading-container">
        <p className="main-section-heading1">
          Fund For Bharat has waived off part of its fee for this cause
        </p>
        <h3 className="text-center" style={{ color: "black" }} >
          {campaigns.title}
        </h3>
      </div>
      <div className="main-section-body">
        <div className="main-section-body-leftpart">
          <div className="image-container">
            {campaigns.fundraiserImages?.length > 0 ? (
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={10}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
              >
                {campaigns.fundraiserImages.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img src={image.doc_url} style={{ width: '100%', height: '100%' }} alt={`Slide ${index}`} />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <img
                src="images/placeholder-image.png"
                style={{ width: "100%", height: "100%" }}
              />
            )}
          </div>          <div className="person-details">
            <div className="campaigner-details">
              <div className="logo">{getInitials(campaigns.fullName)}</div>

              <div className="d-flex flex-column gap-2">
                <div className="upper">
                  <p>Campaigner Details</p>
                  <span className="verified">
                    <span style={{ fontSize: "8px", fontWeight: "bold" }}>
                      VERIFIED
                    </span>
                    <TiTick color="green" />
                  </span>
                </div>
                <div style={{ position: "relative" }}>
                  <span>{campaigns.fullName || "Hello world"}</span>
                    
                  </div>

            <div className="details d-flex align-items-start" style={{ gap: '10px' }}>
              <div className="location">
              <FaLocationDot color="red" style={{ marginTop: "2px" }} />
              </div>
              <div className="d-flex flex-column">
                <span>{campaigns.city} ,</span>
                <span>{campaigns.country || "India"}</span>
              </div>
            </div>

              </div>
            </div>
            <div className="campaigner-details">
              <div className="logo">{getInitials(campaigns.beneficiaryName || "Beneficiary Name")}</div>

              <div className="d-flex flex-column gap-2">
                <div className="upper">
                  <p>Beneficiary Details</p>
                  <span className="verified">
                    <span style={{ fontSize: "8px", fontWeight: "bold" }}>
                      VERIFIED
                    </span>
                    <TiTick color="green" />
                  </span>
                </div>
                <div style={{ position: "relative" }}>
                  <span>{campaigns.beneficiaryName || "Beneficiary"}</span>
                  
                
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main-section-body-rightpart">
          <FundraisingProgress campaignId={id} donationCount={donationCount} startDate={campaigns.startDate} />
          {/* <div className="raised-amount-container">
            <div className="circle">
              <h4 style={{ fontWeight: "bold" }}>21%</h4>
              <span>funded</span>
              <span>in 81 days</span>
            </div>
            <div style={{ fontSize: "22px" }}>
              <span style={{ fontWeight: "bold" }}>{campaigns.amountRaised}</span> of
              {campaigns.targetAmount}
            </div>
            <a href="#" style={{ color: "orange", fontWeight: "bolder" }}>
              245 Donors
            </a>
          </div> */}
          <div className="donateandshare-container">
            <div className="donatenow-container">
              <p style={{ fontFamily: "cursive", fontSize: "20px" }}>
                Funds will be transferred to the hospital
              </p>
              <button
                data-bs-toggle="modal"
                data-bs-target="#donate-now-form"
                onClick={openDonateModal}
              >
                <span style={{ fontSize: "20px" }}>DONATE NOW</span>
                <span
                  style={{
                    fontStyle: "italic",
                    fontWeight: "normal",
                    fontSize: "12px",
                  }}
                >
                  (INDIAN TAX BENEFITS AVAILABLE)
                </span>
              </button>
            </div>
                <div className="share-container">
      <p style={{ fontFamily: "cursive", fontSize: "20px" }}>
        Every social media share can bring {formatAmount(5000)}
      </p>
      <button 
        onClick={() => {
          setSelectedFundraiserId(campaigns.id);
          setIsShareOpen(true);
        }}
      >
        SHARE
      </button>
    </div>
            <div className="donateviaupi-container">
              <h5
                style={{
                  fontWeight: "500",
                  paddingBottom: "15px",
                  borderBottom: "1px solid",
                  textAlign: "center",
                }}
              >
                Donate via Paytm/Google Pay/PhonePe
              </h5>
              <div className="d-flex justify-content-center flex-wrap">
                <div style={{ width: "150px" }}>
                  <div className="d-flex justify-content-center align-items-center p-3 gap-1">
                    <img
                      className="paymenticons"
                      src="https://cdn.iconscout.com/icon/free/png-256/free-google-pay-2038779-1721670.png"
                    />
                    <img
                      className="paymenticons"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo4x8kSTmPUq4PFzl4HNT0gObFuEhivHOFYg&s"
                    />
                    <img
                      className="paymenticons"
                      src="https://cdn.icon-icons.com/icons2/730/PNG/512/paytm_icon-icons.com_62778.png"
                    />
                    <img
                      className="paymenticons"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoFtS9CFH0gDnrZ4ScIcDrRHYuUcI6mdRVCg&s"
                    />
                  </div>
                  <div className="d-flex justify-content-center align-items-center p-3 ">
                    <img
                      className="qr-code"
                      src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
                    />
                  </div>
                </div>
                <div
                  className="d-flex flex-column px-2 align-items-center"
                  style={{ width: "240px" }}
                >
                  <img
                    style={{ width: "50px" }}
                    src="https://cdn.iconscout.com/icon/free/png-256/free-upi-2085056-1747946.png?f=webp"
                  />
                  <span>support{campaigns.fullName}@yesbankltd</span>
                  <button
                    type="button"
                    className="btn btn-outline-success mt-3 px-5 "
                    style={{ borderRadius: "20px" }}
                    onClick={copyUPI}
                  >
                    COPY
                  </button>
                </div>
              </div>
              <span
                className="smaller-texts text-center"
                style={{ borderBottom: "1px solid", paddingBottom: "15px" }}
              >
                Scan the QR code from the app and make payment
              </span>
              <a
                href="#"
                className="smaller-texts text-center"
                data-bs-toggle="modal"
                data-bs-target="#upiPaymentForm"
              >
                How to pay?
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Sections */}

      {/* Contact Form Modal */}
      <div
        className="modal fade"
        id="contactform"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Contact Campaigner
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Your Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">
                    Message:
                  </label>
                  <textarea
                    className="form-control"
                    id="message-text"
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Send message
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* UPI Payment Instructions Modal */}
      <div
        className="modal fade"
        id="upiPaymentForm"
        tabIndex="-1"
        aria-labelledby="upiPaymentLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="upiPaymentLabel">
                How to Pay via UPI
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <ol>
                <li>Open your UPI app (Paytm, Google Pay, PhonePe, etc.).</li>
                <li>Select the option to scan QR code.</li>
                <li>Scan the QR code displayed on our donation page.</li>
                <li>Enter the amount you wish to donate.</li>
                <li>Confirm the payment.</li>
              </ol>
              <p>
                If you face any issues, feel free to contact us for assistance.
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <DonateNowModal campaign={campaigns} />
      {isShareOpen && (
      <YouTubeSharePanel
        onClose={() => setIsShareOpen(false)}
        fundraiserId={selectedFundraiserId}
      />
    )}
    </div>
  );
}

export default MainSection;
