// CategorySection.jsx
import React, { useContext, useState, useEffect } from "react";
import "./CategorySection.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constants/constant";
import { CategoryContext } from "../Context/CategoryContext";

const CategorySection = ({ onCategorySelect }) => {
  const navigate = useNavigate();
  const { categories } = useContext(CategoryContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  // Update items per view based on screen width
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width <= 430) {
        setItemsPerView(3);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const handleCategoryClick = async (category) => {
    console.log("Clicked:", category);
    try {
      const endpoint = `${BASE_URL}/api/campaigns/getByCategory/${category.name}`;
      const response = await axios.get(endpoint);
      if (onCategorySelect) {
        onCategorySelect(response.data || [], category.name);
      }
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      if (onCategorySelect) {
        onCategorySelect([], category.name);
      }
    }
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? Math.max(0, categories.length - itemsPerView) : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= categories.length - itemsPerView ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const maxIndex = Math.max(0, categories.length - itemsPerView);
  const totalDots = Math.ceil(categories.length / itemsPerView);

  return (
    <div className="category-section-container" id="category-section">
      <h2>Browse fundraisers by category</h2>
      <p>People around the world are raising money for what they are passionate about.</p>
      
      {/* Desktop Grid View */}
      <div className="category-grid">
        {categories.map((cat, idx) => (
          <div
            className="category-card"
            key={idx}
            onClick={() => handleCategoryClick(cat)}
          >
            <img
              className="icon"
              src={cat.thumbnailPath || "https://via.placeholder.com/50"}
              alt="Icon"
            />
            <div className="label">{cat.name}</div>
          </div>
        ))}
      </div>

      {/* Mobile Carousel View */}
      <div className="carousel-container">
        <button 
          className="carousel-nav prev" 
          onClick={goToPrevious}
          disabled={currentIndex === 0}
        >
          <svg viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>
        
        <div className="carousel-wrapper" style={{
          transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`
        }}>
          {categories.map((cat, idx) => (
            <div
              className="category-card"
              key={idx}
              onClick={() => handleCategoryClick(cat)}
            >
              <img
                className="icon"
                src={cat.thumbnailPath || "https://via.placeholder.com/50"}
                alt="Icon"
              />
              <div className="label">{cat.name}</div>
            </div>
          ))}
        </div>
        
        <button 
          className="carousel-nav next" 
          onClick={goToNext}
          disabled={currentIndex >= maxIndex}
        >
          <svg viewBox="0 0 24 24">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
          </svg>
        </button>

        {/* Carousel Indicators */}
        <div className="carousel-indicators">
          {Array.from({ length: totalDots }, (_, index) => (
            <div
              key={index}
              className={`indicator ${Math.floor(currentIndex / itemsPerView) === index ? 'active' : ''}`}
              onClick={() => goToSlide(index * itemsPerView)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;