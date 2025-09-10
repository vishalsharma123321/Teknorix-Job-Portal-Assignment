import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/components/JobList.scss';

const JobList = ({ jobs, loading }) => {
  const navigate = useNavigate();

  if (loading) {
    return <div className="loading">Loading jobs...</div>;
  }

  if (jobs.length === 0) {
    return <div className="no-jobs">No jobs found</div>;
  }

  // Group jobs by department
  const jobsByDepartment = jobs.reduce((acc, job) => {
    const deptTitle = job.department?.title || 'Other';
    if (!acc[deptTitle]) {
      acc[deptTitle] = [];
    }
    acc[deptTitle].push(job);
    return acc;
  }, {});

  const handleApply = (job) => {
    if (job.applyUrl) {
      window.open(job.applyUrl, '_blank');
    }
  };

  const handleView = (job) => {
    navigate(`/jobs/${job.id}`);
  };

  return (
    <div className="job-list">
      {Object.entries(jobsByDepartment).map(([department, departmentJobs]) => (
        <div key={department} className="department-section">
          <h2 className="department-title">{department}</h2>
          
          <div className="jobs-grid">
            {departmentJobs.map((job) => (
              <div key={job.id} className="job-card">
                <h3 className="job-title">{job.title}</h3>
                
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

                <div className="job-actions">
                  <button
                    className="apply-btn"
                    onClick={() => handleApply(job)}
                  >
                    Apply
                  </button>
                  <button
                    className="view-btn"
                    onClick={() => handleView(job)}
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobList;