// Required dependencies
require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');

const sendEmail=require('../../lib/mail')

const app = express();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // Use TLS
  auth: {
    user: process.env.SMTP_AUTH_USER,
    pass: process.env.SMTP_AUTH_PASSWORD,
  },
});

module.exports = {
  async sendingMail(req, res) {

    const emailBody = `
    Hi Mrinal,
    
    Hope this mail finds you well. We are contacting you on behalf of LogicSquare Tech.
    We have good news for you that you got a 1 lakh Bonus this year. Good work, Mrinal!!

    Thanks and regards,
    HR
    LogicSquare Technology
  `;

    const mailOptions = {
      from: 'mbera829@gmail.com <mrinal@sandboxc7effed6a59a43049b92c14daba52b12.mailgun.org>',
      to: 'mrinal@logic-square.com', // Replace with the recipient email
      subject: 'Hello from Mailgun using Nodemailer!',
      // text: emailBody
      html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            .container {
              padding: 20px;
              font-family: Arial, sans-serif;
              line-height: 1.6;
            }
            .header {
              background-color: #f4f4f4;
              padding: 10px;
              text-align: center;
              font-size: 24px;
            }
            .content {
              padding: 20px;
            }
            .footer {
              background-color: #f4f4f4;
              padding: 10px;
              text-align: center;
              font-size: 12px;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              Welcome to Our Newsletter!
            </div>
            <div class="content">
              <p>Hello,</p>
              <p>We're excited to have you with us. Here's what you can expect in the upcoming weeks:</p>
              <ul>
                <li>Latest updates and news</li>
                <li>Exclusive offers and discounts</li>
                <li>Insights from our experts</li>
              </ul>
              <p>Stay tuned for more!</p>
              <p>Best regards,<br/>The Team</p>
            </div>
            <div class="footer">
              &copy; 2024 Your Company. All rights reserved.
            </div>
          </div>
        </body>
      </html>
    `,
    };
  
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
      res.status(200).json({ message: 'Email sent successfully', info });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error sending email', error: error.message });
    }
  },



  async sendWelcomeMsg(req, res) {
    try {
      const info = await sendEmail("welcome", {  // Ensure 'welcome/html' matches your template path
        to: "mbera829@gmail.com",
        subject: "Demo Email",
        from: 'mrinal@logic-square.com',
        locals: {
          name: "Mrinal Bera",
          email: "mrinal@logic-square.com",
          password: "password",
          send: true
        },
      });
      console.log(info);
      
      return res.status(200).json(info);
    } catch (error) {
      console.log("Error sending welcome email:", error);
      return res.status(500).json({ error: error.message });
    }
  }
};
