import React, { useEffect, useState } from "react";
import "../MainSection/FundraisingProgress.css";
import { BASE_URL } from "../../../constants/constant.jsx";
import axios from "axios";
import { useCurrency } from "../../Layout/CurrencyContext.jsx";
const FundraisingProgress = ({ campaignId, donationCount, startDate }) => {
  // data coming from props
  const [campaignData, setCampaignData] = useState({
    percentFunded: 0,
    amountRaised: "₹ 0",
    targetAmount: "₹ 0",
    donorsCount: donationCount || 0,
    daysRunning: 0,
    circleRadius: 60,
    circleStrokeWidth: 8,
    circumference: 2 * Math.PI * 60,
  });
  console.log(donationCount);
  console.log("Start Date:", startDate);
  const { formatAmount } = useCurrency();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCampaignProgress = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/campaigns/getById/${campaignId}/progress`,
        );

        const data = response.data;

        if (startDate) {
          const daysRunning = Math.ceil(
            (new Date().setHours(0, 0, 0, 0) -
              new Date(startDate).setHours(0, 0, 0, 0)) /
            (1000 * 60 * 60 * 24)
          );

          // Calculate percentage but cap at 100%
          const percentFunded = Math.min(
            ((data.amountRaised || 0) / (data.targetAmount || 1)) * 100,
            100
          );

          setCampaignData(prev => ({
            ...prev,
            percentFunded: percentFunded.toFixed(0),
            amountRaised: data.amountRaised || 0,
            targetAmount: data.targetAmount || 0,
            donorsCount: donationCount || 0,
            daysRunning,
            isFullyFunded: data.amountRaised >= data.targetAmount
          }));
        }
      } catch (err) {

        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          "Failed to fetch campaign progress";
        setError(errorMessage);
        console.error("Error fetching campaign progress:", err);
      } finally {
        setLoading(false);
      }
    };

    if (startDate) {
      fetchCampaignProgress(); // Only fetch when startDate is actually defined
    }
  }, [campaignId, startDate, donationCount]);



  // loading part

  if (loading) {
    return (
      <div className="fundraising-progress relative" style={{ position: "relative", minHeight: "160px" }}>
        <div className="loading-spinner">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) return <div className="error-message">{error}</div>;

  const strokeDashoffset = campaignData.circumference * (1 - campaignData.percentFunded / 100);

  if (loading) {
    return (
      <div className="fundraising-progress">
        <div className="p-1 mt-1 mb-3 box-stick__border-light">
          <div className="progress-container">
            <div className="loading-spinner"></div>
            <div className="progress-details">
              <h4 className="raised-amount">
                <span className="amount-raised">Loading...</span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fundraising-progress">
      {/* Desktop View */}
      <div className="p-1 mt-1 mb-3 d-none d-sm-block box-stick__border-light">
        <div className="progress-container">
          <div className="circle-container">
            <svg
              viewBox="0 0 160 160"
              width="160"
              height="160"
              className="progress-circle"
            >
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#00bc9b" />
                  <stop offset="100%" stopColor="#6eb738" />
                </linearGradient>
              </defs>
              <circle
                className="progress-circle__background"
                cx="80"
                cy="80"
                r={campaignData.circleRadius}
                strokeWidth={campaignData.circleStrokeWidth}
                stroke="#f0f0f0"
                fill="transparent"
              />
              <circle
                className="progress-circle__fill"
                cx="80"
                cy="80"
                r={campaignData.circleRadius}
                strokeWidth={campaignData.circleStrokeWidth}
                stroke="url(#gradient)"
                fill="transparent"
                strokeLinecap="round"
                strokeDasharray={campaignData.circumference}
                strokeDashoffset={strokeDashoffset}
                transform="rotate(-90 80 80)"
              />
              {/* Percentage Text */}
              <text
                className="progress-percent"
                x="80"
                y="70"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#8d8d8d"
                fontSize="28"
              >
                {campaignData.percentFunded}%
              </text>

              {/* Funded Text */}
              <text
                className="progress-label"
                x="80"
                y="100"
                textAnchor="middle"
                fill="#8d8d8d"
                fontSize="12"
              >
                funded
              </text>

              {/* Days Text */}
              <text
                className="progress-days"
                x="80"
                y="115"
                textAnchor="middle"
                fill="#8d8d8d"
                fontSize="12"
              >
                in {campaignData.daysRunning} days
              </text>
            </svg>
          </div>
          <div className="progress-details">
            <h4 className="raised-amount">
              <span className="amount-raised">{formatAmount(campaignData.amountRaised)}</span>
              <span className="target-amount"> of {formatAmount(campaignData.targetAmount)}</span>

            </h4>
            <div className="donors-count">{donationCount} Donors</div>
          </div>
        </div>
      </div>


      {/* Mobile View */}
      <div className="d-block d-sm-none position-relative px-2"><div className="d-flex flex-column align-items-center py-3 gap-3">

        {/* Progress SVG */}
        <div className="text-center">
          <svg
            viewBox="0 0 160 120"
            width="120"
            height="100"
            className="progress-circle"
          >
            <defs>
              <linearGradient id="gradient-mobile" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00bc9b" />
                <stop offset="100%" stopColor="#6eb738" />
              </linearGradient>
            </defs>
            <circle
              cx="80"
              cy="60"
              r={campaignData.circleRadius}
              strokeWidth={campaignData.circleStrokeWidth}
              stroke="#f0f0f0"
              fill="transparent"
            />
            <circle
              cx="80"
              cy="60"
              r={campaignData.circleRadius}
              strokeWidth={campaignData.circleStrokeWidth}
              stroke="url(#gradient-mobile)"
              fill="transparent"
              strokeLinecap="round"
              strokeDasharray={campaignData.circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 80 60)"
            />
            <text
              x="80"
              y="60"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#8d8d8d"
              fontSize="20"
            >
              {campaignData.percentFunded}%
            </text>
            <text
              x="80"
              y="78"
              textAnchor="middle"
              fill="#8d8d8d"
              fontSize="10"
            >
              funded in {campaignData.daysRunning} days
            </text>
          </svg>
        </div>

        {/* Share buttons */}
        <div className="d-flex justify-content-center flex-wrap gap-2 w-100 px-3">
          <a href="javascript:void(0)" className="btn btn-sm text-white" style={{ backgroundColor: "#25D366" }}>
            <i className="fab fa-whatsapp me-2" /> WhatsApp
          </a>
          <a href="javascript:void(0)" className="btn btn-sm text-white" style={{ backgroundColor: "#4267B2" }}>
            <i className="fab fa-facebook-f me-2" /> Facebook
          </a>
          <a href="javascript:void(0)" className="btn btn-sm text-white" style={{ backgroundColor: "#1DA1F2" }}>
            <i className="fab fa-twitter me-2" /> Twitter
          </a>
          <a href="javascript:void(0)" className="btn btn-sm text-white" style={{ backgroundColor: "#0077B5" }}>
            <i className="fab fa-linkedin-in me-2" /> LinkedIn
          </a>
          <a href="javascript:void(0)" className="btn btn-sm text-white" style={{ backgroundColor: "#FF6600" }}>
            <i className="fas fa-envelope me-2" /> Email
          </a>
        </div>

        {/* Authenticity Section */}
        <div className="text-start w-100 px-3 mt-3">
          <h6 className="fw-bold">Promise of Authenticity</h6>
          <ul className="ps-3 small">
            <li>Campaigner and/or Beneficiary verified</li>
            <li>Donations will be transferred to the hospital/patient</li>
            <li>Case verified by the hospital/doctor/medical center</li>
            <li>Medical documents submitted</li>
            <li>Payments secured with 128-bit SSL encryption</li>
          </ul>
        </div>
      </div>
      </div>
    </div>
  );
};

export default FundraisingProgress;