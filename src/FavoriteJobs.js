import React from 'react';

const FavoriteJobs = ({ favoriteJobs }) => {
  return (
    <div>
      <h2>Favorite Jobs</h2>
      {favoriteJobs.length > 0 ? (
        favoriteJobs.map((job, index) => (
          <div key={index}>
            <h3>{job.title}</h3>
            <p>{job.company}</p>
            <p>{job.location}</p>
          </div>
        ))
      ) : (
        <p>No favorite jobs saved yet</p>
      )}
    </div>
  );
};

export default FavoriteJobs;
