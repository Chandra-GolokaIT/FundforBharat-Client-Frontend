import React, { useState, useEffect } from "react";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { useCurrency } from "../Layout/CurrencyContext";
import axios from "axios";
import { BASE_URL } from "../../constants/constant";

const AllDonations = ({ campaignId, donationsList }) => {
  const [dropdown, setDropdown] = useState(false);
  const [donations, setDonations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [donationsPerPage] = useState(5);
  const { formatAmount } = useCurrency();

  // Update donations when donationsList changes
  useEffect(() => {
    console.log("Updating donations from donationsList:", donationsList);
    if (Array.isArray(donationsList)) {
      console.log("Donations List:", donationsList);
      setDonations(donationsList);
    }
  }, [donationsList]);

  // Calculate pagination
  const indexOfLastDonation = currentPage * donationsPerPage;
  const indexOfFirstDonation = indexOfLastDonation - donationsPerPage;
  const currentDonations = donations.slice(indexOfFirstDonation, indexOfLastDonation);
  const totalPages = Math.ceil(donations.length / donationsPerPage);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  // Handle sorting
  const sortDonations = (type) => {
    const sortedDonations = [...donations];
    if (type === "recent") {
      sortedDonations.sort((a, b) => new Date(b.donationDate) - new Date(a.donationDate));
    } else if (type === "highest") {
      sortedDonations.sort((a, b) => b.amount - a.amount);
    }
    setDonations(sortedDonations);
    setDropdown(false);
  };

  // If no donations yet, show message
  if (!donations.length) {
    return (
      <div className="all-donations card mb-4">
        <div className="card-body text-center">
          <p>No donations yet. Be the first one to donate!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="all-donations card mb-4">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5>All Donations ({donations.length})</h5>
        <div className="dropdown dropdown-center">
          <MdKeyboardArrowDown
            size={30}
            className="dropdown-toggle"
            onClick={() => setDropdown(!dropdown)}
            aria-expanded={dropdown}
          />
          {dropdown && (
            <ul className="dropdown-menu show">
              <li>
                <button className="dropdown-item" onClick={() => sortDonations("recent")}>
                  Recent
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={() => sortDonations("highest")}>
                  Highest Donations
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className="card-body">
        {currentDonations.map((donation, index) => (
          <div key={donation.id} className="d-flex align-items-center mb-2 gap-4">
            <span id="donor-icon">
              {donation.alias_name ? donation.alias_name.charAt(0).toUpperCase() : "A"}
            </span>
            <p>
              {formatAmount(donation.amount)} From{" "}
              {donation.alias_name || "Anonymous"}
            </p>
          </div>
        ))}
      </div>
      <div className="card-footer d-flex justify-content-between">
        <MdKeyboardArrowLeft
          size={25}
          style={{ color: "green", cursor: currentPage > 1 ? "pointer" : "not-allowed" }}
          onClick={prevPage}
        />
        <span style={{ color: "green" }}>
          {indexOfFirstDonation + 1} - {Math.min(indexOfLastDonation, donations.length)} of {donations.length} donations
        </span>
        <MdKeyboardArrowRight
          size={25}
          style={{ color: "green", cursor: currentPage < totalPages ? "pointer" : "not-allowed" }}
          onClick={nextPage}
        />
      </div>
    </div>
  );
};

export default AllDonations;