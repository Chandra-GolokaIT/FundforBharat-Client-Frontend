
import React, { useState, useEffect } from "react";
import img from "../../assets/images/IMG.jpg";
import { TiSocialFacebook } from "react-icons/ti";
import { FaWhatsapp } from "react-icons/fa6";
import { IoMedkitOutline } from "react-icons/io5";
import { IoArrowRedoSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Tilt from "react-parallax-tilt";
import { use } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants/constant";
import { useCurrency } from "../Layout/CurrencyContext";
import YouTubeSharePanel from "../HomepageComponents/ShareCard1";

function CardsContainer({ campaigns, activeCategory }) {
  const navigate = useNavigate();
  const [visibleCards, setVisibleCards] = useState(6);
  // const [campaigns, setCampaigns] = useState([]);
  const { formatAmount } = useCurrency();
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [selectedFundraiserId, setSelectedFundraiserId] = useState(null);
  const handleLoadMore = () => {
    // setVisibleCards(campaigns.length);
    setVisibleCards(prev => prev + 6);
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "No description available";
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };


  const calculateProgress = (raised, goal) => {
    return Math.min(Math.round((raised / goal) * 100), 100);
  }

  // get the campaignImage
  const getCampaignImage = (campaign) => {
    if (!campaign.documents || !Array.isArray(campaign.documents)) return img;

    const imageDoc = campaign.documents.find(doc => doc.doc_type === "fundraiserImage");
    return imageDoc?.doc_url || img;
  };


  return (
    <React.Fragment>
      <div className="d-flex gap-2 justify-content-center my-4 flex-wrap">
        {campaigns.length === 0 ? (
          <p style={{ fontSize: "18px", color: "gray", textAlign: "center" }}>
            No campaigns found in {activeCategory || "this category"}.
          </p>
        ) : (
          campaigns.slice(0, visibleCards).map((campaign, index) => (
            <div
              className="card"
              style={{ width: "18rem" }}
              key={index}
              onClick={(e) => {
                if (!e.target.closest('.btn')) {
                  navigate(`/individualcampaign/${campaign.id}`);
                }
              }}
            >
              {/* <img
                src={
                  campaign.documents?.find(doc => doc.doc_type === "fundraiserImage")?.doc_url || img
                }
                className="card-img-top"
                alt="Campaign"
              /> */}
              <img
                src={getCampaignImage(campaign)}
                className="card-img-top"
                alt="Campaign"
              />


              <div className="card-body ">
                <div className="card-icon">

                </div>
                <h5 className="card-title">
                  {truncateText(campaign.text, 40)}
                </h5>
                <p className="card-text">by {campaign.fullName}</p>

                <div className="d-flex justify-content-between align-items-center">
                  <span style={{ fontSize: "14px", color: "green" }}>
                    {formatAmount(campaign.amountRaised)} Raised
                  </span>{" "}
                  <span style={{ fontSize: "14px", color: "green" }}>
                    {calculateProgress(campaign.amountRaised, campaign.target_amount)}%
                  </span>
                </div>
                <div
  className="progress mb-3"
  role="progressbar"
  aria-label="Success example"
  aria-valuenow={calculateProgress(campaign.amountRaised, campaign.target_amount)}
  aria-valuemin="0"
  aria-valuemax="100"
  style={{ height: "6px" }}
>
      <div
        className="progress-bar bg-success"
        style={{
          width: `${calculateProgress(campaign.amountRaised, campaign.target_amount)}%`,
          height: "6px"
        }}
      ></div>
    </div>
    <div className="d-flex justify-content-center align-items-center gap-1">
                  <a
                    href="#"
                    className="btn"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedFundraiserId(campaign.id);
                      setIsShareOpen(true);
                    }}
                    style={{
                      borderRadius: "40px",
                      background: "none",
                      border: "2px solid #d54400",
                      color: "#d54400",
                      width: "100%",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                  >
                    Share <IoArrowRedoSharp />
                  </a>
                  <a
                    href="#"
                    className="btn"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      navigate(`/individualcampaign/${campaign.id}`);
                    }}
                    style={{
                      borderRadius: "40px",
                      background: "#d54400",
                      color: "white",
                      width: "100%",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                  >
                    Donate
                  </a>
                </div>
              </div>
            </div>

          )))}
      </div>
      {campaigns.length === 0 ? (
        <p style={{ fontSize: "18px", color: "gray", textAlign: "center" }}>

        </p>

      ) : (
        <div className="d-flex justify-content-center align-items-center">
          <button
            href="#"
            className="btn"
            style={{
              borderRadius: "40px",
              background: "goldenRod",
              color: "white",

              marginBottom: "30px",
            }}
            onClick={handleLoadMore}
          >
            Load More
          </button>
        </div>

      )}
      {isShareOpen && (
        <YouTubeSharePanel
          onClose={() => setIsShareOpen(false)}
          fundraiserId={selectedFundraiserId}
        />
      )}

    </React.Fragment>
  );
}

export default CardsContainer;
