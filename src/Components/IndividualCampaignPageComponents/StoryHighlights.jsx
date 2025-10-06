import React, { useState, useEffect } from "react";
import img from "../../assets/images/bg1.jpg";
import { useParams } from "react-router-dom"
import { BASE_URL } from "../../constants/constant";
import axios from "axios";
const StoryHighlights = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/api/campaigns/getById/${id}`);
        setCampaigns(response.data);
        console.log("response", response.data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    }
    loadCampaigns();
  }
    , []);
  const handleReadMore = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className="story-highlights card">
      <div className="card-header">
        <h5>Story</h5>
      </div>
      <div className="card-body">
        <p>
          <b>Highlights:</b>{" "}
        </p>
        {campaigns.text}
      </div>

      {/*} This part for read more functionality is commented out, you can uncomment it if needed
     {isExpanded && (
        <div className="px-4">
          <p>
            <b>How these therapies help Ujjwala:</b>
            <br />
            With your continued support, Ujjwala has made significant progress
            in her recovery. However, the journey is long, and she still needs
            regular medical attention and therapy sessions. Your donations
            directly impact her ability to access these vital services.
          </p>
          <ol>
            <li>
              <b>Physiotherapy: </b>
              Techniques such as stretching exercises, manual therapy, and
              positioning can help reduce Ujjwala’s muscle spasticity. This can
              improve comfort and mobility her.
            </li>
            <li>
              <b>Swallow therapy: </b>
              Techniques such as stretching exercises, manual therapy, and
              positioning can help reduce Ujjwala’s muscle spasticity. This can
              improve comfort and mobility her.
            </li>
          </ol>
        </div>
      )}
 */}

      <div className="d-flex justify-content-center">
        <button className="btn" onClick={handleReadMore}>
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      </div>
    </div>
  );
};

export default StoryHighlights;
