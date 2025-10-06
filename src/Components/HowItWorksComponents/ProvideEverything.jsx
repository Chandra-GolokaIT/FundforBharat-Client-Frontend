import React from "react";
import "./style.css";
import {
  FaBell,
  FaCheckCircle,
  FaGlobe,
  FaLightbulb,
  FaMoneyBillWave,
  FaUsers,
  FaClock,
  FaBullhorn,
  FaTools,
  FaUser,
  FaCashRegister,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ProvideEverything() {
  const navigate = useNavigate();
  const row1content = [
    {
      information: {
        icon: <FaMoneyBillWave color="orange" size={30} />,
        title: "Instant Access to Funds",
        content:
          "Withdraw your funds anytime during your campaign to meet urgent needs without any delay.",
      },
    },
    {
      information: {
        icon: <FaGlobe color="orange" size={30} />,
        title: "Global Donations",
        content:
          "Accept contributions from supporters worldwide with multi-currency payment options.",
      },
    },
    {
      information: {
        icon: <FaUsers color="orange" size={30} />,
        title: "Collaborative Fundraising",
        content:
          "Empower multiple team members to manage and promote your fundraiser for maximum impact.",
      },
    },
  ];

  const row2content = [
    {
      information: {
        icon: <FaBell color="orange" size={30} />,
        title: "Real-Time Tracking & Alerts",
        content:
          "Stay updated with real-time notifications, emails, and detailed progress tracking through our personalized web app.",
      },
    },
    {
      information: {
        icon: <FaTools color="orange" size={30} />,
        title: "Advanced Marketing Tools",
        content:
          "Leverage our intelligent marketing tools to gain valuable insights and boost your fundraiser’s success.",
      },
    },
    {
      information: {
        icon: <FaCheckCircle color="orange" size={30} />,
        title: "No Hidden Fees",
        content:
          "Receive the full amount raised after a transparent deduction of minimal processing fees.",
      },
    },
  ];

  const row3content = [
    {
      information: {
        icon: <FaClock color="orange" size={30} />,
        title: "24/7 Assistance",
        content:
          "Get round-the-clock support through calls, WhatsApp, Email, SMS, and our Instant Chat Interface.",
      },
    },
    {
      information: {
        icon: <FaLightbulb color="orange" size={30} />,
        title: "Expert Guidance",
        content:
          "Our dedicated fundraising experts are here to support and guide you every step of the way.",
      },
    },
    {
      information: {
        icon: <FaBullhorn color="orange" size={30} />,
        title: "Marketing & Promotion",
        content:
          "Benefit from our comprehensive marketing and promotional support to amplify your campaign’s reach.",
      },
    },
  ];

  const handleStartFundRaise = () => {
    navigate('/start-fundraiser')

  }

  const handleBrowseFundRaise = () => {
    navigate('/browsefundraisers')
  }

  return (
    <div
      className="heading"
      style={{ marginTop: "50px", marginBottom: "80px" }}
    >
      <h2
        style={{ textAlign: "center", margin: "40px 0px", fontWeight: "bold" }}
      >
        We provide everything you need
      </h2>

      <div className="how-it-works_provide_everything_items_container">
        <div className="how-it-works_provide_everything_row1_container">
          {row1content.map((card, index) => (
            <div className="how-it-works_provide_everything_card" key={index}>
              <div className="how-it-works_provide_everything_card_icon">
                {card.information.icon}
              </div>
              <div className="how-it-works_provide_everything_card_content">
                <h5>{card.information.title}</h5>
                <p>{card.information.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="how-it-works_provide_everything_row2_container">
          {row2content.map((card, index) => (
            <div className="how-it-works_provide_everything_card" key={index}>
              <div className="how-it-works_provide_everything_card_icon">
                {card.information.icon}
              </div>
              <div className="how-it-works_provide_everything_card_content">
                <h5>{card.information.title}</h5>
                <p>{card.information.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="how-it-works_provide_everything_row3_container">
          {row3content.map((card, index) => (
            <div className="how-it-works_provide_everything_card" key={index}>
              <div className="how-it-works_provide_everything_card_icon">
                {card.information.icon}
              </div>
              <div className="how-it-works_provide_everything_card_content">
                <h5>{card.information.title}</h5>
                <p>{card.information.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="accordion custom_accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button custom_accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              <FaCashRegister
                color="orange"
                size={30}
                style={{ width: "20px", marginRight: "20px" }}
              />
              Payments
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              {row1content.map((card, index) => (
                <div key={index}>
                  <li style={{ fontWeight: "bold" }}>
                    {card.information.title}
                  </li>
                  <p style={{ paddingLeft: "20px", fontSize: "14px" }}>
                    {card.information.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button custom_accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              <FaTools
                color="orange"
                size={30}
                style={{ width: "20px", marginRight: "20px" }}
              />
              Tools
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse show"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              {row2content.map((card, index) => (
                <div key={index}>
                  <li style={{ fontWeight: "bold" }}>
                    {card.information.title}
                  </li>
                  <p style={{ paddingLeft: "20px", fontSize: "14px" }}>
                    {card.information.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button custom_accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              <FaUsers
                color="orange"
                size={30}
                style={{ width: "20px", marginRight: "20px" }}
              />
              Support
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse show"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              {row3content.map((card, index) => (
                <div key={index}>
                  <li style={{ fontWeight: "bold" }}>
                    {card.information.title}
                  </li>
                  <p style={{ paddingLeft: "20px", fontSize: "14px" }}>
                    {card.information.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* <div className="container">
        <div className="row px-2 gap-3 d-flex justify-content-center mt-4">
          <button
            className="col-md-4 btn btn-primary py-md-3 py-2 "
            style={{ backgroundColor: "orange", fontWeight: "bold" }}
            type="button"
            onClick={handleStartFundRaise}
          >
            START A FUNDRAISER
          </button>
          <button
            className="col-md-4 btn btn-success py-md-3 py-2"
            style={{ fontWeight: "bold" }}
            type="button"
            onClick={handleBrowseFundRaise}
          >
            BROWSE FUNDRAISER
          </button>
        </div>
      </div> */}
    </div>
  );
}

export default ProvideEverything;
