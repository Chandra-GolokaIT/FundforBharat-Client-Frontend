import React from "react";
import "./styles.css";

function AffiliateProgram() {
  const container = {
    backgroundImage: `url("https://www.calendar.com/wp-content/uploads/2022/05/Productivity-and-Happiness.jpg.webp")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "top right",
    height: "19rem",
    borderTopLeftRadius: "6px",
    borderTopRightRadius: "6px",
    background:
      'linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url("https://www.calendar.com/wp-content/uploads/2022/05/Productivity-and-Happiness.jpg.webp")',
  };

  return (
    <div style={container}>
      <div className="container p-4" id="affiliate-container">
        <div className="row flex-column">
          <div className="col mt-4 mb-3">
            <h2 className="text-light">Donate your funds carefully</h2>
          </div>
          <div className="col col-md-6">
            <h5 className="text-light my-2">
              This Diwali,will you invest your funds for the betterment of
              children.
            </h5>
          </div>
          <button
            type="button"
            className="btn col-5 text-light my-2"
            style={{ backgroundColor: "#ff7468" }}
          >
            FIND OUT MORE
          </button>
          <div
            className="col col-md-5 text-light mb-3"
            style={{ fontSize: "13px", fontStyle: "italic" }}
          >
            Need help with something?Find out how to get help there
          </div>
        </div>
      </div>
    </div>
  );
}

export default AffiliateProgram;
