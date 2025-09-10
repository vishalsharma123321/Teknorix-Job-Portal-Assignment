import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchFilters from '../components/SearchFilters';
import JobList from '../components/JobList';
import { fetchJobs, fetchDepartments, fetchLocations, fetchFunctions } from '../services/api';
import '../style/pages/jobListPage.scss';

const JobListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [lookups, setLookups] = useState({
    departments: [],
    locations: [],
    functions: []
  });
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    q: searchParams.get('q') || '',
    dept: searchParams.get('dept') || '',
    loc: searchParams.get('loc') || '',
    fun: searchParams.get('fun') || ''
  });

  useEffect(() => {
    loadLookups();
  }, []);

  useEffect(() => {
    loadJobs();
  }, [filters]);

  useEffect(() => {
    // Update URL params when filters change
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    setSearchParams(params);
  }, [filters, setSearchParams]);

  const loadLookups = async () => {
    try {
      const [departments, locations, functions] = await Promise.all([
        fetchDepartments(),
        fetchLocations(),
        fetchFunctions()
      ]);
      setLookups({ departments, locations, functions });
    } catch (error) {
      console.error('Error loading lookups:', error);
    }
  };

  const loadJobs = async () => {
    try {
      setLoading(true);
      const jobsData = await fetchJobs(filters);
      setJobs(jobsData);
    } catch (error) {
      console.error('Error loading jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const removeFilter = (filterKey) => {
    setFilters(prev => ({ ...prev, [filterKey]: '' }));
  };

  return (
    <div className="job-list-page">
      <div className="container">
        <SearchFilters
          filters={filters}
          lookups={lookups}
          onFilterChange={handleFilterChange}
          onRemoveFilter={removeFilter}
        />
        <JobList jobs={jobs} loading={loading} />
      </div>
    </div>
  );
};

export default JobListPage;