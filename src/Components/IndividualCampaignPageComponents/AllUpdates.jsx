import React from "react";
import "./style.css";
const AllUpdates = () => {
  return (
    <div className="latest-updates card my-4">
      <div className="card-header">
        <h5>More Updates (2)</h5>
      </div>
      <div className="card-body">
        <div>
          <p style={{ color: "black" }}>
            <b>#1 (24 Jun, 2024)</b>
          </p>
          <p>Dear Donors,</p>
          <p>
            This part will be implemented later. 
          </p>
        </div>
        <div>
          <p style={{ color: "black" }}>
            <b>#2 (5 Jun, 2024)</b>
          </p>
          <p>Dear Donors,</p>
          <p>
            This part will be implemented later.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AllUpdates;
