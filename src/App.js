import React, { useState, useEffect } from 'react';
import JobList from './JobList';
import MapComponent from './MapComponent';
import FavoriteJobs from './FavoriteJobs';

import jobsData from './jobs_dataset.json';
const App = () => {
  const [jobs, setJobs] = useState([]); // State to store the job data
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem('favoriteJobs')) || [];
  });

  // Use the imported jobsData directly
  useEffect(() => {
    setJobs(jobsData); // Setting the imported data to state
  }, []);

  const saveFavoriteJob = (job) => {
    const updatedFavorites = [...favorites, job];
    setFavorites(updatedFavorites);
    localStorage.setItem('favoriteJobs', JSON.stringify(updatedFavorites));
  };

  const filterJobs = () => {
    return jobs.filter((job) => {
      const matchesKeyword = job.title.toLowerCase().includes(keyword.toLowerCase());
      const matchesLocation = job.location.toLowerCase().includes(location.toLowerCase());
      const matchesJobType = jobType ? job.type === jobType : true;

      return matchesKeyword && matchesLocation && matchesJobType;
    });
  };

  return (
    <div>
      <h1>Job Board</h1>

      {/* Search & Filter */}
      <input
        type="text"
        placeholder="Search by keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <select
        value={jobType}
        onChange={(e) => setJobType(e.target.value)}
      >
        <option value="">Select Job Type</option>
        <option value="full-time">Full-Time</option>
        <option value="part-time">Part-Time</option>
        <option value="contract">Contract</option>
      </select>

      {/* Job List */}
      <JobList
        jobs={filterJobs()}
        onJobClick={(job) => setSelectedJob(job)}
        onSaveJob={saveFavoriteJob}
      />

      {/* Map Component */}
      {selectedJob && (
        <MapComponent location={selectedJob.location} />
      )}

      {/* Favorites */}
      <FavoriteJobs favoriteJobs={favorites} />
    </div>
  );
};

export default App;
