import React from "react";
import img from "../../assets/images/Putting-health-first.jpg";
import "./style.css";

const PuttingHealthFirst = () => {
  return (
    <div className="phf-container">
      <img className="phf-img" src={img} alt="image" />
      <div className="phf-content">
        <h2>Putting Health First</h2>
        <div
          style={{
            background: "#fff",
            height: "5px",
            width: "120px",
            marginBottom: "30px",
          }}
        ></div>
        <p>
          While Fund for Bharat supports a diverse range of causes, aiding
          nonprofits, personal and creative projects, we know that in the
          post-pandemic world, healthcare financing can no longer be an option,
          it must be a priority.
        </p>
      </div>
    </div>
  );
};

export default PuttingHealthFirst;
