import React from 'react'
import WhyFFB from './WhyFFB'
import "./styles.css";
import SuccessStories from './SuccessStories';
import FeaturedIn from './FeaturedIn';

const CompanyPortfolioComponent = () => {
  return (
    <div className="container mt-5 p-6 company-portfolio-container-width">
      <div className='row'><WhyFFB /></div>
      {/* <div className="row"><SuccessStories/></div> */}
      {/* <div className="row"><FeaturedIn/></div> */}
    </div>
  )
}

export default CompanyPortfolioComponent