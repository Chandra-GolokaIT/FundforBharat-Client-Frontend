import React from "react";
import img from "../../assets/images/hands.png";
import { useNavigate } from "react-router-dom";

const FundRaiseCause = () => {
  const navigate = useNavigate();
  return (
    <div className="top-influencers card mb-4">
      <div className="card-header">
        <h5>Fundraisers for This Cause</h5>
      </div>
      <div className="card-body d-flex justify-content-center align-items-start gap-4">
        <img src={img} />
      </div>
      <div className="card-footer d-flex justify-content-center align-items-center gap-2 ">
        <button
          className=" py-2"
          style={{
            width: "100%",
            border: "2px solid #d54400",
            color: "#d54400",
            fontWeight: "bold",
            background: "white",
          }}
          onClick={() => navigate('/ContactUs', {state : {queryType : "Refer"}})}
        >
          Refer a Patient
        </button>
        <button
          className=" py-2"
          style={{
            width: "100%",
            background: "#d54400",
            border: "2px solid #d54400",
            color: "#fff",
            fontWeight: "bold",
          }}
          onClick={() => navigate('/ContactUs',{state : {queryType: "concern"}})}
        >
          Raise a Concern
        </button>
      </div>
    </div>
  );
};

export default FundRaiseCause;
