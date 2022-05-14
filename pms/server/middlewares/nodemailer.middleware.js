const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

console.log(process.env.SYSTEM_EMAIL)

const mailer = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SYSTEM_EMAIL,
    pass: process.env.SYSTEM_EMAIL_PASSWORD
  }
});

module.exports = mailer;