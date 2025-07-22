const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,      // your_email@gmail.com
    pass: process.env.GMAIL_APP_PASS,  // your 16-char app password
  },
});

const sendVerificationEmail = async (toEmail, verificationCode) => {
  const mailOptions = {
    from: `"Your App Name" <${process.env.GMAIL_USER}>`,
    to: toEmail,
    subject: "Verify Your Email",
    html: `
      <h3>Welcome!</h3>
      <p>Your verification code is: <strong>${verificationCode}</strong></p>
      <p>Or click <a href="https://yourdomain.com/verify/${verificationCode}">here</a> to verify.</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (err) {
    console.error("Error sending email:", err);
  }
};

module.exports = sendVerificationEmail;
