const nodemailer = require("nodemailer");

const host = process.env.MAILTRAP_HOST.toString();
const port = process.env.MAILTRAP_PORT.toString();
const user = process.env.MAILTRAP_USERNAME.toString();
const pass = process.env.MAILTRAP_PASSWORD.toString();

const gmailPort = process.env.MAIL_PORT;
const gmailService = process.env.MAIL_SERVICE;
const gmailEmail = process.env.MAIL_USERNAME;
const gmailPassword = process.env.MAIL_PASSWORD;

const sendEmail = async (options) => {
  const gmailTransporter = nodemailer.createTransport({
    service: gmailService,
    port: gmailPort,
    secure: false,
    auth: {
      user: gmailEmail,
      pass: gmailPassword,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailtrapTransporter = nodemailer.createTransport({
    host,
    port,
    auth: {
      user,
      pass,
    },
  });

  const mailOptions = {
    from: "Tech Flookup <tech@flookup.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  if (process.env.NODE_ENV === "dev") {
    await mailtrapTransporter.sendMail(mailOptions);
  } else if (process.env.NODE_ENV === "prod") {
    await gmailTransporter.sendMail(mailOptions);
  }
};

module.exports = sendEmail;
