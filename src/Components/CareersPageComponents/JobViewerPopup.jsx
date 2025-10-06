import React, { useEffect, useState } from "react";
import axios from "axios";
import { ADMIN_URL } from "../../constants/constant";
import "./styles.css";

const JobViewerPopup = ({ visible, onClose }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedJobId, setExpandedJobId] = useState(null); // <-- state to manage toggled job
  const token = localStorage.getItem("token");

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${ADMIN_URL}/api/admin/jobs/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJobs(response.data);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (visible) fetchJobs();
  }, [visible]);

  if (!visible) return null;

  const toggleDescription = (id) => {
    setExpandedJobId(expandedJobId === id ? null : id);
  };

  return (
    <div className="job-popup-overlay" onClick={onClose}>
      <div className="job-popup-container" onClick={(e) => e.stopPropagation()}>
        <div className="job-popup-header">
          <h3>🚀 Openings at Fund For Bharat</h3>
          <button className="close-button" onClick={onClose} aria-label="Close popup">
            ×
          </button>
        </div>

        {loading ? (
          <div className="job-loading">Loading...</div>
        ) : jobs.length === 0 ? (
          <div className="job-no-data">No job openings available.</div>
        ) : (
          <div className="job-cards-container">
            {jobs.map((job) => (
              <div className="job-card" key={job.id}>
                <div className="job-card-title">{job.designation}</div>
                <div className="job-tags">
                  <span className="job-tag">{job.jobType}</span>
                  <span className="job-tag">{job.experienceRequired}</span>
                </div>
                <div className="job-posted-date">Posted: {job.postedAt}</div>

                {/* Read More Section */}
                {expandedJobId === job.id && job.description && (
                  <p className="job-description">{job.description}</p>
                )}

                {job.description && (
                  <button
                    className="read-more-button"
                    onClick={() => toggleDescription(job.id)}
                  >
                    {expandedJobId === job.id ? "Read Less" : "Read More"}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobViewerPopup;
