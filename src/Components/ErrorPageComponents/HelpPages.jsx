import React from "react";
import img1 from '../../assets/images/BGI1.jpeg';
import img2 from '../../assets/images/BGI2.jpeg';
import img3 from '../../assets/images/BGI3.jpg';
import img4 from '../../assets/images/BGI4.jpeg';
import img5 from '../../assets/images/BGI5.jpeg';
import img6 from '../../assets/images/BgI6.jpeg';
import img7 from '../../assets/images/BGI7.jpeg';
import "./style.css";

function HelpPages() {
  return (
    <div className="helppages-container">
      <img src={img1} className="corner-image top-left" alt="Image 1" />
      <img src={img2} className="corner-image top-right" alt="Image 2" />
      <img src={img3} className="corner-image bottom-left" alt="Image 3" />
      <img src={img4} className="corner-image bottom-right" alt="Image 4" />
      <img src={img5} className="corner-image center-left" alt="Image 5" />
      <img src={img6} className="corner-image center-right" alt="Image 6" />
    </div>
  );
}

export default HelpPages;
