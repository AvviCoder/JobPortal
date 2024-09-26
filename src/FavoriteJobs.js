import React from 'react';

const FavoriteJobs = ({ favoriteJobs, onRemoveJob }) => {
  return (
    <div>
      {favoriteJobs.length > 0 ? (
        favoriteJobs.map((job) => (
          <div key={job.id}>
            <h3>{job.title}</h3>
            <p>{job.company}</p>
            <p>{job.location}</p>
            <button onClick={() => onRemoveJob(job)}>Remove</button>
          </div>
        ))
      ) : (
        <p>No favorite jobs saved yet</p>
      )}
    </div>
  );
};

export default FavoriteJobs;
