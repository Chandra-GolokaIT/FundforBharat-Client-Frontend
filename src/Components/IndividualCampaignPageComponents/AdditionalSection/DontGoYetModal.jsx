import React from "react";
import { createPortal } from "react-dom";

function DontGoYetModal() {
  return (
      <div
        className="modal fade"
        id="dontgoyetmodal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="dontgoyetmodalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div
              className="modal-header"
              style={{
                position: "relative",
                paddingTop: "40px",
                paddingBottom: "40px",
              }}
            >
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                style={{
                  position: "absolute",
                  right: "10px",
                  border: "none",
                  outline: "none",
                  boxShadow: "none",
                  fontSize: "35px",
                  backgroundColor: "white",
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div
              className="modal-body"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                margin: "10px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "0 10px",
                }}
              >
                <img
                  src="images/DontGoYetImage.png"
                  style={{ width: "300px", height: "200px" }}
                />
              </div>
              <h5 style={{ fontWeight: "bold", textAlign: "center" }}>
                Please don't go yet!
              </h5>
              <p style={{ textAlign: "center", color: "gray" }}>
                Just ₹300 can give Sivasankari a shot at surviving this
                life-threatening disease and your donation can make this possible
              </p>
              <div className="d-flex flex-column gap-3">
                <button
                  style={{
                    color: "white",
                    backgroundColor: "#01BFBD",
                    fontWeight: "bold",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    border: "none",
                    outline: "none",
                    boxShadow: "none",
                  }}
                >
                  Yes,I will help.
                </button>
                <button
                  style={{
                    color: "gray",
                    backgroundColor: "white",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    border: "none",
                    outline: "none",
                    boxShadow: "none",
                  }}
                >
                  Sorry,not today
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default DontGoYetModal;
