import React, { useLayoutEffect, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { IoMedkitOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CurrencyToggle from "./CurrencyToggle";
import { isTokenExpired, logout } from "../../constants/isTokenExpired";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaHandHoldingHeart,
  FaRegBuilding,
  FaExclamationCircle,
  FaQuestionCircle
} from 'react-icons/fa';
import DynamicClientButton from "../DynamicButton Component/DynamicClientButton";
import "./Navbar.css";
import CurrencyDropdown from "./CurrencyDropdown";

const Navbar = ({ onCurrencyChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const jwtToken = localStorage.getItem("token");
  const fullName = localStorage.getItem("fullName");
  const imageUrl = localStorage.getItem("imageUrl");

  useEffect(() => {
    const checkTokenExpiry = () => {
      if (jwtToken && isTokenExpired(jwtToken)) {
        logout();
      }
    };
    checkTokenExpiry();
    const interval = setInterval(checkTokenExpiry, 60000);

    return () => clearInterval(interval);
  }, [jwtToken]);

  const handleNavCollapse = () => {
    const navbar = document.getElementById("navbarScroll");
    if (navbar.classList.contains("show")) {
      const bsCollapse = new window.bootstrap.Collapse(navbar, { toggle: true });
      bsCollapse.hide();
    }
  };

  const handleFundraiseForClick = (cause) => {
    navigate(`/fundraise-for/${cause}`);
  };

  const scrollToCategories = () => {
    const section = document.getElementById("category-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFundraiserCategoryClick = () => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollToCategories: true } });
    }
    else { scrollToCategories(); }
  }

  const getInitials = (name) => {
    if (!name) return '';
    const words = name.trim().split(' ');
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src="/images/Peet2.png" alt="logo" height="80px" />
        </Link>

        {/* Mobile Currency Dropdown (visible only on mobile) */}
        <div className="d-lg-none mobile-currency-container">
          <CurrencyDropdown onClick={handleNavCollapse} />
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarScroll">
          <div className="col-sm-7" id="res-search">
            <input
              type="text"
              className="form-control"
              placeholder="Type to Search"
              aria-label="City"
            />
          </div>
          <div className="navbar-till-startAfund">
            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll overflow-auto">
              <li className="nav-item">
                <Link
                  className="nav-link active "
                  aria-current="page"
                  to="/browsefundraisers"
                  onClick={handleNavCollapse}
                >
                  BrowseFundraisers
                </Link>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link active dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Donate
                </a>
                <ul className="dropdown-menu">
                  <div className="dropdown-list">
                    <a
                      className="dropdown-item d-flex align-items-center gap-2"
                      onClick={(e) => {
                        navigate("/discover");
                        handleNavCollapse();
                      }}
                    >
                      <FaHandHoldingHeart className="text-primary" size={20} />
                      <div className="dropdown-content">
                        <h6>Categories</h6>
                        <span>Browse fundraisers by categories</span>
                      </div>
                    </a>
                    <a
                      className="dropdown-item d-flex align-items-center gap-2"
                      href="#"
                      onClick={(e) => {
                        navigate("/social-impact");
                        handleNavCollapse();
                      }}
                    >
                      <FaRegBuilding className="text-primary" size={20} />
                      <div className="dropdown-content">
                        <h6>Social Impact Funds</h6>
                        <span>Support verified NGOs</span>
                      </div>
                    </a>
                    <a
                      className="dropdown-item d-flex align-items-center gap-2"
                      href="#"
                      onClick={() => {
                        navigate("/crisis-relief");
                        handleNavCollapse();
                      }}
                    >
                      <FaExclamationCircle className="text-danger" size={20} />
                      <div className="dropdown-content">
                        <h6>Crisis Relief</h6>
                        <span>Donate to verified relief</span>
                      </div>
                    </a>
                    <a
                      className="dropdown-item d-flex align-items-center gap-2"
                      href="#"
                      onClick={() => {
                        navigate("/supporter-space");
                        handleNavCollapse();
                      }}
                    >
                      <FaQuestionCircle className="text-success" size={20} />
                      <div className="dropdown-content">
                        <h6>Supporter Space</h6>
                        <span>Inspiration, FAQs and where to give</span>
                      </div>
                    </a>
                  </div>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link active dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Fundraise For
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => {
                        handleFundraiseForClick("Medical Treatment");
                        handleNavCollapse();
                      }}
                    >
                      Medical Treatment
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => {
                        handleFundraiseForClick("NGO & Charity");
                        handleNavCollapse();
                      }}
                    >
                      NGO / Charity
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => {
                        handleFundraiseForClick("Other Cause");
                        handleNavCollapse();
                      }}
                    >
                      Other Cause
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active "
                  aria-current="page"
                  to="/howitworks"
                  onClick={handleNavCollapse}
                >
                  How it works?
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active "
                  aria-current="page"
                  to={"/pricing"}
                  onClick={handleNavCollapse}
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div className="nav-buttons d-flex align-items-center" role="search">
{/* <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll overflow-auto"></ul> */}
            <button
              className="nav-btn mx-4"
              type="submit"
              id="fundraiser-btn"
              onClick={() => {
                navigate("/start-fundraiser");
                handleNavCollapse()
              }}
            >
              Start a Fundraiser
            </button>

            {/* Desktop Currency Dropdown (hidden on mobile) */}
            <div className="d-none d-lg-block">
              <CurrencyDropdown onClick={handleNavCollapse} />
            </div>

            {jwtToken ? (
              <div className="nav-item dropdown pfl-btn">
                <button
                  className="nav-btn mx-2 d-flex align-items-center"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div className="initials-avatar">
                    {imageUrl && imageUrl !== "null" && imageUrl !== "undefined" ? (
                      <img src={imageUrl} alt="Profile" className="profile-image" />
                    ) : (
                      <span>{getInitials(fullName)}</span>
                    )}
                  </div>
                  <span className="d-none d-sm-inline">{fullName}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end profile-dropdown-item">
                  <li>
                    <Link className="dropdown-item" to="/profile"
                      onClick={handleNavCollapse}>
                      <FaUser className="me-2" /> My Profile
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/login");
                        handleNavCollapse()
                      }}
                    >
                      <i className="fas fa-sign-out-alt me-2"></i> Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <button
                onClick={() => {
                  navigate("/login");
                  handleNavCollapse()
                }}
                className="nav-btn mx-2"
                type="submit"
                id="fundraiser-btn"
              >
                Sign In
              </button>
            )}
            <DynamicClientButton />
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel" style={{ color: "#d54400" }}>
                Search Fund for Bharat
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="modal-search-input">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by fundraisers, fundraiser creator, beneficiary or NGOs"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn"
                style={{ backgroundColor: "#d54400", color: "white" }}
              >
                Search <CiSearch size={22} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;