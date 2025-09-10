import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobListPage from './pages/JobListPage';
import JobDetailsPage from './pages/JobDetailsPage';
import './style/global.scss';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<JobListPage />} />
          <Route path="/jobs/:id" element={<JobDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;