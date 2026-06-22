module.exports = function getResetEmailTemplate(userName, resetLink) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DnD Password Reset Link</title>
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
      .btn-container {
        margin: 24px auto;
        max-width: 320px;
      }
      .btn-reset {
        display: inline-block;
        background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
        color: #ffffff !important;
        font-size: 15px;
        font-weight: 700;
        text-decoration: none;
        padding: 14px 28px;
        border-radius: 50px;
        box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
      }
      .link-text {
        font-size: 12px;
        color: #64748b;
        word-break: break-all;
        margin-top: 14px;
      }
      .footer {
        margin-top: 36px;
        font-size: 12px;
        color: #64748b;
        line-height: 1.5;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="card">
        <div class="logo">DnD</div>
        <div class="title">Reset Your Password</div>
        <div class="subtitle">
          Hello <strong>${userName}</strong>,<br>
          We received a request to reset your DnD password. Click the button below to complete the reset. This link is valid for 15 minutes.
        </div>
        <div class="btn-container">
          <a class="btn-reset" href="${resetLink}" target="_blank">Reset Password</a>
        </div>
        <div class="subtitle" style="font-size: 13px; margin-top: 10px;">
          Or copy and paste this link in your browser:
          <div class="link-text"><a href="${resetLink}" style="color: #818cf8; text-decoration: none;">${resetLink}</a></div>
        </div>
        <div class="footer">
          If you did not request a password reset, you can safely ignore this email.
        </div>
      </div>
    </div>
  </body>
  </html>
  `;
};
