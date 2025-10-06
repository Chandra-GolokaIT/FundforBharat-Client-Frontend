import React, { useEffect } from "react";
import img1 from "../../assets/images/slider1.jpg";
import img2 from "../../assets/images/slider2.jpg";
import img3 from "../../assets/images/slider3.jpg";
import img4 from "../../assets/images/slider4.png";
import img5 from "../../assets/images/slider5.jpg";

const OurMission = () => {
  useEffect(() => {
    // Initialize the first carousel with 2000ms interval
    const carousel1 = document.querySelector("#carouselExampleAutoplaying1");
    new window.bootstrap.Carousel(carousel1, {
      interval: 2000,
      ride: "carousel",
    });
  }, []);

  return (
    <div>
      <div className="our-mission-content">
        <h3 style={{ fontWeight: "600", color:"grey" }}>Our Mission</h3>
        <div
          style={{
            background: "rgb(104, 104, 104)",
            height: "5px",
            width: "120px",
            marginBottom: "30px",
          }}
        ></div>
        <h5 style={{ fontWeight: "600" }}>
          Make Healthcare Affordable To Save Lives Today, While Securing
          Families
        </h5>
        <h5 style={{ fontWeight: "600" }} className="mb-4">
          For A Better Tomorrow.
        </h5>
        <p className="text-center">
          We are creating innovative technology and finance solutions to empower
          people to raise funds for medical emergencies and critical illnesses
          and raise funds for a range of social and personal causes. Our
          platform has been used by lakhs to change lives through timely
          contributions, fundraisers and actions.
        </p>
      </div>
      <div className="our-mission-images">
        <div
          id="carouselExampleAutoplaying1"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="2000"
        >
          <div className="carousel-inner">
            <div className="carousel-item active" id="carousel-slide">
              <img src={img1} className="d-block w-100" alt="First Slide" />
            </div>
            <div className="carousel-item" id="carousel-slide">
              <img src={img2} className="d-block w-100" alt="Second Slide" />
            </div>
            <div className="carousel-item" id="carousel-slide">
              <img src={img3} className="d-block w-100" alt="Third Slide" />
            </div>
            <div className="carousel-item" id="carousel-slide">
              <img src={img4} className="d-block w-100" alt="Third Slide" />
            </div>
            <div className="carousel-item" id="carousel-slide">
              <img src={img5} className="d-block w-100" alt="Third Slide" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurMission;
