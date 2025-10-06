import React, { useEffect, useRef } from "react";
import img1 from "../../../../public/images/a.png";
import img2 from "../../../../public/images/b.png";
import img3 from "../../../../public/images/c.png";
import img4 from "../../../../public/images/d.png";
import img5 from "../../../../public/images/e.png";
import img6 from "../../../../public/images/f.png";
import img7 from "../../../../public/images/g.png";
import img8 from "../../../../public/images/h.png";

const images = [img1, img2, img3, img4, img5, img6, img7, img8];

const Featured = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    let startPosition = 0;

    const animateSlider = () => {
      // Increase the speed by adjusting the increment value
      if (startPosition <= -slider.scrollWidth / 2) {
        startPosition = 0;
      } else {
        startPosition -= 3; // Adjust speed by changing increment value
      }
      slider.style.transform = `translateX(${startPosition}px)`;
      requestAnimationFrame(animateSlider);
    };

    animateSlider();
  }, []);

  return (
    <div>
      <div
        className="row justify-content-center mt-4 pt-4"
        style={{ fontWeight: "700", fontSize: "1.5rem" }}
      >
        Featured In
      </div>
      <div className="heading-border mx-auto my-2 mb-4"></div>
      <div className="featured-slider-container">
        <div className="featured-slider" ref={sliderRef}>
          {images.map((src, index) => (
            <div className="featured-slide" key={index}>
              <img src={src} alt={`Slide ${index}`} />
            </div>
          ))}
          {images.map((src, index) => (
            <div className="featured-slide" key={index + images.length}>
              <img src={src} alt={`Slide ${index}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Featured;
