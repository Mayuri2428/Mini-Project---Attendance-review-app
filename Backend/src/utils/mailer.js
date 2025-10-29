const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

async function sendAbsenceEmail(to, studentName, date) {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to,
    subject: `${process.env.SCHOOL_NAME} - Attendance Alert`,
    text: `Dear Parent,\nYour child ${studentName} was absent on ${date}.\nRegards,\n${process.env.SCHOOL_NAME}`
  };
  return transporter.sendMail(mailOptions);
}

module.exports = { sendAbsenceEmail };

