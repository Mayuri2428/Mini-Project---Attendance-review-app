require('dotenv').config();
const express = require('express');
const cors = require('cors');
const initDb = require('./src/models/initDb');

const authRoutes = require('./src/routes/auth');
const studentRoutes = require('./src/routes/students');
const attendanceRoutes = require('./src/routes/attendance');

const app = express();
app.use(cors());
app.use(express.json());

initDb();

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/attendance', attendanceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
