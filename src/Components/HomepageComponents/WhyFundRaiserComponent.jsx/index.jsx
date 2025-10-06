import React from "react";
import "./styles.css";

const WhyFundRaiseComponent = () => {
  return (
    <div
      className="why-fund-raiser-main-div"
      style={{ backgroundColor: "#EAEBEF" }}
    >
      <h1 style={{ fontSize: "1.5rem", fontWeight: "700" }}>
        Why Fund Raise With Fund For Bharat?
      </h1>
      <div className="heading-border mx-auto my-2 mb-4"></div>
      <div className="d-flex justify-content-center flex-wrap gap-5 my-5">
        <div className="why-ffb-card">
          <img src="/images/zero%.png" alt="" />
          <p>0%</p>
          <p>Platform Fee</p>
        </div>

        <div className="why-ffb-card">
          <img src="/images/customersupport.png" alt="" />
          <p>24*7</p>
          <p>Personalized Expert Assistance</p>
        </div>
        <div className="why-ffb-card">
          <img src="/images/fast.png" alt="" />
          <p>Fast</p>
          <p>Review of your fundraiser</p>
        </div>
        <div className="why-ffb-card">
          <img src="/images/robust.png" alt="" />
          <p>Robust Due Diligence</p>
          <p>To Ensure Trust & Safety</p>
        </div>
        <div className="why-ffb-card">
          <img src="/images/mobile.png" alt="" />
          <p>Free Fundraising Mobile App</p>
          <p>for iOS and Android</p>
        </div>
        <div className="why-ffb-card">
          <img src="/images/wallet.png" alt="" />
          <p>All Payments Accepted</p>
          <p>Google Pay, Paytm, UPI, Net Banking & Wallets Accepted</p>
        </div>
        <div className="why-ffb-card">
          <img src="/images/people.png" alt="" />
          <p>30+ Lakh</p>
          <p>Donor Community</p>
        </div>
        <div className="why-ffb-card">
          <img src="/images/people.png" alt="" />
          <p>25000+</p>
          <p>Patients Funded</p>
        </div>
      </div>

      {/* <div className="why-fund-raiser-flex-container-outer">
        <div className="why-fund-raiser-flex-container">
          {" "}
          <div className="why-fund-raiser-flex-items">
            <img src="/images/zero.png" alt="" />
            <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>0%</p>
            <p>Platform Fee</p>
          </div>
          <div className="why-fund-raiser-flex-items">
            <img src="/images/customersupport.png" alt="" />
            <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>24*7</p>
            <p>Personalized Expert Assistance</p>
          </div>
          <div className="why-fund-raiser-flex-items">
            <img src="/images/fast.png" alt="" />
            <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Fast</p>
            <p>Review of your fundraiser</p>
          </div>
          <div className="why-fund-raiser-flex-items">
            <img src="/images/robust.png" alt="" />
            <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              Robust Due Diligence
            </p>
            <p>To Ensure Trust & Safety</p>
          </div>
        </div>

        <div className="why-fund-raiser-flex-container-center">
          <div className="why-fund-raiser-flex-items-center">
            <img src="/images/mobile.png" alt="" />
            <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              Free Fundraising Mobile App
            </p>
            <p>for iOS and Android</p>
          </div>
          <div className="why-fund-raiser-flex-items-center">
            <img src="/images/wallet.png" alt="" />
            <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              All Payments Accepted
            </p>
            <p>Google Pay, Paytm, UPI, Net Banking & Wallets Accepted</p>
          </div>
        </div>

        <div className="why-fund-raiser-flex-container">
          <div className="why-fund-raiser-flex-items">
            <img src="/images/people.png" alt="" />
            <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>30+ Lakh</p>
            <p>Donor Community</p>
          </div>

          <div className="why-fund-raiser-flex-items">
            <img src="/images/people.png" alt="" />
            <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>25000+</p>
            <p>Patients Funded</p>
          </div>

          <div className="why-fund-raiser-flex-items">
            <img src="/images/mobile.png" alt="" />
            <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              User-Friendly Dashboard
            </p>
            <p>to Raise Maximum Funds</p>
          </div>

          <div className="why-fund-raiser-flex-items">
            <img src="/images/secure.png" alt="" />
            <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              Premium & Easy-To-Use
            </p>
            <p>Fundraising Tools</p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default WhyFundRaiseComponent;
