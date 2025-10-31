const nodemailer = require('nodemailer');
require('dotenv').config();

let cachedTransporter;

async function createTransporter() {
  const host = process.env.SMTP_HOST || '';
  const user = process.env.SMTP_USER || '';
  const pass = process.env.SMTP_PASS || '';

  const looksPlaceholder = (v) => /^(your_|<.*>|\s*$)/i.test(v) || /example/i.test(v);
  const hasRealCreds = host && user && pass && !looksPlaceholder(host) && !looksPlaceholder(user) && !looksPlaceholder(pass) && host !== 'your_smtp_host';

  if (hasRealCreds) {
    return nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      requireTLS: true,
      auth: { user, pass },
    });
  }
  const test = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: { user: test.user, pass: test.pass },
  });
}

async function getTransporter() {
  if (!cachedTransporter) {
    cachedTransporter = await createTransporter();
  }
  return cachedTransporter;
}

async function sendAbsenceEmail(to, studentName, date) {
  const transporter = await getTransporter();
  const mailOptions = {
    from: process.env.SMTP_USER,
    to,
    subject: `${process.env.SCHOOL_NAME} - Attendance Alert`,
    text: `Dear Parent,\nYour child ${studentName} was absent on ${date}.\nRegards,\n${process.env.SCHOOL_NAME}`
  };
  return transporter.sendMail(mailOptions);
}

module.exports = { sendAbsenceEmail, getTransporter };

