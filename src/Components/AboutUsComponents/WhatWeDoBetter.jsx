import React from "react";
import { RiLightbulbFlashLine } from "react-icons/ri";
import { FaRegHandshake } from "react-icons/fa";
import { Fa0 } from "react-icons/fa6";
import { FaPercent } from "react-icons/fa";

const WhatWeDoBetter = () => {
  return (
    <div className="whatwedo" style={{ margin: "80px 0" }}>
      <h3
        style={{
          fontWeight: "600",
          color: "rgb(104, 104, 104)",
          textAlign: "center",
        }}
      >
        What We Do Better
      </h3>
      <div
        style={{
          background: "rgb(104, 104, 104)",
          height: "5px",
          width: "120px",
          margin: "auto",
          marginBottom: "30px",
        }}
      ></div>
      <div className="whatwedo-container">
        <div className="card">
          <span className="d-flex align-items-end justify-content-center my-3">
            <RiLightbulbFlashLine style={{ color: "darkOrange" }} size={100} />
          </span>
          <div className="card-body">
            <p>We pioneer tech innovations that aid human effort and intent</p>
            <p className="card-text">
              Through our first-of-its-kind fundraising app and
              never-done-before storytelling tools, we are making fundraising
              easy, effortless and accessible to those who need it the most.
            </p>
          </div>
        </div>
        <div className="card">
          <span className="d-flex align-items-end justify-content-center my-3">
            <FaRegHandshake style={{ color: "darkOrange" }} size={100} />
          </span>

          <div className="card-body">
            <p>We forge partnerships to multiply impact</p>
            <p className="card-text">
              We have partnered with hospitals like Apollo, Fortis to reach
              every patient and brands like Grofers, PhonePe, Yatra etc to help
              fund those impacted by the pandemic.
            </p>
          </div>
        </div>
        <div className="card">
          <span className="d-flex align-items-end justify-content-center my-3">
            <Fa0 style={{ color: "darkOrange" }} size={100} />
            <FaPercent style={{ color: "darkOrange" }} size={40} />
          </span>
          <div className="card-body">
            <p>We responded to the pandemic with 0% platform fee</p>
            <p className="card-text">
              Like each one, we did a bit more to help those fighting for their
              loved one’s health during this time, by bringing down our fee to
              zero.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatWeDoBetter;
