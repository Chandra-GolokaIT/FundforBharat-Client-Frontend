import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../assets/images/critical-disease-gem.webp"
import { FaArrowLeft, FaArrowRight, FaHandHoldingUsd } from "react-icons/fa";
import axios from "axios";
import DonationForm from "./DonationForm";
import { BASE_URL } from "../../constants/constant";

const GemSlider = () => {
  const [showForm, setShowForm] = useState(false);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get(`${BASE_URL}/api/blogs/campaign-blog`);
        setStories(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="arrow-btn arrow-prev" onClick={onClick}>
        <FaArrowLeft />
      </div>
    );
  };

  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="arrow-btn arrow-next" onClick={onClick}>
        <FaArrowRight />
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    arrows: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  if (loading) {
    return (
      <div className="gem-slider-section p-5 text-center" style={{ color: "#fff" }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="gem-slider-section p-5 text-center" style={{ color: "#fff" }}>
        Error loading stories: {error}
      </div>
    );
  }

  if (stories.length === 0) {
    return (
      <div className="gem-slider-section p-5 text-center" style={{ color: "#fff" }}>
        No stories available at the moment.
      </div>
    );
  }

  return (
    <div className="gem-slider-section p-5">
      <div className="gem-slider-heading">
        <h4 className="text-center" style={{ color: "#fff" }}>
          <b>Which Life patron Subscription is the right fit for you?</b>
        </h4>
        <div
          className="heading-border mx-auto "
          style={{ background: "#fff" }}
        ></div>
      </div>
      <Slider
        {...settings}
        className="gem-slider slider-css mb-5 w-100 position-relative"
      >
        {stories.map((story, index) => (
          <div key={index} className="gem-slide">
            <img 
              src={story.imageUrl || "https://via.placeholder.com/400x300?text=No+Image"} 
              alt={story.title} 
              className="img-fluid gem-img" 
              onError={(e) => {
                e.target.src = "https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg";
              }}
            />
            <div className="gem-content">
              <h2>{story.title}</h2>
              <p>{story.description}</p>
              <div className="slide-footer">
                <button 
                  className="gem-slide-btn"
                  onClick={() => setShowForm(true)}
                >
                  <FaHandHoldingUsd /> Give Every Month
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Donation Form Modal */}
      {showForm && <DonationForm onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default GemSlider;

