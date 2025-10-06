import React, { useState, useEffect } from 'react';
import { CiSearch } from "react-icons/ci";
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import CategoriesContainer from "./CategoriesContainer.jsx";
import CardsContainer from "./CardsContainer.jsx";
import { BASE_URL } from "../../constants/constant";
import "./style.css";

function FilterSection() {
  const location = useLocation();
  const [campaigns, setCampaigns] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check for initial data from navigation
  useEffect(() => {
    if (location.state?.initialCampaigns) {
      setCampaigns(location.state.initialCampaigns);
      setActiveCategory(location.state.initialCategory || "All Categories");
    } else {
      // Load default campaigns if no initial data
      fetchDefaultCampaigns();
    }
  }, [location.state]);

  const fetchDefaultCampaigns = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/api/campaigns/get-all`);
      setCampaigns(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch campaigns. Please try again later.");
      setCampaigns([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategorySelect = async (categoryData, categoryName) => {
    setIsLoading(true);
    try {
      setActiveCategory(categoryName);
      setCampaigns(categoryData);
      setError(null);
    } catch (err) {
      setError(`Failed to load ${categoryName} campaigns`);
      setCampaigns([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCampaigns = campaigns.filter(campaign =>
    (campaign.title && campaign.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (campaign.description && campaign.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className='filter-section-container'>
      <CategoriesContainer onCategorySelect={handleCategorySelect} />
      <div style={{ width: '890px' }}>
        <div className='searchbar-container'>
          <input
            style={{ width: '100%' }}
            placeholder='Search for fundraisers'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className='searchicon-container'>
            <CiSearch size={25} />
          </div>
        </div>

        {isLoading ? (
          <div>Loading campaigns...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <CardsContainer campaigns={filteredCampaigns} activeCategory={activeCategory} />
        )}
      </div>
    </div>
  );
}

export default FilterSection;