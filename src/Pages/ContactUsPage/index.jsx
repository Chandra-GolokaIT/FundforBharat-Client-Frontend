import React from "react";
import HeroSection from "../../Components/ContactUsPageComponents/HeroSection";
import MapSection from "../../Components/ContactUsPageComponents/MapSection";
import FormSection from "../../Components/ContactUsPageComponents/FormSection";
import "../../Components/ContactUsPageComponents/styles.css";
import ContactFormPage from "../../Components/ContactUsPageComponents/ContactFormPage";

function ContactUsPage() {
  return (
    <div>
      <HeroSection />
      <ContactFormPage />
      {/* <FormSection /> */}
      <MapSection />
    </div>
  );
}

export default ContactUsPage;
