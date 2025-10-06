import React from "react";
import icon1 from "../../assets/images/icons-03.webp";
import icon2 from "../../assets/images/icons-01.webp";
import icon3 from "../../assets/images/icons-04.webp";

const WhatMakesGemDiffer = () => {
  return (
    <div className="gem-features ">
      <h4 className="text-center">
        <b>What Makes Life Patron Subscription Different?</b>
      </h4>
      <div className="heading-border mx-auto my-4"></div>
      <div className="gem-features-card">
        <div className="card">
          <div>
            <img src={icon1} />
          </div>

          <div>
            <h4>Receive tokens of gratitude</h4>
            <h4>like letters, videos from patients you helped.</h4>
          </div>
        </div>
        <div className="card">
          <div>
            <img src={icon2} />
          </div>
          <div>
            <h4>Join an exclusive community</h4>
            <h4>of changemakers like you.</h4>
          </div>
        </div>
        <div className="card">
          <div>
            <img src={icon3} />
          </div>
          <div>
            <h4>Unlock rewards</h4>
            <h4>like insurance, vouchers & the smiles of people you help!</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatMakesGemDiffer;
