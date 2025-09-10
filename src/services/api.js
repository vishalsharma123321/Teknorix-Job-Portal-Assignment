import axios from 'axios';

const API_BASE_URL = 'https://demo.jobsoid.com/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const fetchJobs = async (filters = {}) => {
  try {
    const params = {};
    if (filters.q) params.q = filters.q;
    if (filters.dept) params.dept = filters.dept;
    if (filters.loc) params.loc = filters.loc;
    if (filters.fun) params.fun = filters.fun;

    const response = await api.get('/jobs', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

export const fetchJobDetails = async (jobId) => {
  try {
    const response = await api.get(`/jobs/${jobId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching job details:', error);
    throw error;
  }
};

export const fetchLookups = async (type) => {
  try {
    const response = await api.get(`/${type}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${type}:`, error);
    throw error;
  }
};

export default api;