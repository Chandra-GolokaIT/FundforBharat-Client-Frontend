import React from "react";
import img from "../../assets/images/img1.png";
import "../../assets/styles/HospitalServices.css";

const HospitalServices = () => {
  return (
    <section>
      <div className="hospital-service-box1">
        <div className="hospital-service-content1">
          <h2>
            Facing Issue with a Hospital or Diagnostic Center for Over Bill? We
            are here.
          </h2>
          <br />
          <p>
            We understand that dealing with unexpected medical bills can be
            overwhelming. Our team is dedicated to providing personalized
            support to ensure you receive the fair treatment you deserve.
            Together, we can ensure everyone receives fair and affordable
            healthcare. We understand that dealing with unexpected medical bills
            can be overwhelming. Our team is dedicated to providing personalized
            support to ensure you receive the fair treatment you deserve.
            Together, we can ensure everyone receives fair and affordable
            healthcare.
          </p>
          <button
            className="btn"
            id="callback-btn"
            data-bs-toggle="modal"
            data-bs-target="#searchModal"
          >
            Know More
          </button>
        </div>
        <div className="hospital-service-image">
          <img src={img} />
        </div>
      </div>
    </section>
  );
};

export default HospitalServices;
