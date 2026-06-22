package com.hmnandeesh.dnd;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.telephony.SmsMessage;
import android.util.Log;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class SMSReceiver extends BroadcastReceiver {
    private static final String TAG = "SMSReceiver";
    private static OTPListener listener;

    public interface OTPListener {
        void onOTPReceived(String otp);
    }

    public static void bindListener(OTPListener otpListener) {
        listener = otpListener;
    }

    public static void unbindListener() {
        listener = null;
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        if (intent.getAction() != null && intent.getAction().equals("android.provider.Telephony.SMS_RECEIVED")) {
            Bundle bundle = intent.getExtras();
            if (bundle != null) {
                try {
                    Object[] pdus = (Object[]) bundle.get("pdus");
                    if (pdus != null) {
                        for (Object pdu : pdus) {
                            SmsMessage smsMessage;
                            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.M) {
                                String format = bundle.getString("format");
                                smsMessage = SmsMessage.createFromPdu((byte[]) pdu, format);
                            } else {
                                smsMessage = SmsMessage.createFromPdu((byte[]) pdu);
                            }

                            String messageBody = smsMessage.getMessageBody();
                            Log.d(TAG, "SMS Received: " + messageBody);

                            // Check if message body contains a 6-digit OTP
                            String otp = extractOtp(messageBody);
                            if (otp != null) {
                                Log.d(TAG, "Extracted OTP: " + otp);
                                if (listener != null) {
                                    listener.onOTPReceived(otp);
                                }
                            }
                        }
                    }
                } catch (Exception e) {
                    Log.e(TAG, "Error parsing SMS", e);
                }
            }
        }
    }

    private String extractOtp(String message) {
        if (message == null) return null;
        // Search for a 6-digit sequence of numbers
        Pattern pattern = Pattern.compile("\\b(\\d{6})\\b");
        Matcher matcher = pattern.matcher(message);
        if (matcher.find()) {
            return matcher.group(1);
        }
        return null;
    }
}
