import React from "react";
import { IoHeartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

function FlashSale2() {
  return (
    <div
      className="d-flex align-items-center flex-nowrap"
      style={{
        padding: "0px 10px",
        zIndex: "1030",
        background: "linear-gradient(90deg, #f12711, #f5af19)",
        height: "60px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        overflow: "hidden",
      }}
    >
      {/* Scrolling Text */}
      <div
        style={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          color: "white",
          textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
          flex: 1,
        }}
      >
        <div
          style={{
            display: "inline-block",
            animation: "scrollText 15s linear infinite",
            fontWeight: "600",
            fontSize: "1rem",
            paddingLeft: "100%",
          }}
        >
          🌟 Make a lasting difference. Join our Monthly Donor Program — every smile counts ❤️
        </div>
      </div>

      {/* Button always visible, aligned right */}
      <Link
        to="/monthly-donor"
        style={{
          background: "#8e2de2",
          backgroundImage: "linear-gradient(45deg, #8e2de2, #4a00e0)",
          borderRadius: "20px",
          color: "white",
          fontWeight: "bold",
          fontSize: "0.85rem",
          padding: "6px 14px",
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
          transition: "all 0.3s ease",
          marginLeft: "auto", // ✅ Pushes button to the right
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <IoHeartOutline size={18} />
        <span>Join Monthly Donors</span>
      </Link>

      {/* Scroll animation keyframes */}
      <style>
        {`
          @keyframes scrollText {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-100%);
            }
          }
        `}
      </style>
    </div>
  );
}

export default FlashSale2;
