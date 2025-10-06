import { ArrowUpRight } from "lucide-react";
import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import { useNavigate } from "react-router-dom";
import DonationForm from "./DonationForm/DonationForm";
import axios from "axios";
import { BASE_URL } from "../../constants/constant";
import "../../assets/styles/TrendingFundraiser.css";
import YouTubeSharePanel from "./ShareCard1";
import { useCurrency } from "../Layout/CurrencyContext";
import "../../assets/styles/TrendingFundraiser.css";


const EducationalFundraiser = () => {
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { formatAmount } = useCurrency();
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [selectedFundraiserId, setSelectedFundraiserId] = useState(null);
  const [stories, setStories] = useState([]);

  const handleShowDonationForm = () => {
    setShowDonationForm(true);
  };

  const handleCloseDonationForm = () => {
    setShowDonationForm(false);
  };

  const handleShowSharePanel = () => {
    setShowSharePanel(true);
  };

  const handleCloseSharePanel = () => {
    setShowSharePanel(false);
  };

  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/api/campaigns/getByCategory/education`);
        setStories(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching educational fundraisers:", error);
        setLoading(false);
      }
    };

    loadCampaigns();
  }, []);

  const handleCardClick = (fundraiserId) => {
    navigate(`/individualcampaign/${fundraiserId}`);
  };

  if (loading)
    return (
      <div className="loading-container">
        <div className="spinner-border loading-spinner" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  return (
    <>
      <div className="trending-fundraiser-page">
        <h1 style={{ textAlign: "center", fontWeight: "600", fontSize: "30px" }}>
          Educational Fundraisers
        </h1>
        <div className="heading-border my-3 mx-auto mb-4"></div>
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          autoPlay={true}
          centerMode={false}
          className="trending_fundraiser"
          containerClass="container-with-dots"
          dotListClass=""
          draggable
          focusOnSelect={false}
          itemClass="carousel-item-padding"
          infinite
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024,
              },
              items: 4,
              partialVisibilityGutter: 40,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 0,
              },
              items: 3,
              partialVisibilityGutter: 80,
            },
            mobile: {
              breakpoint: {
                max: 564,
                min: 0,
              },
              items: 2,
              partialVisibilityGutter: 30,
            },
            mobilesmall: {
              breakpoint: {
                max: 464,
                min: 0,
              },
              items: 1,
              partialVisibilityGutter: 30,
            },
          }}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          {stories.map((story, index) => (
            <div className="card" key={index} style={{ cursor: 'pointer' }}>
              <div className="img-wrapper">
                <img
                  src={
                    story.documents?.find(doc => doc.doc_type === "fundraiserImage")?.doc_url || 
                    "https://thumbs.dreamstime.com/b/image-not-available-icon-vector-set-white-background-eps-330821927.jpg"
                  } 
                  alt={story.title}
                  width="100%"
                  height="170"
                  onClick={() => handleCardClick(story.id)}
                />
              </div>
              <div className="content-section padding-home">
                <div className="title" onClick={() => handleCardClick(story.id)}>
                  {story.title}
                </div>
                <div className="progress-bar">
                  <div
                    className="progress"
                    style={{
                      width: `${(story.amountRaised / story.target_amount) * 100}%`,
                      height: "6px",
                      backgroundColor: "#f8c471",
                    }}
                  ></div>
                </div>
                <div className="raised-amnt">
                  <span className="raised">Raised - {formatAmount(story.amountRaised)} </span>
                  <span className="outof"> Goal - {formatAmount(story.target_amount)}</span>
                </div>
              </div>
              <div className="widget-footer">
                <div className="items">
                  <span>{story.daysLeft}</span> Days Left
                </div>
                <div className="items">
                  <span>{story.supporters}</span> Supporters
                </div>
              </div>
              <div className="share-buttons">
                <button 
                  className="btn-fb"
                  onClick={() => {
                    setSelectedFundraiserId(story.id);
                    setIsShareOpen(true);
                  }}
                >
                  <span className="text">Share</span>
                </button>
                <button 
                  className="btn-fb" 
                  style={{ background: "#d54400" }}
                  onClick={handleShowDonationForm}
                >
                  <span className="text">Donate</span>
                  <ArrowUpRight />
                </button>
              </div>
            </div>
          ))}
        </Carousel>
        <DonationForm 
          show={showDonationForm}
          handleClose={handleCloseDonationForm} 
        />
      </div>
      {isShareOpen && (
        <YouTubeSharePanel
          onClose={() => setIsShareOpen(false)}
          fundraiserId={selectedFundraiserId} 
        />
      )}
    </>
  );
};

export default EducationalFundraiser;