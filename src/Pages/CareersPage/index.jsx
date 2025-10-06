import React, { useRef } from "react";
import HeroSection from "../../Components/CareersPageComponents/HeroSection";
import FutureWorks from "../../Components/CareersPageComponents/FutureWorks";
import CoreValuesContainer from "../../Components/CareersPageComponents/CoreValuesContainer";
import CareerOpportunities from "../../Components/CareersPageComponents/CareerOpportunities";
import Jobs from "../../Components/CareersPageComponents/Jobs";
import CurveSection from "../../Components/CareersPageComponents/CurveSection";
import ProgrammeEnvironment from "../../Components/CareersPageComponents/ProgrammeEnvironment";


function index() {

  return (
    <div>
      <HeroSection/>
      <FutureWorks />
      <CoreValuesContainer />
      <Jobs/>

    
    </div>
  );
}

export default index;
