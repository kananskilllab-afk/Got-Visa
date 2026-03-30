import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchParams, setSearchParams] = useState({
    name: '',
    dob: '',
    visaYear: ''
  });
  const [newStudent, setNewStudent] = useState({
    name: '',
    dob: '',
    visaGotYear: new Date().getFullYear(),
    quote: '',
    photoUrl: ''
  });

  const fetchStudents = async (query = '') => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/students?${query}`);
      if (!res.ok) throw new Error('API not reachable');
      const data = await res.json();
      setStudents(data);
    } catch (error) {
      console.warn('Backend connection issue, falling back to cached/mock data.');
      // Fallback Mock Data
      const mockData = [
        {
          _id: "1",
          name: "Emily Chen",
          dob: "2000-05-14",
          visaGotYear: 2023,
          quote: "The team made my Canadian dream a reality! The process was seamless.",
          photoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
        },
        {
          _id: "2",
          name: "Rajesh Kumar",
          dob: "1998-11-02",
          visaGotYear: 2022,
          quote: "Expert guidance every step of the way. Truly professional service.",
          photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
        },
        {
          _id: "3",
          name: "Sarah Jenkins",
          dob: "2001-08-21",
          visaGotYear: 2024,
          quote: "I couldn't have navigated the complex visa process without their help.",
          photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
        }
      ];
      setStudents(mockData.filter(s => {
        if (searchParams.name && !s.name.toLowerCase().includes(searchParams.name.toLowerCase())) return false;
        if (searchParams.visaYear && s.visaGotYear !== parseInt(searchParams.visaYear)) return false;
        return true;
      }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (searchParams.name) query.append('name', searchParams.name);
    if (searchParams.dob) query.append('dob', searchParams.dob);
    if (searchParams.visaYear) query.append('visaYear', searchParams.visaYear);
    
    fetchStudents(query.toString());
  };

  const handleInputChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value
    });
  };

  const handleNewStudentChange = (e) => {
    setNewStudent({
      ...newStudent,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitNewStudent = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent)
      });
      if (res.ok) {
        setShowModal(false);
        fetchStudents();
        setNewStudent({ name: '', dob: '', visaGotYear: 2024, quote: '', photoUrl: '' });
      } else {
        alert('Failed to save student. Ensure backend is connected.');
      }
    } catch (err) {
      alert('Network error. Backend might be unreachable.');
    }
  };

  return (
    <div className="gallery-container">
      <div className="bg-decoration"></div>
      
      <header className="hero-section">
        <div className="brand-tag">Global Mobility Experts</div>
        <h1 className="hero-title">Student Success <span className="text-gradient">Gallery</span></h1>
        <p className="hero-subtitle">Witness the journey of our students who successfully secured their international visas and started their new chapters.</p>
        
        <button className="add-student-trigger" onClick={() => setShowModal(true)}>
          <span className="plus-icon">+</span> Share New Success
        </button>
      </header>

      <div className="search-container-glass">
        <form className="search-section" onSubmit={handleSearch}>
          <div className="input-group">
            <label>NAME</label>
            <input 
              type="text" 
              name="name" 
              placeholder="Search student..."
              value={searchParams.name}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="input-group">
            <label>VISA YEAR</label>
            <input 
              type="number" 
              name="visaYear" 
              placeholder="Year"
              value={searchParams.visaYear}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" className="search-btn">Filter Results</button>
        </form>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="shimmer-card"></div>
          <div className="shimmer-card"></div>
          <div className="shimmer-card"></div>
        </div>
      ) : (
        <div className="results-grid">
          {students.map((student, index) => (
            <div key={student._id} className="student-card" style={{'--index': index}}>
              <div className="student-card-inner">
                <div className="student-photo-wrapper">
                  <img src={student.photoUrl || "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=256&q=80"} alt={student.name} className="student-photo" />
                  <div className="visa-stamp">GRANTED</div>
                </div>
                
                <div className="student-content">
                  <div className="quote-icon">“</div>
                  <blockquote className="quote-text">{student.quote}</blockquote>
                  
                  <div className="student-footer">
                    <div>
                      <h3 className="student-name">{student.name}</h3>
                      <p className="visa-year">Class of {student.visaGotYear}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {students.length === 0 && (
            <div className="no-results">
              <p>No success stories found matching your search.</p>
              <button onClick={() => {setSearchParams({name:'', dob:'', visaYear:''}); fetchStudents();}}>Clear Filters</button>
            </div>
          )}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content animate-pop">
            <button className="close-modal" onClick={() => setShowModal(false)}>&times;</button>
            <h2>Share Success Story</h2>
            <form onSubmit={handleSubmitNewStudent} className="add-student-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name</label>
                  <input required name="name" value={newStudent.name} onChange={handleNewStudentChange} placeholder="Student's Name" />
                </div>
                <div className="form-group">
                  <label>Date of Birth</label>
                  <input required type="date" name="dob" value={newStudent.dob} onChange={handleNewStudentChange} />
                </div>
                <div className="form-group">
                  <label>Visa Received Year</label>
                  <input required type="number" name="visaGotYear" value={newStudent.visaGotYear} onChange={handleNewStudentChange} />
                </div>
                <div className="form-group">
                  <label>Photo URL</label>
                  <input required name="photoUrl" value={newStudent.photoUrl} onChange={handleNewStudentChange} placeholder="https://..." />
                </div>
              </div>
              <div className="form-group">
                <label>Success Quote</label>
                <textarea required name="quote" value={newStudent.quote} onChange={handleNewStudentChange} placeholder="Their experience..."></textarea>
              </div>
              <button type="submit" className="submit-btn">Publish Story</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

