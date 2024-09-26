import React from 'react';

const JobList = ({ jobs, onJobClick, onSaveJob }) => {
  return (
    <div>
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <div key={job.id} onClick={() => onJobClick(job)}>
            <h3>{job.title}</h3>
            <p>{job.company}</p>
            <p>{job.location}</p>
            <button onClick={() => onSaveJob(job)}>Save Job</button>
          </div>
        ))
      ) : (
        <p>No jobs found</p>
      )}
    </div>
  );
};

export default JobList;
