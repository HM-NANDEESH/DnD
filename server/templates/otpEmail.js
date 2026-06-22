module.exports = function getOtpEmailTemplate(userName, otpCode) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DnD Verification OTP</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        background-color: #0f172a;
        color: #f8fafc;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 40px 20px;
      }
      .card {
        background-color: #1e293b;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 20px;
        padding: 40px;
        text-align: center;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
      }
      .logo {
        font-size: 32px;
        font-weight: 800;
        color: #ffffff;
        letter-spacing: -0.5px;
        margin-bottom: 24px;
      }
      .title {
        font-size: 24px;
        font-weight: 700;
        color: #ffffff;
        margin-bottom: 12px;
      }
      .subtitle {
        font-size: 15px;
        color: #94a3b8;
        line-height: 1.6;
        margin-bottom: 30px;
      }
      .otp-container {
        background: rgba(129, 140, 248, 0.1);
        border: 1.5px dashed rgba(129, 140, 248, 0.3);
        border-radius: 12px;
        padding: 18px;
        font-size: 36px;
        font-weight: 800;
        color: #818cf8;
        letter-spacing: 6px;
        margin: 24px auto;
        max-width: 280px;
      }
      .footer {
        margin-top: 36px;
        font-size: 12px;
        color: #64748b;
        line-height: 1.5;
      }
      .footer a {
        color: #818cf8;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="card">
        <div class="logo">DnD</div>
        <div class="title">Verify Your Email</div>
        <div class="subtitle">
          Hello <strong>${userName}</strong>,<br>
          Use the following verification code to access your DnD Habit Tracker & Life Journal profile. This code is valid for 10 minutes.
        </div>
        <div class="otp-container">${otpCode}</div>
        <div class="subtitle" style="font-size: 13px; margin-top: 10px;">
          If you did not request this code, you can safely ignore this email.
        </div>
        <div class="footer">
          Sent by DnD Habit Tracker App.<br>
          Build consistency, maintain streaks, master your life.
        </div>
      </div>
    </div>
  </body>
  </html>
  `;
};
