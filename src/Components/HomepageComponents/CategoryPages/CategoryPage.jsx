import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import "./CategoryPage.css";
import { BASE_URL } from "../../../constants/constant";

export default function CategoryPage() {
  const { category } = useParams();
  const [fundraisers, setFundraisers] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchFundraisers = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/campaigns/getByCategory/${category}`);
        const data = await response.json();
        setFundraisers(data);
      } catch (error) {
        console.error("Error fetching fundraisers:", error);
      }
    };
    fetchFundraisers();
  }, [category]);



  return (
    <div className="category-page">
      <section className="intro">
        <div>
          <h1>Discover {category} fundraisers on Fund For Bharat</h1>
          <p>Help others by donating to their fundraiser, or start one for someone you care about.</p>
          <button className="start-btn">Start a Donation</button>
        </div>
        <img src="/images/circle1.png" alt="Banner" />
      </section>

      <section className="fundraiser-grid">
        <h2>Browse {category} fundraisers</h2>

        {fundraisers.length === 0 ? (
          <p>No fundraisers found in this category.</p>
        ) : (
          <div className="fundraisers">
            {fundraisers.map((item, idx) => (
              <div className="card" key={idx} onClick={() => navigate(`/individualcampaign/${item.id}`)} style={{ cursor: "pointer" }}>
                <img
                  src={item.img || "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"}
                  alt={item.title || "Fundraiser"}
                />
                <h3>{item.title}</h3>
                <p className="raised">{item.amountRaised} raised</p>
                <div className="progress-bar-container">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${Math.min(
                        Math.round(((item.amountRaised + 20000) / item.targetAmount) * 100),
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
