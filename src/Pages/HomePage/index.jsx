import React, { useState, useEffect, useRef } from "react";
import StartFundraiserSteps from "../../Components/HomepageComponents/StartFundraiserSteps";
import FAQs from "../../Components/HomepageComponents/FAQs";
import TalkToUs from "../../Components/HomepageComponents/TalkToUs";
import HospitalServices from "../../Components/HomepageComponents/HospitalServices";
import Affiliate from "../../Components/HomepageComponents/AffilateComponent/index";
import CompanyPortfolio from "../../Components/HomepageComponents/CompanyPortfolioComponent/index";
import WhyFundRaiseComponent from "../../Components/HomepageComponents/WhyFundRaiserComponent.jsx";
import HeroSection from "../../Components/HomepageComponents/HeroSection.jsx";
import Testimonials from "../../Components/HomepageComponents/Testimonials.jsx";
import Testimonials2 from "../../Components/HomepageComponents/Testimonials2.jsx";
import Strip12 from "../../Components/HomepageComponents/Strip.jsx";
import CallToAction from "../../Components/HomepageComponents/CallToAction.jsx";
import BannerSection from "../../Components/HomepageComponents/BannerSection.jsx";
import FundraiserCalculater from "../../Components/HomepageComponents/FundraiserCalculator.jsx";
import TrendingFundraiser from "../../Components/HomepageComponents/TrendingFundraiser.jsx";
import SuccessStories from "../../Components/HomepageComponents/CompanyPortfolioComponent/SuccessStories.jsx";
import DonationForm from "../../Components/HomepageComponents/DonationForm/DonationForm.jsx"; // Path to your DonationForm component
import CategorySection from "../../Components/HomepageComponents/CategorySection.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import EducationalFundraiser from "../../Components/HomepageComponents/EducationalFundraiser.jsx";
import Navbar from "../../Components/Layout/Navbar"; // make sure this is at the top

let didPopUp = false;

const HomePage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [currency, setCurrency] = useState("INR"); // 👈 currency state
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const location = useLocation();
  const subscribeRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.scrollToCategories) {
      const section = document.getElementById("category-section");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  useEffect(() => {
    if (!didPopUp) {
      didPopUp = true;
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  // const handleCategorySelect = (campaigns, categoryName) => {
  //   setFilteredCampaigns(campaigns);
  //   setCurrentCategory(categoryName);
  // };

  const handleCategorySelect = (campaigns, categoryName) => {
    navigate("/browseFundraisers", {
      state: {
        initialCampaigns: campaigns,
        initialCategory: categoryName,
      },
    });
  };

  const handleClose = () => setShowPopup(false);

  return (
    <div>
      <Navbar onCurrencyChange={setCurrency} />
      <HeroSection />
      <Strip12 />
      {/* <TrendingFundraiser currency={currency} /> */}
      <TrendingFundraiser
        currency={currency}
        category={currentCategory}
        campaigns={filteredCampaigns.length ? filteredCampaigns : null}
      />
      <BannerSection />
      {/* <CategorySection
        // onCategorySelect={handleCategorySelect}
        onClick={(e) => navigate("/discover")} /> */}
      <CategorySection onCategorySelect={handleCategorySelect} />
      <CompanyPortfolio />
      <SuccessStories />
      <EducationalFundraiser />
      <Testimonials2 />
      <FAQs />
      <TalkToUs />
      <HospitalServices />
      <CallToAction subscribeRef={subscribeRef} />
    </div>
  );
};

export default HomePage;
