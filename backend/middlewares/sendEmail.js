const nodeMailer = require("nodemailer");

exports.sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "1daefeded5b50c",
    pass: "8f2dd31af9a255"
  },
  });

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};
