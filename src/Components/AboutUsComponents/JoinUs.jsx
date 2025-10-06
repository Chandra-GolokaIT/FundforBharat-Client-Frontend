import React from "react";
import { CiMail } from "react-icons/ci";

function JoinUs() {
  return (
    <div className="join-us">
      <div className="d-flex flex-column py-5 px-4 align-items-center align-items-sm-start  p-sm-5 my-sm-5">
        <h3 style={{ fontWeight: "bold", alignSelf: "start", color: "gray" }}>
          We are in This Together!
        </h3>
        <p style={{ fontSize: "18px" }}>
          We know we cannot fight a global problem,alone.Join in this endeavour,
          <br />
          you can contact us at
        </p>
        <div className="d-flex flex-column flex-lg-row gap-2">
          <a href="#">
            <button
              style={{
                backgroundColor: "#d54400",
                border: "none",
                boxShadow: "none",
                borderRadius: "5px",
              }}
            >
              <div className="d-flex gap-2 align-items-center py-2">
                <div>
                  <CiMail size={32} color="#fff" />
                </div>
                <div
                  className="pr-3 d-flex flex-column align-items-start "
                  style={{
                    lineHeight: "20px",
                    color: "#fff",
                  }}
                >
                  Careers:
                  <br />
                  <span style={{ fontSize: "15px" }}>
                    careers@fundforbharat.com
                  </span>
                </div>
              </div>
            </button>
          </a>
          <a href="#">
            <button
              style={{
                backgroundColor: "#d54400",
                border: "none",
                boxShadow: "none",
                borderRadius: "5px",
              }}
            >
              <div className="d-flex gap-2 align-items-center py-2">
                <div>
                  <CiMail size={32} color="#fff" />
                </div>
                <div
                  className="pr-3 d-flex flex-column align-items-start "
                  style={{ lineHeight: "20px", color: "#FFF" }}
                >
                  Partnerships:
                  <br />
                  <span style={{ fontSize: "15px" }}>
                    partnerships@fundforbharat.com
                  </span>
                </div>
              </div>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default JoinUs;
