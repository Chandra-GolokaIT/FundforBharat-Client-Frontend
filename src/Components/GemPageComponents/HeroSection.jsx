import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import FFBGG from "../../assets/images/FFBGG.png";
import axios from "axios";
import { ADMIN_URL } from "../../constants/constant";
import "../../assets/styles/HeroSection.css";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaHandHoldingUsd } from "react-icons/fa";
import DonationForm from "./DonationForm";

const HeroSection = () => {
  const [carouselImages, setCarouselImages] = useState([FFBGG]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchCarouselImages = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${ADMIN_URL}/api/admin/carousels/type/MONTHLY_DONOR`,
          
        );

        const imageUrls = response.data.map((item) => item.image);
        if (imageUrls.length > 0) {
          setCarouselImages(imageUrls);
        }
      } catch (error) {
        console.error("Error fetching carousel images:", error);
      }
    };

    fetchCarouselImages();
  }, []);

  return (
    <div className="full-slider-wrapper full-slider-wrapper-gempage relative" style={{ position: "relative" }}>
      {/* ✅ Floating Buttons */}
      <div style={{
        position: "absolute",
        bottom: "80px",
        right: "200px",
        zIndex: 10,
      }}>
        <h3
          className="d-flex align-items-center gap-2 px-3 py-2 text-white"
          style={{
            border: "2px solid green",
            borderRadius: "15px",
            backgroundColor: "#147a56",
            cursor: "pointer",
            width: "fit-content",
          }}
          onClick={() => setShowForm(true)}
        >
          <FaHandHoldingUsd size={20} /> Be a saviour
        </h3>
      </div>

      <div style={{
        position: "absolute",
        top: "30px",
        right: "30px",
        zIndex: 10,
      }}>
        <button
          className="px-4 py-2 bg-white rounded text-black font-semibold shadow"
          onClick={() => window.location.href = "/howitworks"}
        >
          Learn More <FaArrowRightLong />
        </button>
      </div>

      {/* ✅ Swiper Carousel */}
      <Swiper
        key={carouselImages.length}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        loop={true}
        modules={[Autoplay, Pagination]}
        className="full-width-swiper"
      >
        {carouselImages.map((url, index) => (
          <SwiperSlide key={index}>
            <img
              src={url}
              alt={`Slide ${index}`}
              className="full-slider-image"
              style={{ width: "100%", height: "auto" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {showForm && (
        <DonationForm className="pt-5" onClose={() => setShowForm(false)} />
      )}
    </div>
  );
};

export default HeroSection;
