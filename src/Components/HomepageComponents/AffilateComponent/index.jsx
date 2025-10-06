import React from "react";
import FormComponent from "./FormComponent";
import AffiliateProgram from "./AffiliateProgram";
import "./styles.css";

const Affilate = () => {
  return (
    <div className="mb-5 container overflow-hidden rounded">
      <div className="row fw-bold fs-2 justify-content-center mb-4">Affilate Program</div>
      <div className="row">
        <AffiliateProgram />
      </div>
      <div className="row">
        <FormComponent />
      </div>
    </div>
  );
};

export default Affilate;
