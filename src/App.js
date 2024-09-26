import React, { useState, useEffect } from 'react';
import JobList from './JobList';
import MapComponent from './MapComponent';
import FavoriteJobs from './FavoriteJobs';
import jobsData from './jobs_dataset.json';
import './App.css'; // Import the CSS

const App = () => {
  const [jobs, setJobs] = useState([]); // State to store the filtered job data
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem('favoriteJobs')) || [];
  });

  // Use the imported jobsData directly on component mount
  useEffect(() => {
    setJobs(jobsData); // Load all jobs from the dataset into state initially
  }, []);

  // Function to save a job to favorites
  const saveFavoriteJob = (job) => {
    if (!favorites.some(fav => fav.id === job.id)) { // Prevent duplicates
      const updatedFavorites = [...favorites, job];
      setFavorites(updatedFavorites);
      localStorage.setItem('favoriteJobs', JSON.stringify(updatedFavorites));
    }
  };

  // Function to remove a job from favorites
  const removeFavoriteJob = (job) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== job.id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favoriteJobs', JSON.stringify(updatedFavorites));
  };

  // Filter jobs based on the search inputs
  const filterJobs = () => {
    return jobs.filter((job) => {
      const matchesKeyword = job.title.toLowerCase().includes(keyword.toLowerCase());
      const matchesLocation = job.location.toLowerCase().includes(location.toLowerCase());
      const matchesJobType = jobType ? job.jobType === jobType : true;

      return matchesKeyword && matchesLocation && matchesJobType;
    });
  };

  return (
    <div className="container">
      <h1>Job Board</h1>

      {/* Search & Filter */}
      <input
        className="search-bar"
        type="text"
        placeholder="Search by keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <input
        className="search-bar"
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <select
        className="filter-dropdown"
        value={jobType}
        onChange={(e) => setJobType(e.target.value)}
      >
        <option value="">Select Job Type</option>
        <option value="full-time">Full-Time</option>
        <option value="part-time">Part-Time</option>
        <option value="contract">Contract</option>
      </select>

      {/* Filtered Job List */}
      <h2>Search Results</h2>
      <JobList
        jobs={filterJobs()}
        onJobClick={(job) => setSelectedJob(job)}
        onSaveJob={saveFavoriteJob}
      />

      {/* Map Component for selected job */}
      {selectedJob && (
        <div className="map-component">
          <MapComponent location={selectedJob.location} />
        </div>
      )}

      {/* Favorites Section */}
      <div className="favorite-jobs">
        <h2>Favorite Jobs</h2>
        <FavoriteJobs
          favoriteJobs={favorites}
          onRemoveJob={removeFavoriteJob}
        />
      </div>
    </div>
  );
};

export default App;
