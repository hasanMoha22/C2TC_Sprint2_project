import React from 'react';
import './CollegeList.css';

const CollegeList = ({ colleges, fetchColleges, setEditingCollege }) => {
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8080/CollegeService/${id}`, {
        method: 'DELETE',
      });
      fetchColleges(); // refresh list after delete
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  return (
    <div className="college-list-container">
      <h2>College Placement Records</h2>
      {colleges.length === 0 ? (
        <p className="no-data">No records available.</p>
      ) : (
        <div className="college-grid">
          {colleges.map((college) => (
            <div key={college.studentId} className="college-card">
              <div className="college-details">
                <h3>{college.studentName}</h3>
                <p><strong>ID:</strong> {college.studentId}</p>
                <p><strong>Department:</strong> {college.department}</p>
                <p><strong>Company:</strong> {college.companyName}</p>
                <p><strong>Job Role:</strong> {college.jobRole}</p>
                <p><strong>Email:</strong> {college.email}</p>
                <p><strong>Phone:</strong> {college.phone}</p>
              </div>
              <div className="card-buttons">
                <button
                  className="edit-btn"
                  onClick={() => setEditingCollege(college)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(college.studentId)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CollegeList;
