import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function MarkAttendance() {
  const [students, setStudents] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [entries, setEntries] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/api/students').then(res => setStudents(res.data));
  }, []);

  const handleChange = (id, status) => {
    setEntries(prev => ({ ...prev, [id]: status }));
  };

  const submit = async () => {
    await axios.post('http://localhost:5000/api/attendance', { date, entries }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    alert('Attendance saved!');
  };

  return (
    <div>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      <table>
        <thead><tr><th>Name</th><th>Status</th></tr></thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>
                <select onChange={e => handleChange(s.id, e.target.value)}>
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                  <option value="late">Late</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={submit}>Submit</button>
    </

