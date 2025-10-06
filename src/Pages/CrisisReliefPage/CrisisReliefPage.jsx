import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CrisisRelief.css'; // Assuming you have a CSS file for styling
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../constants/constant';

const CrisisReliefPage = () => {
  const [reliefs, setReliefs] = useState([]);
  const navigate = useNavigate();

  const fetchReliefs = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/crisis-relief/published`);
      setReliefs(response.data);
    } catch (error) {
      console.error('Error fetching crisis reliefs', error);
    }
  };

  useEffect(() => {
    fetchReliefs();
  }, []);

  return (
    <div className="supporter-space" style={{ paddingTop: "160px" }}>
      <div className="header-section">
        <div className="header-content">
          <div className="header-text">
            <h1>Crisis Relief</h1>
            <p>Support communities in urgent need by contributing to active relief efforts.</p>
          </div>
          <div className="header-image">
            <img src="https://media.istockphoto.com/id/1432207284/photo/senior-woman-receiving-a-blanket-from-a-soldier-at-a-community-center.jpg?s=1024x1024&w=is&k=20&c=ds36K5RizoZqxQl3ojVkE96owDG46vMLNeUrmKzRhsU=" alt="Crisis help" />
          </div>
        </div>
      </div>

      <div className="featured-section">
        <div className="featured-grid">
          {reliefs.map((relief) => (
            <div key={relief.id} className="featured-card" onClick={() => navigate(`/crisis/${relief.id}`)} role="button">
              <div className="card-image">
                <img src={relief.imageUrl} alt={relief.title} />
              </div>
              <div className="card-info">
                <h3>{relief.title}</h3>
                <p>{relief.description}</p>
                <div className="author">
                  <span>by Admin Team</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CrisisReliefPage;
