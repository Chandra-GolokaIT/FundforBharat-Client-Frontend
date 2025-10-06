import React from "react";
import "./style.css";
const LatestUpdate = ({ campaign , onReadMore }) => {
  return (
    <div className="latest-updates card mb-4">
      <div className="card-header">
        <h5>Latest Update</h5>
      </div>
      <div className="card-body">
        <p>Dear Donors,</p>
        <p>
          {campaign.latestUpdate || "No Updates yet"}
        </p>
      </div>
      <div className="d-flex justify-content-center">
        <button className="btn" onClick={onReadMore}>
          Read More
        </button>
      </div>
    </div>
  );
};

export default LatestUpdate;
