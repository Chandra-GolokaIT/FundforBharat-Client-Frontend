// FundForBharat.jsx
import React from 'react';
import './Socialimpact.css';
import { useNavigate } from 'react-router-dom';

const SocialImpactComponent = () => {
  const navigate = useNavigate();
  const funds = [
    {
      id: 1,
      title: "The Education and Opportunity Fund",
      description: "Teachers often spend their own money to give their students the best learning experience possible. The Education Opportunity Fund supports educators and organizations dedicated to helping students grow—from supplying pens and books to providing meals so students can stay engaged throughout the day.",
      image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "The Essentials Fund",
      description: "Every day, hundreds of Indians start fundraisers for basic necessities like food, housing, and utilities. The Essentials Fund distributes cash grants to help individuals make ends meet and find paths to stability.",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "The Weather Resilience Fund",
      description: "Climate change and extreme weather events disproportionately affect vulnerable communities across India. This fund provides emergency relief and long-term support for families recovering from floods, droughts, cyclones, and other natural disasters.",
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "The Healthcare Access Fund",
      description: "Medical emergencies can devastate families financially. This fund helps bridge the gap for those who cannot afford critical healthcare, supporting both emergency medical treatments and ongoing healthcare needs for underserved communities.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="container">
      {/* Header Section */}
      <div className="header">
        <div className="header-content">
          {/* <p className="subtitle">Direct support for urgent needs</p> */}
          <h1 className="main-title">
            Social Impact Funds<br />
            Powered by<br />
            <span className="brand-name">FundForBharat.org</span>
          </h1>
          <div>
            <p className="description">
              FundForBharat is committed to caring for the needs we see on our platform every day: education equality,
              weather resilience, healthcare access, and access to life's essentials.
            </p>
            <p className="disclaimer">
              We are proud to support these funds — and hope you will consider doing so, too. Donations to these
              social impact funds go directly to grants to individuals in need, and in some cases, organizations working
              to provide aid or promote critical social change. Grants are distributed by our strategic nonprofit
              partner, <span className="underline">FundForBharat.org</span>. FundForBharat.org is an independent and publicly-supported 501(c)(3) nonprofit
              organization that leverages our technology, services, and other resources at no charge to carry out its
              charitable purpose.
            </p>
          </div>
        </div>
      </div>

      {/* Funds Section */}
      <div className="funds-section">
        {funds.map((fund, index) => (
          <div key={fund.id} className="fund-card">
            <div className={`fund-content ${index % 2 === 1 ? 'reverse' : ''}`}>
              {/* Image */}
              <div
                className="fund-image"
                style={{ backgroundImage: `url(${fund.image})` }}
              />

              {/* Content */}
              <div className="fund-text">
                <h2 className="fund-title">
                  {fund.title}
                </h2>
                <p className="fund-description">
                  {fund.description}
                </p>
                {/* <button className="donate-button">
                  Donate
                </button> */}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action Section */}
      <div className="cta-section">
        <div className="cta-content">
          <h3 className="cta-title">
            Join the movement for social change
          </h3>
          <p className="cta-description">
            Your contribution helps create lasting impact in communities across India.
            Every donation makes a difference in someone's life.
          </p>
          <div className="cta-buttons">
            {/* <button
              className="cta-button-primary"
              onClick={() => navigate('/start-fundraiser')}
            >
              Start a Campaign
            </button> */}
            <button className="cta-button-secondary">
              Learn More
            </button>
          </div>
        </div>
      </div>


    </div>
  );
};

export default SocialImpactComponent;