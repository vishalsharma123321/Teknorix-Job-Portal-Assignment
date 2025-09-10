import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchJobDetails, fetchJobs } from '../services/api';
import SocialShare from '../components/SocialShare';
import '../style/pages/jobDetails.scss';

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
      
      // Load other jobs from the same department
      if (jobData.department?.id) {
        const otherJobsData = await fetchJobs({ dept: jobData.department.id });
        setOtherJobs(otherJobsData.filter(j => j.id !== jobData.id).slice(0, 4));
      }
    } catch (error) {
      console.error('Error loading job details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (job?.applyUrl) {
      window.open(job.applyUrl, '_blank');
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
            <button onClick={() => navigate('/')} className="back-btn">
              ← Back to Jobs
            </button>
          </div>
          
          <div className="job-title-section">
            <p className="department-info">
              {job.department?.title} Department At Teknorix Systems {job.location?.city}
            </p>
            <h1 className="job-title">{job.title}</h1>
            
            <div className="job-meta">
              <span className="meta-item">
                <i className="icon-department"></i>
                {job.department?.title}
              </span>
              <span className="meta-item">
                <i className="icon-location"></i>
                {job.location?.city}, {job.location?.state}
              </span>
              <span className="job-type">{job.type}</span>
            </div>
            
            <button className="apply-btn primary" onClick={handleApply}>
              Apply
            </button>
          </div>
        </div>

        <div className="job-content">
          <div className="job-description">
            <div dangerouslySetInnerHTML={{ __html: job.description }} />
          </div>

          <div className="sidebar">
            <div className="other-jobs">
              <h3>OTHER JOB OPENINGS</h3>
              <div className="other-jobs-list">
                {otherJobs.map((otherJob) => (
                  <div key={otherJob.id} className="other-job-item">
                    <h4>{otherJob.title}</h4>
                    <div className="job-meta">
                      <span className="meta-item">
                        <i className="icon-department"></i>
                        {otherJob.department?.title}
                      </span>
                      <span className="meta-item">
                        <i className="icon-location"></i>
                        {otherJob.location?.city}, {otherJob.location?.state}
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