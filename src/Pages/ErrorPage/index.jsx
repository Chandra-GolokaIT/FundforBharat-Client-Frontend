import React from "react";
import BannerSection from "../../Components/ErrorPageComponents/BannerSection";
import Error404 from "../../Components/ErrorPageComponents/Error404";
import Redirects from "../../Components/ErrorPageComponents/Redirects";
// import HelpPages from "../../Components/ErrorPageComponents/HelpPages";


const ErrorPage = () => {
  return (
    <div >
      <BannerSection />
      <Error404 />
      <Redirects />
      {/* <HelpPages/> */}
      
    </div>
  );
};

export default ErrorPage;
