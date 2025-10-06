import React, { useEffect, useState } from "react";
import { RiMenuAddFill } from "react-icons/ri";
import axios from "axios";
import { ADMIN_URL } from "../../constants/constant";

const CareerOpportunities = ({ jobRef, onFilterChange }) => {
  const [jobTypes, setJobTypes] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [selectedJobType, setSelectedJobType] = useState("All");
  const [selectedDesignation, setSelectedDesignation] = useState("All");

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const res = await axios.get(`${ADMIN_URL}/api/admin/jobs/all`);
        const jobs = res.data;

        const uniqueJobTypes = [
          ...new Set(jobs.map((job) => job.jobType).filter(Boolean)),
        ];
        const uniqueDesignations = [
          ...new Set(jobs.map((job) => job.designation).filter(Boolean)),
        ];

        setJobTypes(uniqueJobTypes);
        setDesignations(uniqueDesignations);
      } catch (error) {
        console.error("Failed to fetch job filters", error);
      }
    };

    fetchFilters();
  }, []);

  const handleApplyFilters = () => {
    onFilterChange({
      jobType: selectedJobType,
      designation: selectedDesignation,
    });
  };

  return (
    <div className="p-5" style={{ background: "#d54400", color: "#fff" }} ref={jobRef}>
      <h2 className="text-center font-bold text-2xl mb-2">Career Opportunities</h2>
      <p className="text-center mb-4">
        Explore our open roles for working totally remotely, from the office or somewhere in between.
      </p>
      <div className="d-flex flex-wrap align-items-center justify-content-center gap-3">
        <div>
          <strong>Filter by:</strong>
        </div>

        <select
          className="form-select"
          value={selectedDesignation}
          onChange={(e) => setSelectedDesignation(e.target.value)}
        >
          <option value="All">All Designations</option>
          {designations.map((designation) => (
            <option key={designation} value={designation}>
              {designation}
            </option>
          ))}
        </select>

        <select
          className="form-select"
          value={selectedJobType}
          onChange={(e) => setSelectedJobType(e.target.value)}
        >
          <option value="All">All Job Types</option>
          {jobTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <button className="btn btn-light text-dark" onClick={handleApplyFilters}>
          Apply Filters
        </button>

        <div className="resp-filters" data-bs-toggle="offcanvas" href="#offcanvasExample">
          FILTERS <RiMenuAddFill size={25} />
        </div>
      </div>
    </div>
  );
};

export default CareerOpportunities;
