const nodemailer = require('nodemailer');
const env = require('../config/env');
const getOtpEmailTemplate = require('../templates/otpEmail');
const getResetEmailTemplate = require('../templates/resetEmail');

let transporterPromise = null;

async function getTransporter() {
  if (transporterPromise) return transporterPromise;

  transporterPromise = (async () => {
    // If using placeholder dummy credentials, dynamically generate an Ethereal test account!
    if (env.smtp.user === 'dummy-ethereal-user@ethereal.email') {
      console.log('Generating dynamic Ethereal Mail test SMTP account...');
      const testAccount = await nodemailer.createTestAccount();
      console.log('Ethereal Mail test account generated successfully!');
      console.log(`User: ${testAccount.user}`);
      console.log(`Pass: ${testAccount.pass}`);
      
      // Override SMTP settings with temporary test credentials
      return nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
    }

    // Otherwise use configured SMTP credentials
    return nodemailer.createTransport({
      host: env.smtp.host,
      port: env.smtp.port,
      secure: env.smtp.secure,
      auth: {
        user: env.smtp.user,
        pass: env.smtp.pass
      }
    });
  })();

  return transporterPromise;
}

const emailService = {
  async sendOtpEmail(toEmail, otpCode, userName) {
    const transporter = await getTransporter();
    const htmlContent = getOtpEmailTemplate(userName, otpCode);

    const fromHeader = env.smtp.user === 'dummy-ethereal-user@ethereal.email'
      ? '"DnD App" <no-reply@ethereal.email>'
      : env.smtp.from;

    const mailOptions = {
      from: fromHeader,
      to: toEmail,
      subject: `Your DnD Verification Code: ${otpCode}`,
      html: htmlContent
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email successfully sent: ${info.messageId}`);
    
    // Log preview link for ethereal test account
    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      console.log(`✉️ Test Email Preview Link: ${previewUrl}`);
      // Save test URL in state or simple temp log so frontend can read it if needed
      global.lastEmailPreviewUrl = previewUrl;
    }
    
    return info;
  },

  async sendResetLinkEmail(toEmail, resetLink, userName) {
    const transporter = await getTransporter();
    const htmlContent = getResetEmailTemplate(userName, resetLink);

    const fromHeader = env.smtp.user === 'dummy-ethereal-user@ethereal.email'
      ? '"DnD App" <no-reply@ethereal.email>'
      : env.smtp.from;

    const mailOptions = {
      from: fromHeader,
      to: toEmail,
      subject: `Reset Your DnD Password`,
      html: htmlContent
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Reset link email successfully sent: ${info.messageId}`);
    
    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      console.log(`✉️ Test Reset Email Preview Link: ${previewUrl}`);
      global.lastEmailPreviewUrl = previewUrl;
    }
    
    return info;
  }
};

module.exports = emailService;
