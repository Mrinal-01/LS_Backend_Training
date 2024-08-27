// Required dependencies
require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');

const app = express();

const transporter = nodemailer.createTransport({
  host: process.env.MAILGUN_SMTP_HOST,
  port: process.env.MAILGUN_SMTP_PORT,
  secure: false, // Use TLS
  auth: {
    user: process.env.MAILGUN_SMTP_USER,
    pass: process.env.MAILGUN_SMTP_PASS,
  },
});

module.exports = {
  async sendingMail(req, res) {
    const mailOptions = {
      from: 'Mailgun Sandbox <mrinal@sandboxc7effed6a59a43049b92c14daba52b12.mailgun.org>',
      to: 'mrinal@logic-square.com', // Replace with the recipient email
      subject: 'Hello from Mailgun using Nodemailer!',
      text: 'This is a test email sent from an Express.js app using Nodemailer with Mailgun SMTP!',
    };
  
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
      res.status(200).json({ message: 'Email sent successfully', info });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error sending email', error: error.message });
    }
  }
};
