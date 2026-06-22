const env = require('../config/env');

const smsService = {
  async sendOtpSms(toPhone, otpCode) {
    const message = `Your DnD verification code is ${otpCode}.\n\n@localhost #${otpCode}`;
    
    // Check if Twilio configuration is present
    if (env.twilio && env.twilio.accountSid && env.twilio.authToken && env.twilio.fromNumber) {
      try {
        const twilio = require('twilio');
        const client = twilio(env.twilio.accountSid, env.twilio.authToken);
        const info = await client.messages.create({
          body: message,
          from: env.twilio.fromNumber,
          to: toPhone
        });
        console.log(`SMS successfully sent to ${toPhone}: ${info.sid}`);
        return info;
      } catch (err) {
        console.error('Failed to send SMS via Twilio:', err.message);
        throw new Error('Failed to send SMS verification code.');
      }
    } else {
      console.log(`\n--- [SIMULATED SMS MESSAGE FOR ${toPhone}] ---`);
      console.log(message);
      console.log('--------------------------------------------\n');
      return { simulated: true, sid: 'SM_simulated' };
    }
  }
};

module.exports = smsService;
