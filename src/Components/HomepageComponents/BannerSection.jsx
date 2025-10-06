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

const BannerSection = () => {
  const [carouselImages, setCarouselImages] = useState([FFBGG]);

  useEffect(() => {
    const fetchCarouselImages = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${ADMIN_URL}/api/admin/carousels/type/HOME_LOWER`, {

        });

        const imageUrls = response.data.map(item => item.image);
        console.log("Fetched image URLs:", imageUrls);

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
    <div className="full-slider-wrapper full-slider-wrapper-pricing">
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
        <div className="hero-section-buttons">
            <button type="button" onClick={() => navigate("/howitworks")}>
              Learn More <FaArrowRightLong />
            </button>
          </div>
        {carouselImages.map((url, index) => (
          <SwiperSlide key={index}>
            <img
              src={url}
              alt={`Slide ${index}`}
              className="full-slider-image"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSection;
