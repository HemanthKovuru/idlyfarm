const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // 1). create a transport
  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "b3848b6e490b49",
      pass: "d32d31ec07620d",
    },
  });

  // 2). email options
  const mailOptions = {
    from: "idlyfarm <idlyfarm.co@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // 3). send email
  await transport.sendMail(mailOptions);
};

module.exports = sendEmail;
