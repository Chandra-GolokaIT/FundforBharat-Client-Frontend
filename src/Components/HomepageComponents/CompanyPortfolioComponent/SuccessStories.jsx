import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from 'lucide-react';
import { BASE_URL } from '../../../constants/constant';
import './SuccessStories.css';

const SuccessStories = () => {
  const [stories, setStories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const STATIC_IMAGE_URL = "https://img.freepik.com/premium-photo/asian-female-patient-with-happiness-lying-bed-hospital_33413-1834.jpg";

  useEffect(() => {
    axios.get(`${BASE_URL}/api/blogs/success-stories`)
      .then(res => setStories(res.data))
      .catch(err => console.error(err));
  }, []);

  const prevSlide = () => {
    setCurrentIndex(prev => prev === 0 ? stories.length - 1 : prev - 1);
  };

  const nextSlide = () => {
    setCurrentIndex(prev => prev === stories.length - 1 ? 0 : prev + 1);
  };

  return (
    <section className="success-section">
      <h2 className="success-heading">Success Stories</h2>

      <div className="success-carousel">
        {stories.length > 0 && (
          <div className="success-card">
            <div className="success-card-row">

              <div className="success-image-container">
                <img
                  src={stories[currentIndex].imageUrl || STATIC_IMAGE_URL}
                  alt={stories[currentIndex].title}
                  className="success-image"
                />
              </div>

              <div className="success-text-container">
                <blockquote className="success-quote">
                  {stories[currentIndex].description.length > 120
                    ? stories[currentIndex].description.slice(0, 120) + '...'
                    : stories[currentIndex].description}
                </blockquote>
                <div className="success-footer">
                  <h4 className="success-author">{stories[currentIndex].title}</h4>
                  <div className="success-org-container">
                    <User size={14} color="#fff" />
                    <span className="success-organization">
                      {stories[currentIndex].organization || 'Healthcare Partner'}
                    </span>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        )}
      </div>

      <div className="success-controls">
        <button onClick={prevSlide} className="success-button">Prev</button>
        <button onClick={nextSlide} className="success-button">Next</button>
      </div>
    </section>
  );
};

export default SuccessStories;