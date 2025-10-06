import React from "react";
import BannerSection from "../../Components/HomepageComponents/BannerSection";
import FundraiserCalculator from "../../Components/HomepageComponents/FundraiserCalculator";
import WhyChooseUs, {
  PricingBottomStrip,
} from "../../Components/PricingPageComponents/WhyChooseUs";

const PricingPage = () => {
  return (
    <div style={{ paddingTop: "150px" }}>
      <BannerSection />
      <FundraiserCalculator />
      <WhyChooseUs />
      <PricingBottomStrip />
    </div>
  );
};

export default PricingPage;
