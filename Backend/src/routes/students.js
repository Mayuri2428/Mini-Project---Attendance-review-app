const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/db/attendance.db');

router.get('/', (req, res) => {
  db.all('SELECT * FROM students', [], (err, rows) => {
    if(err) res.status(500).json(err);
    else res.json(rows);
  });
});

module.exports = router;
