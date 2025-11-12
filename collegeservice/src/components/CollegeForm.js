import React, { useState, useEffect } from 'react';
import './CollegeForm.css';

const CollegeForm = ({ fetchColleges, editingCollege, setEditingCollege }) => {
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [department, setDepartment] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (editingCollege) {
      setStudentId(editingCollege.studentId);
      setStudentName(editingCollege.studentName);
      setDepartment(editingCollege.department);
      setCompanyName(editingCollege.companyName);
      setJobRole(editingCollege.jobRole);
      setEmail(editingCollege.email);
      setPhone(editingCollege.phone);
    } else {
      setStudentId('');
      setStudentName('');
      setDepartment('');
      setCompanyName('');
      setJobRole('');
      setEmail('');
      setPhone('');
    }
  }, [editingCollege]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const college = {
      studentId,
      studentName,
      department,
      companyName,
      jobRole,
      email,
      phone,
    };

    try {
      if (editingCollege) {
        await fetch(`http://localhost:8080/CollegeService/${studentId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(college),
        });
      } else {
        await fetch('http://localhost:8080/CollegeService', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(college),
        });
      }

      fetchColleges(); // refresh data after save
      setEditingCollege(null);
      setStudentId('');
      setStudentName('');
      setDepartment('');
      setCompanyName('');
      setJobRole('');
      setEmail('');
      setPhone('');
    } catch (error) {
      console.error('Error saving college:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>{editingCollege ? 'Edit College Record' : 'Add College Record'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          placeholder="Student ID"
          required
          disabled={!!editingCollege}
        />
        <input
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          placeholder="Student Name"
          required
        />
        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          placeholder="Department"
          required
        />
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Company Name"
          required
        />
        <input
          type="text"
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
          placeholder="Job Role"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
          required
        />
        <button type="submit">
          {editingCollege ? 'Update Record' : 'Add Record'}
        </button>
      </form>
    </div>
  );
};

export default CollegeForm;
