import 'dotenv/config';
import nodemailer from 'nodemailer';
import { VERIFICATION_URL } from './config.js';


const transporter = nodemailer.createTransport({
  pool: true,
  host: 'mail.webdesignsbytom.com',
  port: 465,
  secure: true, // use TLS
  auth: {
    type: 'login',
    user: process.env.AUTH_EMAIL,
    pass: process.env.VERIFY_PASS,
  },
});

export async function sendVerificationEmail(id, email, uniqueString) {
  const clientUrl = VERIFICATION_URL;
  console.log('client url: ' + clientUrl);

  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: 'Please verify Your Email',
    html: `
      <html>
        <head>
          <meta charset="utf-8">
        </head>
        <body style='height: 100vh;'>
          <div style='background-color: lightblue;'>
            <h1>Thank you for signing up with webdesignsbytom</h1>
            <p>Please verify your email address to complete the signup and login into your account.</p><p>This link <b>expires in 6 hours</b>.</p><p>Press <a href=${
              clientUrl + '/verify/' + id + '/' + uniqueString
            }>here</a> to proceed.</p>
          </div>
        </body>
      </html>
    `,
  };
  console.log('url: ', clientUrl + '/verify/' + id + '/' + uniqueString);
  try {
    transporter.sendMail(mailOptions);
  } catch (err) {
    throw err;
  }
}