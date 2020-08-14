const nodemailer = require("nodemailer");

const host = process.env.MAILTRAP_HOST.toString();
const port = process.env.MAILTRAP_PORT.toString();
const user = process.env.MAILTRAP_USERNAME.toString();
const pass = process.env.MAILTRAP_PASSWORD.toString();

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
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

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
