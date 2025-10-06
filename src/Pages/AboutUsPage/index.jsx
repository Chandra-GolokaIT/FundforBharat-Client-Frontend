import React from "react";
import PuttingHealthFirst from "../../Components/AboutUsComponents/PuttingHealthFirst";
import OurMission from "../../Components/AboutUsComponents/OurMission";
import HerosectionAboutUs from "../../Components/AboutUsComponents/HerosectionAboutUs";
import NeedForTheHour from "../../Components/AboutUsComponents/NeedForTheHour";
import WhatWeDoBetter from "../../Components/AboutUsComponents/WhatWeDoBetter";
import JoinUs from "../../Components/AboutUsComponents/JoinUs";

const AboutUs = () => {
  return (
    <div>
      <HerosectionAboutUs />
      <NeedForTheHour />
      <PuttingHealthFirst />
      <OurMission />
      <WhatWeDoBetter />
      <JoinUs />
    </div>
  );
};

export default AboutUs;
