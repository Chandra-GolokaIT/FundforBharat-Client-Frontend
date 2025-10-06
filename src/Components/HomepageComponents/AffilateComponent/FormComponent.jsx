import React from "react";

const rateButtonCss = {
  height: "2rem",
  border: "1px black",
  backgroundColor: "#ff7468",
  color: "white",
};

const FormComponent = () => {
  return (
    <div className="container w-100">
      <div
        className="row w-full p-5 gap-3 justify-content-center"
        id="affiliate-form"
        style={{
          backgroundImage:
            "url(https://d2aq6dqxahe4ka.cloudfront.net/themes/front/page/images/home-page/bannerImgHome_webp.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="col-sm-6 ">
          <form
            className="container border shadow-lg rounded"
            style={{ backgroundColor: "white", padding: "1.5rem" }}
          >
            <div
              className="row justify-content-center mb-4 fs-4"
              style={{ color: "#ff7468", fontWeight: "bold" }}
            >
              Donate to Fund the Bharat
            </div>
            <div
              className="row justify-content-center mb-4 gap-3"
              style={{ height: "2rem", width: "100%" }}
            >
              <button
                className="col-5"
                style={{
                  backgroundColor: "#ff7468",
                  color: "white",
                  border: "none",
                }}
              >
                Monthly
              </button>
              <button
                className="col-5"
                style={{
                  border: "none",
                }}
              >
                {" "}
                One-Off
              </button>
            </div>
            <div className="row mb-4 gap-3 justify-content-center">
              <button className="col-4 col-lg-2" style={rateButtonCss}>
                $ 10
              </button>
              <button className="col-4 col-lg-2" style={rateButtonCss}>
                $ 10
              </button>
              <button className="col-4 col-lg-2" style={rateButtonCss}>
                $ 10
              </button>
              <button className="col-4 col-lg-2" style={rateButtonCss}>
                $ 10
              </button>
            </div>
            <div className="row mb-4">
              <div className="col-1 fw-bold fs-4 d-flex align-items-center">
                $
              </div>
              <input
                className="col-9 p-1"
                style={{
                  border: "1px",
                  borderRadius: "10px",
                  boxShadow: "1px 1px 1px 1px gray",
                }}
              ></input>
              <div className="col-1 fw-semibold fs-6 d-flex align-items-center p-1">
                GBP
              </div>
            </div>
            <div className="row justify-content-center">
              {" "}
              <button
                className="col-10"
                style={{
                  backgroundColor: "#ff7468",
                  color: "white",
                  border: "none",
                  height: "2.5rem",
                }}
              >
                Monthly
              </button>
            </div>
          </form>
        </div>
        <div
          className="col-md-5"
          style={{ fontWeight: "bold", fontSize: "1.5rem" }}
        >
          Help save a human's life with a monthly donation
        </div>
      </div>
    </div>
  );
};

export default FormComponent;
