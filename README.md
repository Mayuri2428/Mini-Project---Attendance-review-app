# Student Attendance & Report Portal

## Description
A web-based portal for teachers to mark student attendance, generate reports, and notify parents via email. Built with React frontend and Node.js backend with SQLite database.

## Features
- Teacher login & authentication
- Mark attendance (Present, Absent, Late)
- Email notifications to parents for absent students
- Attendance reports

## Tech Stack
- Frontend: React, Bootstrap
- Backend: Node.js, Express
- Database: SQLite
- Email: Nodemailer

## Project Structure
- Backend: ./Backend
- Frontend: ./frontend

## Prerequisites
- Node.js 18+
- npm 9+
- Gmail App Password (if using Gmail SMTP)

## Environment Variables
Create `Backend/.env` with the following (replace placeholders):

```
PORT=5000
JWT_SECRET=replace_with_a_strong_random_secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=youremail@gmail.com
SMTP_PASS=your_gmail_app_password
SCHOOL_NAME=GCOEA Chhatrapati Sambhajinagar
```

Tip: A sample file is provided at `Backend/.env.example`.

## Run Backend
From the `Backend` folder:

```bash
npm install
npm start
```

The API will run at `http://localhost:5000`.

Health check:

```bash
curl http://localhost:5000/api/health
```

Test email (uses your SMTP envs):

```bash
curl -X POST http://localhost:5000/api/test-email/send
```

## Minimal Frontend for Quick Test
Open `frontend/public/index.html` directly in your browser.

It provides:

- Backend health status display
- Button to send a test email via the backend

If you prefer a React dev server, initialize with Vite in `frontend/` and point requests to `http://localhost:5000`.

## Security
- Do not commit `.env`. A root `.gitignore` is included to ignore secrets and build artifacts.
- Rotate secrets periodically.