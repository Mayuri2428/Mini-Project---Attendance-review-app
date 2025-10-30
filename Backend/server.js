require('dotenv').config();
const express = require('express');
const cors = require('cors');
const initDb = require('./src/models/initDb');

const authRoutes = require('./src/routes/auth');
const studentRoutes = require('./src/routes/students');
const attendanceRoutes = require('./src/routes/attendance');
const testEmailRoutes = require('./src/routes/testEmail');

const app = express();
app.use(cors());
app.use(express.json());

initDb();

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/test-email', testEmailRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
