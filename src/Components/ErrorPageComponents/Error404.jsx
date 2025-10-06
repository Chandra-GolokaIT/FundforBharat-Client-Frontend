import React from "react";
import img from "../../assets/images/ErrorPage2.png";

const Error404 = () => {
  return (
    <div className="error-404-container d-flex justify-content-center align-items-center min-vh-10">      
       <div
       
       style={{color:"#002D62", fontSize:"900"}}>
        <h1>We looked <br /> everywhere.</h1>
        <h5>
          Looks like this page is missing. If you still need help,
          <br />
          visit our <a href="helpPages">help pages</a>
        </h5>
      </div>
      <img src={img} alt="Error 404" className="error-image" />
      
    </div>
  );
};

export default Error404;
