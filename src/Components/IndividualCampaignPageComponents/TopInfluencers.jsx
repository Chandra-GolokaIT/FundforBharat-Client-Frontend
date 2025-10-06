import React, { useMemo } from "react";
import { useCurrency } from "../Layout/CurrencyContext";

const TopInfluencers = ({ donationsList }) => {
  const { formatAmount } = useCurrency();

  // Get top 3 donors sorted by amount
  const topDonors = useMemo(() => {
    if (!Array.isArray(donationsList)) return [];
    
    return [...donationsList]
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3);
  }, [donationsList]);

  const openDonateModal = () => {
    const donateModal = new window.bootstrap.Modal(
      document.getElementById("donate-now-form"),
      {
        keyboard: false,
      }
    );
    donateModal.show();
  };

  return (
    <div className="top-influencers card mb-3">
      <div className="card-header">
        <h5>Top Donors</h5>
      </div>
      
      {topDonors.length > 0 ? (
        topDonors.map((donor, index) => (
          <div key={donor.id || index} className="card-body d-flex align-items-start gap-4">
            <span id="donor-icon">
              {donor.alias_name ? donor.alias_name.charAt(0).toUpperCase() : "A"}
            </span>
            <p>
              {index + 1}{getOrdinalSuffix(index + 1)} Donor <br />
              <hr />
              {donor.alias_name || "Anonymous"}
              <br />
              {formatAmount(donor.amount)}
            </p>
          </div>
        ))
      ) : (
        <div className="card-body text-center">
          <p>No donations yet. Be the first one to donate!</p>
        </div>
      )}

      <div className="card-footer d-flex justify-content-center">
        <button className="donate-btn" onClick={openDonateModal}>
          <b>Donate Now</b> <br />
          <i style={{ fontSize: "10px" }}>indian tax benefits available</i>
        </button>
      </div>
    </div>
  );
};

// Helper function to add ordinal suffixes (1st, 2nd, 3rd)
const getOrdinalSuffix = (num) => {
  const j = num % 10;
  const k = num % 100;
  if (j === 1 && k !== 11) return "st";
  if (j === 2 && k !== 12) return "nd";
  if (j === 3 && k !== 13) return "rd";
  return "th";
};

export default TopInfluencers;