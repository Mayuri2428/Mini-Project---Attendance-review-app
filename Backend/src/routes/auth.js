const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/db/attendance.db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (!user) return res.status(400).json({ message: 'User not found' });
    if (!bcrypt.compareSync(password, user.password)) return res.status(400).json({ message: 'Wrong password' });
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, name: user.name, role: user.role });
  });
});

module.exports = router;

