import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOfficeBuilding, HiLocationMarker, HiCalendar, HiUsers, HiCurrencyDollar } from 'react-icons/hi';
import '../style/components/JobList.scss';

const JobList = ({ jobs, loading }) => {
  const navigate = useNavigate();

  if (loading) {
    return <div className="loading">Loading jobs...</div>;
  }

  if (jobs.length === 0) {
    return <div className="no-jobs">No jobs found</div>;
  }

  const jobsByDepartment = jobs.reduce((acc, job) => {
    const deptTitle = job.department?.title || job.industry || 'General';
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

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      return 'Not specified';
    }
  };

  return (
    <div className="job-list">
      {Object.entries(jobsByDepartment).map(([department, departmentJobs]) => (
        <div key={department} className="department-section">
          <h2 className="department-title">{department}</h2>
          
          <div className="jobs-container">
            {departmentJobs.map((job) => (
              <div key={job.id} className="job-item">
                <div className="job-content">
                  <h3 className="job-title">{job.title}</h3>
                  
                  <div className="job-meta">
                    <span className="meta-item">
                      <HiOfficeBuilding className="meta-icon" />
                      {job.department?.title || job.industry || 'General'}
                    </span>
                    <span className="meta-item">
                      <HiLocationMarker className="meta-icon" />
                      {job.location?.city ? `${job.location.city}, ${job.location.state}` : 'Location not specified'}
                    </span>
                    {job.type && (
                      <span className="job-type">{job.type}</span>
                    )}
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
                  </div>
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