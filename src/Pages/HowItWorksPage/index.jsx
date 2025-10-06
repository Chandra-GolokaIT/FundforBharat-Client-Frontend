import React from "react";
import FormSection from "../../Components/HowItWorksComponents/FormSection";
import StartFundraiserSteps from "../../Components/HomepageComponents/StartFundraiserSteps";
import FAQ_HowItWorks from "../../Components/HowItWorksComponents/FAQ_HowItWorks";
import YouTubeSection from "../../Components/HowItWorksComponents/YouTubeSection";
import ProvideEverything from "../../Components/HowItWorksComponents/ProvideEverything";
import FlagSection from "../../Components/HowItWorksComponents/FlagSection";

const HowItWorksPage = () => {
  return (
    <div>
      <FlagSection />
      <FormSection />
      <YouTubeSection />
      {/* <StartFundraiserSteps /> */}
      <ProvideEverything />

      <FAQ_HowItWorks />
    </div>
  );
};

export default HowItWorksPage;
