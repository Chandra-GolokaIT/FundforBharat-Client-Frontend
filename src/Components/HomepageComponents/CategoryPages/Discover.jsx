import React, { useEffect, useState, useContext } from "react";
import { CategoryContext } from "../../Context/CategoryContext";
import CategorySection from "../CategorySection";
import { useNavigate } from "react-router-dom";
import "./Discover.css";
import TrendingFundraiser from "../TrendingFundraiser";
import { BASE_URL } from "../../../constants/constant";
import discimg from "../../../../src/assets/images/discover_image1.jpeg";
import "../../../../src/assets/styles/TrendingFundraiser.css";
import "../../../../src/Components/HomepageComponents/CategorySection.css"

const Discover = () => {
  const navigate = useNavigate();
  const { categories } = useContext(CategoryContext);

  const [campaignsByCategory, setCampaignsByCategory] = useState({});

  // Util to convert category name to route/slug
  const generateRoute = (name) =>
    name.toLowerCase().replace(/ & /g, " and ").replace(/\s+/g, "-");

  useEffect(() => {
    const fetchCampaigns = async () => {
      const results = {};

      for (let category of categories) {
        const categoryName = category.name;

        try {
          const endpoint =
            categoryName === "All Campaigns"
              ? `${BASE_URL}/api/campaigns/get-all`
              : `${BASE_URL}/api/campaigns/getByCategory/${generateRoute(categoryName)}`;

          const response = await fetch(endpoint);

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();

          if (Array.isArray(data) && data.length > 0) {
            console.log(`[${categoryName}] First campaign sample:`, data[0]);
          }

          results[categoryName] = data;
        } catch (err) {
          console.error(`Error fetching ${categoryName} campaigns:`, err);
          results[categoryName] = [];
        }
      }

      setCampaignsByCategory(results);
    };

    if (categories.length > 0) {
      fetchCampaigns();
    }
  }, [categories]);

  const handleCategorySelect = (campaigns, categoryName) => {
    navigate("/browseFundraisers", {
      state: {
        initialCampaigns: campaigns,
        initialCategory: categoryName,
      },
    });
  };

  return (
    <div style={{ padding: "100px 0 0 0" }}>
      {/* Hero Section with Background Image */}
      <section
        className="pt-20 mobile-header"
        style={{
          backgroundImage: `url(${discimg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '400px',
          display: 'flex',
          alignItems: 'center',
          color: 'white',
          position: 'relative',
          marginBottom: '40px'
        }}
      >
        {/* Dark overlay for better text readability */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.4)',
          zIndex: 1,
        }}></div>

        <div style={{
          position: 'relative',
          zIndex: 2,
          padding: '0 40px',
          maxWidth: '800px',
          textAlign: 'left',
          marginLeft: '5%'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            textShadow: '1px 1px 3px rgba(0,0,0,0.5)'
          }}>
            Discover
            <br />
            Fundraisers
          </h1>
          <p style={{
            fontSize: '1.2rem',
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
            maxWidth: '600px'
          }}>
            People around the world are raising money for what they are
            passionate about. Take a look.
          </p>
        </div>
      </section>

      {/* Category Grid Section */}

      <CategorySection onCategorySelect={handleCategorySelect} />


      {/* Category-wise Trending Sections */}
      {categories.map((cat) => {
        const campaigns = campaignsByCategory[cat.name] || [];

        return (
          <section
            key={cat.id || cat.name}
            className="bg-gray-50 py-10 px-4 md:px-16 category-carousel-section"
            style={{ marginBottom: "40px" }}
          >
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "10px",
                color: "#333"
              }}
            >
              {cat.name}
            </h2>

            {campaigns.length === 0 ? (
              <div
                style={{
                  backgroundColor: "#e0f2fe",
                  color: "#0369a1",
                  padding: "16px",
                  borderRadius: "8px",
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                Sorry, we don't have this type of fundraiser right now.
              </div>
            ) : (
              <TrendingFundraiser campaigns={campaigns} category={cat.name} />
            )}
          </section>
        );
      })}
    </div>
  );
};

export default Discover;