const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

router.post('/send', async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      requireTLS: true,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: 'SMTP test',
      text: 'This is a test email from Attendance app.',
    });

    res.json({ ok: true, messageId: info.messageId });
  } catch (err) {
    console.error('SMTP send error:', err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

router.get('/verify', async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      requireTLS: true,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    await transporter.verify();
    res.json({ ok: true, message: 'SMTP connection successful' });
  } catch (err) {
    console.error('SMTP verify error:', err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

module.exports = router;
