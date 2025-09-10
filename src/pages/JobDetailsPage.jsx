import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  HiOfficeBuilding,
  HiLocationMarker,
  HiArrowLeft,
  HiCalendar,
  HiUsers,
  HiCurrencyDollar,
  HiClock,
  HiBriefcase,
} from "react-icons/hi";
import { fetchJobDetails, fetchJobs } from "../services/api";
import SocialShare from "../components/SocialShare";
import "../style/pages/jobDetails.scss";

const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [otherJobs, setOtherJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJobDetails();
  }, [id]);

  const loadJobDetails = async () => {
    try {
      setLoading(true);
      const jobData = await fetchJobDetails(id);
      setJob(jobData);

      // Load other jobs - try department first, then industry, then just get random jobs
      let otherJobsData = [];
      if (jobData.department?.id) {
        otherJobsData = await fetchJobs({ dept: jobData.department.id });
      } else {
        // If no department, get all jobs and filter by industry or just get some jobs
        const allJobs = await fetchJobs();
        otherJobsData = allJobs.filter(
          (j) =>
            j.id !== jobData.id &&
            (j.industry === jobData.industry ||
              j.location?.city === jobData.location?.city)
        );
      }

      setOtherJobs(otherJobsData.slice(0, 4));
    } catch (error) {
      console.error("Error loading job details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (job?.applyUrl) {
      window.open(job.applyUrl, "_blank");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (e) {
      return "Not specified";
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!job) {
    return <div className="error">Job not found</div>;
  }

  return (
    <div className="job-details-page">
      <div className="container">
        <div className="job-header">
          <div className="breadcrumb">
            <button onClick={() => navigate("/")} className="back-btn">
              <HiArrowLeft size={16} />
              Back to Jobs
            </button>
          </div>

          <div className="job-title-section">
            <p className="department-info">
              {job.department?.title || job.industry}{" "}
              {job.company && `At ${job.company}`} {job.location?.city}
            </p>
            <h1 className="job-title">{job.title}</h1>

            <div className="job-meta">
              <span className="meta-item">
                <HiOfficeBuilding className="meta-icon" />
                {job.department?.title || job.industry || "General"}
              </span>
              <span className="meta-item">
                <HiLocationMarker className="meta-icon" />
                {job.location?.city
                  ? `${job.location.city}, ${job.location.state}`
                  : "Location not specified"}
              </span>
              {job.type && <span className="job-type">{job.type}</span>}
              {job.experience && (
                <span className="meta-item">
                  <HiUsers className="meta-icon" />
                  {job.experience}
                </span>
              )}
              {job.salary && (
                <span className="meta-item">
                  <HiCurrencyDollar className="meta-icon" />
                  {job.salary}
                </span>
              )}
              <span className="meta-item">
                <HiCalendar className="meta-icon" />
                Posted: {formatDate(job.postedDate)}
              </span>
              {job.closingDate && (
                <span className="meta-item">
                  <HiClock className="meta-icon" />
                  Closes: {formatDate(job.closingDate)}
                </span>
              )}
              {job.positions > 0 && (
                <span className="meta-item">
                  <HiBriefcase className="meta-icon" />
                  {job.positions} Position{job.positions > 1 ? "s" : ""}
                </span>
              )}
            </div>

            <button className="apply-btn primary" onClick={handleApply}>
              Apply
            </button>
          </div>
        </div>

        <div className="job-content">
          <div className="job-description">
            {/* Job Info Cards */}
            <div className="job-info-cards">
              <div className="info-card">
                <h4>Posted Date</h4>
                <p>{formatDate(job.postedDate)}</p>
              </div>
              <div className="info-card">
                <h4>Job ID</h4>
                <p>{job.id}</p>
              </div>
              <div className="info-card">
                <h4>Location</h4>
                <p>{job.location?.title || "Not specified"}</p>
              </div>
              <div className="info-card">
                <h4>Positions</h4>
                <p>{job.positions || "Not specified"}</p>
              </div>
              {job.industry && (
                <div className="info-card">
                  <h4>Industry</h4>
                  <p>{job.industry}</p>
                </div>
              )}
              {job.company && (
                <div className="info-card">
                  <h4>Company</h4>
                  <p>{job.company}</p>
                </div>
              )}
            </div>

            <div className="job-description-content">
              <div dangerouslySetInnerHTML={{ __html: job.description }} />
            </div>
          </div>

          <div className="sidebar">
            {otherJobs.length > 0 && (
              <div className="other-jobs">
                <h3>OTHER JOB OPENINGS</h3>
                <div className="other-jobs-list">
                  {otherJobs.map((otherJob) => (
                    <div key={otherJob.id} className="other-job-item">
                      <h4>{otherJob.title}</h4>
                      <div className="job-meta">
                        <span className="meta-item">
                          <HiOfficeBuilding className="meta-icon" />
                          {otherJob.department?.title ||
                            otherJob.industry ||
                            "General"}
                        </span>
                        <span className="meta-item">
                          <HiLocationMarker className="meta-icon" />
                          {otherJob.location?.city
                            ? `${otherJob.location.city}, ${otherJob.location.state}`
                            : "Location not specified"}
                        </span>
                      </div>
                      <button
                        className="view-job-btn"
                        onClick={() => navigate(`/jobs/${otherJob.id}`)}
                      >
                        View
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="social-share">
              <h3>SHARE JOB OPENINGS</h3>
              <SocialShare job={job} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
