import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaArrowRightLong } from "react-icons/fa6";
import { ADMIN_URL } from "../../constants/constant";
import CareerOpportunities from "./CareerOpportunities";
import "./styles.css";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    resume: null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  const jobRef = useRef(null);

  useEffect(() => {
    axios
      .get(`${ADMIN_URL}/api/admin/jobs/all`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setJobs(res.data);
        setAllJobs(res.data);
      })
      .catch((err) => console.error("Job fetch failed", err));
  }, []);

  const handleFilterChange = ({ jobType, designation }) => {
    const filtered = allJobs.filter((job) => {
      const typeMatch = jobType === "All" || job.jobType === jobType;
      const designationMatch = designation === "All" || job.designation === designation;
      return typeMatch && designationMatch;
    });
    setJobs(filtered);
  };

  const handleApply = (job) => {
    setSelectedJob(job);
    setMessage("");
    setFormData({ fullName: "", email: "", phone: "", resume: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.resume) {
      setMessage("All fields are required.");
      return;
    }

    try {
      setSubmitting(true);
      const payload = new FormData();
      payload.append("fullName", formData.fullName);
      payload.append("email", formData.email);
      payload.append("phone", formData.phone);
      payload.append("resume", formData.resume);
      payload.append("designation", selectedJob.designation);

      await axios.post(`${ADMIN_URL}/api/admin/applications/apply`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Application submitted successfully.");
      setSelectedJob(null);
    } catch (err) {
      console.error("Application failed:", err);
      setMessage("Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <CareerOpportunities jobRef={jobRef} onFilterChange={handleFilterChange} />

      <div className="jobs-wrapper">
        <h2 className="jobs-title">🚀 Current Job Openings</h2>

        {jobs.length === 0 ? (
          <p className="no-jobs-text">No job openings available at the moment.</p>
        ) : (
          jobs.map((job) => (
            <div className="job-card2" key={job.id}>
              <div className="job-title2">{job.designation}</div>
              <button className="apply-btn" onClick={() => handleApply(job)}>
                Apply <FaArrowRightLong />
              </button>
            </div>
          ))
        )}

        {selectedJob && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h3 className="modal-title">Apply for {selectedJob.designation}</h3>
              {message && <p className="message">{message}</p>}
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="form-input"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="form-input"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="form-input"
                />
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setFormData({ ...formData, resume: e.target.files[0] })}
                  className="form-input"
                />
                <div className="modal-actions">
                  <button type="button" className="cancel-btn" onClick={() => setSelectedJob(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn" disabled={submitting}>
                    {submitting ? "Submitting..." : "Submit Application"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Jobs;
