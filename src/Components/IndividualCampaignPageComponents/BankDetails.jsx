import React from "react";
import "./style.css";
const BankDetails = () => {
  return (
    <div className="latest-updates card my-4">
      <div className="card-header">
        <h5>Donate via Bank Transfer</h5>
      </div>
      <div className="card-body">
        <div>
          <p style={{ color: "black", fontSize: "15px" }}>
            - Bank Name: <b>RBL Bank</b>
            <br />- Account number : <b>2223330081087967</b>
            <br />- Account name : <b>Ujjwala A</b>
            <br />- IFSC code : <b>RATN0VAAPIS</b>
            <br />
          </p>
          <p>For UPI Transaction: supportujjwala16@yesbankltd</p>
          Donations via YES Bank UPI and RBL Bank Transfer are safe with
          ImpactGuru.
          <br />
          <a href="#" style={{ color: "green", fontSize: "15px" }}>
            Claim your donation acknowledgment now! For payment done via Bank
            Transfer
          </a>
        </div>
      </div>
    </div>
  );
};

export default BankDetails;
