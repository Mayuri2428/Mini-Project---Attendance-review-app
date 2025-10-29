const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/db/attendance.db');
const { sendAbsenceEmail } = require('../utils/mailer');

router.post('/', async (req, res) => {
  const { date, entries } = req.body;
  for (let entry of Object.entries(entries)) {
    const studentId = entry[0];
    const status = entry[1];
    db.run('INSERT INTO attendance(student_id, date, status) VALUES (?, ?, ?)', [studentId, date, status]);

    if (status === 'absent') {
      db.get('SELECT * FROM students WHERE id = ?', [studentId], (err, student) => {
        if(student && student.parent_email) sendAbsenceEmail(student.parent_email, student.name, date);
      });
    }
  }
  res.json({ message: 'Attendance marked' });
});

module.exports = router;

