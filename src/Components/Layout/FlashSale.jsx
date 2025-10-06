import React from "react";

function FlashSale() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        gap: "20px",
        padding: "6px 10px",
        color: "white",
        fontSize: "14px",
        backgroundImage: "linear-gradient(to right,#D54400,orange)",
      }}
    >
      <img
        src="https://d2aq6dqxahe4ka.cloudfront.net/themes/front/images/matching-tag.png"
        style={{ width: "50px" }}
      />
      <div className="text-center">
        Additional 10% matching on donations until funds last. T&C Apply.
        <a href="/monthly-donor" style={{ color: "white", fontSize: "12px" }}>
          Know more.
        </a>
      </div>
    </div>
  );
}

export default FlashSale;
