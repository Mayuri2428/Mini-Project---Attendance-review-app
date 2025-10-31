const express = require('express');
const nodemailer = require('nodemailer');
const { getTransporter } = require('../utils/mailer');

const router = express.Router();

router.post('/send', async (req, res) => {
  try {
    const transporter = await getTransporter();

    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: 'SMTP test',
      text: 'This is a test email from Attendance app.',
    });

    const previewUrl = nodemailer.getTestMessageUrl ? nodemailer.getTestMessageUrl(info) : undefined;
    res.json({ ok: true, messageId: info.messageId, previewUrl });
  } catch (err) {
    console.error('SMTP send error:', err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

router.get('/verify', async (req, res) => {
  try {
    const transporter = await getTransporter();

    await transporter.verify();
    res.json({ ok: true, message: 'SMTP connection successful' });
  } catch (err) {
    console.error('SMTP verify error:', err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

module.exports = router;
