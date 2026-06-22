package com.hmnandeesh.dnd;

import android.app.AlertDialog;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.KeyEvent;

import androidx.appcompat.app.AppCompatActivity;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.PhoneAuthCredential;
import com.google.firebase.auth.PhoneAuthOptions;
import com.google.firebase.auth.PhoneAuthProvider;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.FirebaseException;
import java.util.concurrent.TimeUnit;

import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
import android.accounts.Account;
import android.accounts.AccountManager;
import android.Manifest;

public class LoginActivity extends AppCompatActivity {
    private static final String TAG = "LoginActivity";
    private static final String API_BASE_URL = "http://10.0.2.2:3000/api/auth";

    private EditText inputUsername;
    private EditText inputPassword;
    private SharedPreferences prefs;
    private int failedLoginAttempts = 0;

    // Wizard Layouts
    private android.widget.LinearLayout layoutLoginMain;
    private android.widget.LinearLayout layoutLoginPhone;
    private android.widget.LinearLayout layoutLoginOtp;

    // Phone Step views
    private android.widget.Spinner spinnerLoginCountry;
    private android.widget.TextView textLoginDialCode;
    private android.widget.EditText inputLoginPhone;
    private android.widget.Button btnLoginPhoneBack;
    private android.widget.Button btnLoginPhoneSubmit;

    // OTP Step views
    private android.widget.TextView textLoginOtpSubtitle;
    private android.widget.TextView textLoginOtpCountdown;
    private android.widget.EditText inputLoginOtp1, inputLoginOtp2, inputLoginOtp3, inputLoginOtp4, inputLoginOtp5, inputLoginOtp6;
    private android.widget.Button btnLoginOtpBack;
    private android.widget.Button btnLoginOtpSubmit;

    // Firebase Auth fields
    private FirebaseAuth mAuth;
    private String mVerificationId;
    private PhoneAuthProvider.ForceResendingToken mResendToken;
    private PhoneAuthProvider.OnVerificationStateChangedCallbacks mCallbacks;

    // Timer details
    private int countdownSeconds = 60;
    private android.os.Handler timerHandler = new android.os.Handler();
    private Runnable timerRunnable = null;
    
    // Selected details
    private String selectedCountryCode = "+91";
    private int selectedPhoneLength = 10;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        prefs = getSharedPreferences("CapacitorStorage", Context.MODE_PRIVATE);

        inputUsername = findViewById(R.id.input_login_username);
        inputPassword = findViewById(R.id.input_login_password);
        Button btnLoginSubmit = findViewById(R.id.btn_login_submit);
        
        View ssoContainer = findViewById(R.id.layout_login_sso_container);
        View divider = findViewById(R.id.layout_login_divider);
        if (ssoContainer != null) ssoContainer.setVisibility(View.GONE);
        if (divider != null) divider.setVisibility(View.GONE);
        
        View btnGoogle = findViewById(R.id.btn_sso_google);
        View btnApple = findViewById(R.id.btn_sso_apple);
        View btnPhone = findViewById(R.id.btn_sso_phone);
        
        TextView linkForgotPassword = findViewById(R.id.link_forgot_password);
        TextView linkGotoSignup = findViewById(R.id.link_goto_signup);

        // Standard Login
        btnLoginSubmit.setOnClickListener(v -> {
            String username = inputUsername.getText().toString().trim();
            String password = inputPassword.getText().toString();

            if (username.isEmpty() || password.isEmpty()) {
                Toast.makeText(this, "⚠️ Please enter email/username and password!", Toast.LENGTH_SHORT).show();
                return;
            }

            performLogin(username, password);
        });

        // SSO Google
        btnGoogle.setOnClickListener(v -> showGoogleAccountChooser());

        // SSO Apple
        btnApple.setOnClickListener(v -> showAppleAccountChooser());

        // Setup progressive phone wizard and listeners
        setupProgressivePhoneFlow();

        // SSO Phone click listener opens phone wizard step
        btnPhone.setOnClickListener(v -> showStep(2));

        linkForgotPassword.setOnClickListener(v -> {
            startActivity(new Intent(this, RecoverActivity.class));
        });

        linkGotoSignup.setOnClickListener(v -> {
            startActivity(new Intent(this, SignupActivity.class));
            finish();
        });

        // Handle trigger_sso Extra from other screens
        String triggerSso = getIntent().getStringExtra("trigger_sso");
        if ("google".equals(triggerSso)) {
            showGoogleAccountChooser();
        } else if ("phone".equals(triggerSso)) {
            showStep(2);
        }
    }

    private void setupProgressivePhoneFlow() {
        layoutLoginMain = findViewById(R.id.layout_login_main);
        layoutLoginPhone = findViewById(R.id.layout_login_phone);
        layoutLoginOtp = findViewById(R.id.layout_login_otp);

        spinnerLoginCountry = findViewById(R.id.spinner_login_country);
        textLoginDialCode = findViewById(R.id.text_login_dial_code);
        inputLoginPhone = findViewById(R.id.input_login_phone);
        btnLoginPhoneBack = findViewById(R.id.btn_login_phone_back);
        btnLoginPhoneSubmit = findViewById(R.id.btn_login_phone_submit);

        textLoginOtpSubtitle = findViewById(R.id.text_login_otp_subtitle);
        textLoginOtpCountdown = findViewById(R.id.text_login_otp_countdown);
        inputLoginOtp1 = findViewById(R.id.input_login_otp_1);
        inputLoginOtp2 = findViewById(R.id.input_login_otp_2);
        inputLoginOtp3 = findViewById(R.id.input_login_otp_3);
        inputLoginOtp4 = findViewById(R.id.input_login_otp_4);
        inputLoginOtp5 = findViewById(R.id.input_login_otp_5);
        inputLoginOtp6 = findViewById(R.id.input_login_otp_6);
        btnLoginOtpBack = findViewById(R.id.btn_login_otp_back);
        btnLoginOtpSubmit = findViewById(R.id.btn_login_otp_submit);

        // Spinners setup
        String[] countries = {
            "🇮🇳 India (+91)",
            "🇺🇸 United States (+1)",
            "🇨🇦 Canada (+1)",
            "🇬🇧 United Kingdom (+44)",
            "🇦🇺 Australia (+61)",
            "🇩🇪 Germany (+49)",
            "🇫🇷 France (+33)",
            "🇯🇵 Japan (+81)",
            "🇸🇬 Singapore (+65)"
        };
        final String[] dialCodes = {"+91", "+1", "+1", "+44", "+61", "+49", "+33", "+81", "+65"};
        final int[] phoneLengths = {10, 10, 10, 10, 9, 11, 9, 10, 8};

        android.widget.ArrayAdapter<String> countryAdapter = new android.widget.ArrayAdapter<>(this, android.R.layout.simple_spinner_item, countries);
        countryAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinnerLoginCountry.setAdapter(countryAdapter);

        spinnerLoginCountry.setOnItemSelectedListener(new android.widget.AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(android.widget.AdapterView<?> parent, View view, int position, long id) {
                selectedCountryCode = dialCodes[position];
                selectedPhoneLength = phoneLengths[position];
                textLoginDialCode.setText(selectedCountryCode);
                inputLoginPhone.setHint(selectedPhoneLength + "-digit number");
                inputLoginPhone.setFilters(new android.text.InputFilter[] { new android.text.InputFilter.LengthFilter(selectedPhoneLength) });
                
                boolean isValid = inputLoginPhone.getText().toString().trim().length() == selectedPhoneLength;
                btnLoginPhoneSubmit.setEnabled(isValid);
            }

            @Override
            public void onNothingSelected(android.widget.AdapterView<?> parent) {}
        });

        inputLoginPhone.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {}

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                boolean isValid = s.toString().trim().length() == selectedPhoneLength;
                btnLoginPhoneSubmit.setEnabled(isValid);
            }

            @Override
            public void afterTextChanged(Editable s) {}
        });

        btnLoginPhoneBack.setOnClickListener(v -> showStep(1));
        btnLoginPhoneSubmit.setOnClickListener(v -> sendOtpAndTransition());

        try {
            mAuth = FirebaseAuth.getInstance();
            mCallbacks = new PhoneAuthProvider.OnVerificationStateChangedCallbacks() {
                @Override
                public void onVerificationCompleted(com.google.firebase.auth.PhoneAuthCredential credential) {
                    String code = credential.getSmsCode();
                    if (code != null) {
                        final EditText[] otpBoxes = {inputLoginOtp1, inputLoginOtp2, inputLoginOtp3, inputLoginOtp4, inputLoginOtp5, inputLoginOtp6};
                        for (int j = 0; j < 6; j++) {
                            if (j < code.length()) {
                                otpBoxes[j].setText(String.valueOf(code.charAt(j)));
                            }
                        }
                        otpBoxes[5].requestFocus();
                    }
                    signInWithPhoneAuthCredential(credential);
                }

                @Override
                public void onVerificationFailed(com.google.firebase.FirebaseException e) {
                    runOnUiThread(() -> {
                        btnLoginPhoneSubmit.setEnabled(true);
                        Toast.makeText(LoginActivity.this, "Verification failed: " + e.getLocalizedMessage(), Toast.LENGTH_LONG).show();
                    });
                }

                @Override
                public void onCodeSent(String verificationId, PhoneAuthProvider.ForceResendingToken token) {
                    mVerificationId = verificationId;
                    mResendToken = token;
                    runOnUiThread(() -> {
                        btnLoginPhoneSubmit.setEnabled(true);
                        String phoneVal = inputLoginPhone.getText().toString().trim();
                        textLoginOtpSubtitle.setText("We've sent a 6-digit verification code to " + selectedCountryCode + " " + phoneVal);
                        showStep(3);
                        setupLoginOtpInputs();
                        startOtpCountdown();
                    });
                }
            };
        } catch (Exception e) {
            Log.e(TAG, "Firebase Auth not initialized: " + e.getMessage());
            mAuth = null;
        }
        
        btnLoginOtpBack.setOnClickListener(v -> {
            stopOtpCountdown();
            showStep(2);
        });
        
        btnLoginOtpSubmit.setOnClickListener(v -> performLoginOtpVerification());
    }

    private void showStep(int step) {
        layoutLoginMain.setVisibility(step == 1 ? View.VISIBLE : View.GONE);
        layoutLoginPhone.setVisibility(step == 2 ? View.VISIBLE : View.GONE);
        layoutLoginOtp.setVisibility(step == 3 ? View.VISIBLE : View.GONE);
    }

    private void sendOtpAndTransition() {
        if (mAuth == null) {
            btnLoginPhoneSubmit.setEnabled(true);
            new AlertDialog.Builder(this, android.R.style.Theme_DeviceDefault_Dialog_Alert)
                .setTitle("Firebase Not Configured")
                .setMessage("Firebase Phone Authentication is not configured.\n\nWould you like to run in local Simulated Mode for testing?")
                .setPositiveButton("Simulated Mode", (dialog, which) -> sendSimulatedOtpAndTransition())
                .setNegativeButton("Cancel", null)
                .show();
            return;
        }
        String phoneVal = inputLoginPhone.getText().toString().trim();
        btnLoginPhoneSubmit.setEnabled(false);
        String fullPhoneNumber = selectedCountryCode + phoneVal;
        
        try {
            PhoneAuthOptions options =
                    PhoneAuthOptions.newBuilder(mAuth)
                            .setPhoneNumber(fullPhoneNumber)
                            .setTimeout(60L, TimeUnit.SECONDS)
                            .setActivity(this)
                            .setCallbacks(mCallbacks)
                            .build();
            PhoneAuthProvider.verifyPhoneNumber(options);
        } catch (Exception e) {
            btnLoginPhoneSubmit.setEnabled(true);
            Toast.makeText(this, "Error starting phone verification: " + e.getMessage(), Toast.LENGTH_SHORT).show();
        }
    }

    private void sendSimulatedOtpAndTransition() {
        final String phoneVal = inputLoginPhone.getText().toString().trim();
        btnLoginPhoneSubmit.setEnabled(false);
        mVerificationId = null; // Mark as simulated
        
        try {
            JSONObject body = new JSONObject();
            body.put("countryCode", selectedCountryCode);
            body.put("phoneNumber", phoneVal);

            makeHttpRequest("/phone-send-otp", body.toString(), new HttpCallback() {
                @Override
                public void onResponse(int statusCode, String response) {
                    runOnUiThread(() -> btnLoginPhoneSubmit.setEnabled(true));
                    try {
                         JSONObject json = new JSONObject(response);
                         if (statusCode == 200) {
                             String otpCode = json.optString("otpCode");
                             runOnUiThread(() -> {
                                 if (!otpCode.isEmpty()) {
                                     Toast.makeText(LoginActivity.this, "[Simulated Mode] OTP sent: " + otpCode, Toast.LENGTH_LONG).show();
                                 } else {
                                     Toast.makeText(LoginActivity.this, "OTP sent successfully via SMS.", Toast.LENGTH_SHORT).show();
                                 }
                                 textLoginOtpSubtitle.setText("[Simulated] We've sent a code to " + selectedCountryCode + " " + phoneVal);
                                 showStep(3);
                                 setupLoginOtpInputs();
                                 startOtpCountdown();
                             });
                         } else {
                             String errorMsg = json.has("error") ? json.getJSONObject("error").getString("message") : "Failed to send OTP.";
                             runOnUiThread(() -> Toast.makeText(LoginActivity.this, "⚠️ " + errorMsg, Toast.LENGTH_SHORT).show());
                         }
                    } catch (Exception e) {
                         runOnUiThread(() -> Toast.makeText(LoginActivity.this, "Error parsing server response.", Toast.LENGTH_SHORT).show());
                    }
                }

                @Override
                public void onError(Exception e) {
                    runOnUiThread(() -> {
                        btnLoginPhoneSubmit.setEnabled(true);
                        Toast.makeText(LoginActivity.this, "⚠️ Connection error.", Toast.LENGTH_SHORT).show();
                    });
                }
            });
        } catch (Exception e) {
            btnLoginPhoneSubmit.setEnabled(true);
        }
    }

    private void setupLoginOtpInputs() {
        final EditText[] otpBoxes = {inputLoginOtp1, inputLoginOtp2, inputLoginOtp3, inputLoginOtp4, inputLoginOtp5, inputLoginOtp6};
        
        for (EditText box : otpBoxes) {
            box.setText("");
        }
        otpBoxes[0].requestFocus();

        for (int i = 0; i < 6; i++) {
            final int index = i;
            otpBoxes[i].addTextChangedListener(new TextWatcher() {
                @Override
                public void beforeTextChanged(CharSequence s, int start, int count, int after) {}

                @Override
                public void onTextChanged(CharSequence s, int start, int before, int count) {
                    if (s.length() > 1) {
                        String pasted = s.toString().trim();
                        if (pasted.length() == 6) {
                            for (int j = 0; j < 6; j++) {
                                otpBoxes[j].setText(String.valueOf(pasted.charAt(j)));
                            }
                            otpBoxes[5].requestFocus();
                        } else {
                            otpBoxes[index].setText(String.valueOf(pasted.charAt(0)));
                        }
                    } else if (s.length() == 1 && index < 5) {
                        otpBoxes[index + 1].requestFocus();
                    }
                    
                    checkAndAutoVerifyLoginOtp();
                }

                @Override
                public void afterTextChanged(Editable s) {}
            });

            otpBoxes[i].setOnKeyListener((v, keyCode, event) -> {
                if (keyCode == KeyEvent.KEYCODE_DEL && event.getAction() == KeyEvent.ACTION_DOWN) {
                    if (otpBoxes[index].getText().toString().isEmpty() && index > 0) {
                        otpBoxes[index - 1].setText("");
                        otpBoxes[index - 1].requestFocus();
                        return true;
                    }
                }
                return false;
            });
        }

        SMSReceiver.bindListener(otp -> {
            runOnUiThread(() -> {
                if (otp != null && otp.length() == 6) {
                    for (int j = 0; j < 6; j++) {
                        otpBoxes[j].setText(String.valueOf(otp.charAt(j)));
                    }
                    otpBoxes[5].requestFocus();
                    performLoginOtpVerification();
                }
            });
        });
    }

    private void checkAndAutoVerifyLoginOtp() {
        final EditText[] otpBoxes = {inputLoginOtp1, inputLoginOtp2, inputLoginOtp3, inputLoginOtp4, inputLoginOtp5, inputLoginOtp6};
        StringBuilder sb = new StringBuilder();
        for (EditText box : otpBoxes) {
            sb.append(box.getText().toString().trim());
        }
        boolean isValid = sb.toString().length() == 6;
        btnLoginOtpSubmit.setEnabled(isValid);
        if (isValid) {
            performLoginOtpVerification();
        }
    }

    private void performLoginOtpVerification() {
        final EditText[] otpBoxes = {inputLoginOtp1, inputLoginOtp2, inputLoginOtp3, inputLoginOtp4, inputLoginOtp5, inputLoginOtp6};
        StringBuilder sb = new StringBuilder();
        for (EditText box : otpBoxes) {
            sb.append(box.getText().toString().trim());
        }
        String enteredOtp = sb.toString();
        btnLoginOtpSubmit.setEnabled(false);
        
        if (mVerificationId != null) {
            PhoneAuthCredential credential = PhoneAuthProvider.getCredential(mVerificationId, enteredOtp);
            signInWithPhoneAuthCredential(credential);
        } else {
            String phoneVal = inputLoginPhone.getText().toString().trim();
            verifyPhoneOtp(selectedCountryCode, phoneVal, enteredOtp);
        }
    }

    private void startOtpCountdown() {
        stopOtpCountdown();
        countdownSeconds = 60;
        
        timerRunnable = new Runnable() {
            @Override
            public void run() {
                if (countdownSeconds > 0) {
                    countdownSeconds--;
                    textLoginOtpCountdown.setText("Resend code in " + countdownSeconds + "s");
                    timerHandler.postDelayed(this, 1000);
                } else {
                    textLoginOtpCountdown.setText("OTP code expired. Please request a new one.");
                }
            }
        };
        timerHandler.post(timerRunnable);
    }

    private void stopOtpCountdown() {
        if (timerRunnable != null) {
            timerHandler.removeCallbacks(timerRunnable);
            timerRunnable = null;
        }
    }

    private void performLogin(String email, String password) {
        try {
            JSONObject body = new JSONObject();
            body.put("email", email);
            body.put("password", password);

            makeHttpRequest("/login", body.toString(), new HttpCallback() {
                @Override
                public void onResponse(int statusCode, String response) {
                    try {
                        JSONObject json = new JSONObject(response);
                        if (statusCode == 200) {
                            failedLoginAttempts = 0;
                            String token = json.getString("accessToken");
                            JSONObject user = json.getJSONObject("user");
                            saveSession(user.getString("name"), user.getString("email"), token);
                            Toast.makeText(LoginActivity.this, "✓ Logged in successfully!", Toast.LENGTH_SHORT).show();
                            startActivity(new Intent(LoginActivity.this, MainActivity.class));
                            finish();
                        } else {
                            String errorMsg = json.has("error") ? json.getJSONObject("error").getString("message") : "Login failed.";
                            Toast.makeText(LoginActivity.this, "⚠️ " + errorMsg, Toast.LENGTH_SHORT).show();
                            if (statusCode == 401) {
                                failedLoginAttempts++;
                                if (failedLoginAttempts >= 3) {
                                    showForgotPasswordPrompt();
                                }
                            }
                        }
                    } catch (Exception e) {
                        Toast.makeText(LoginActivity.this, "Error parsing server response.", Toast.LENGTH_SHORT).show();
                    }
                }

                @Override
                public void onError(Exception e) {
                    Toast.makeText(LoginActivity.this, "⚠️ Cannot connect to server. Check IP config.", Toast.LENGTH_LONG).show();
                }
            });
        } catch (Exception e) {
            Log.e(TAG, "Login error", e);
        }
    }

    private void showForgotPasswordPrompt() {
        new AlertDialog.Builder(LoginActivity.this)
            .setTitle("Forgot Password?")
            .setMessage("It looks like you've entered the wrong password continuously. Would you like to reset your password?")
            .setPositiveButton("Reset Password", (dialog, which) -> {
                failedLoginAttempts = 0;
                startActivity(new Intent(LoginActivity.this, RecoverActivity.class));
            })
            .setNegativeButton("Keep Trying", null)
            .show();
    }

    private void performSsoLogin(String email, String provider) {
        try {
            JSONObject body = new JSONObject();
            body.put("email", email);
            body.put("name", email.split("@")[0]);
            body.put("provider", provider);
            body.put("flow", "login");

            makeHttpRequest("/sso-login", body.toString(), new HttpCallback() {
                @Override
                public void onResponse(int statusCode, String response) {
                    try {
                        JSONObject json = new JSONObject(response);
                        if (statusCode == 200) {
                            String token = json.getString("accessToken");
                            JSONObject user = json.getJSONObject("user");
                            saveSession(user.getString("name"), user.getString("email"), token);
                            Toast.makeText(LoginActivity.this, "✓ Connected via " + provider + ": " + email, Toast.LENGTH_SHORT).show();
                            startActivity(new Intent(LoginActivity.this, MainActivity.class));
                            finish();
                        } else if (statusCode == 404 || (json.has("error") && "UNREGISTERED_SSO".equals(json.getJSONObject("error").optString("code")))) {
                            runOnUiThread(() -> {
                                new AlertDialog.Builder(LoginActivity.this, android.R.style.Theme_DeviceDefault_Dialog_Alert)
                                    .setTitle(provider + " Account Not Registered")
                                    .setMessage("No DnD account is associated with this " + provider + " account.")
                                    .setPositiveButton("Create Account", (dialog, which) -> {
                                        Intent intent = new Intent(LoginActivity.this, SignupActivity.class);
                                        intent.putExtra("email", email);
                                        intent.putExtra("sso_provider", provider);
                                        startActivity(intent);
                                        finish();
                                    })
                                    .setNegativeButton("Choose Another Account", (dialog, which) -> {
                                        if ("Google".equals(provider)) {
                                            showGoogleAccountChooser();
                                        } else {
                                            showAppleAccountChooser();
                                        }
                                    })
                                    .setNeutralButton("Close", null)
                                    .setCancelable(false)
                                    .show();
                            });
                        } else {
                            String errorMsg = json.has("error") ? json.getJSONObject("error").getString("message") : "SSO Login failed.";
                            runOnUiThread(() -> Toast.makeText(LoginActivity.this, "⚠️ " + errorMsg, Toast.LENGTH_SHORT).show());
                        }
                    } catch (Exception e) {
                        runOnUiThread(() -> Toast.makeText(LoginActivity.this, "Error parsing server response.", Toast.LENGTH_SHORT).show());
                    }
                }

                @Override
                public void onError(Exception e) {
                    runOnUiThread(() -> Toast.makeText(LoginActivity.this, "⚠️ SSO connection error.", Toast.LENGTH_SHORT).show());
                }
            });
        } catch (Exception e) {
            Log.e(TAG, "SSO Login error", e);
        }
    }

    private void sendPhoneOtp(String cc, String phone) {
        try {
            JSONObject body = new JSONObject();
            body.put("countryCode", cc);
            body.put("phoneNumber", phone);

            makeHttpRequest("/phone-send-otp", body.toString(), new HttpCallback() {
                @Override
                public void onResponse(int statusCode, String response) {
                    try {
                        JSONObject json = new JSONObject(response);
                        if (statusCode == 200) {
                            String otpCode = json.optString("otpCode");
                            if (!otpCode.isEmpty()) {
                                Toast.makeText(LoginActivity.this, "[SMS Simulation] OTP sent: " + otpCode, Toast.LENGTH_LONG).show();
                            } else {
                                Toast.makeText(LoginActivity.this, "OTP sent successfully via SMS.", Toast.LENGTH_SHORT).show();
                            }
                            showPhoneOtpVerifyDialog(cc, phone);
                        } else {
                            String errorMsg = json.has("error") ? json.getJSONObject("error").getString("message") : "Failed to send OTP.";
                            Toast.makeText(LoginActivity.this, "⚠️ " + errorMsg, Toast.LENGTH_SHORT).show();
                        }
                    } catch (Exception e) {
                        Toast.makeText(LoginActivity.this, "Error parsing server response.", Toast.LENGTH_SHORT).show();
                    }
                }

                @Override
                public void onError(Exception e) {
                    Toast.makeText(LoginActivity.this, "⚠️ Connection error.", Toast.LENGTH_SHORT).show();
                }
            });
        } catch (Exception e) {
            Log.e(TAG, "Phone send OTP error", e);
        }
    }

    private void showPhoneOtpVerifyDialog(String cc, String phone) {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("Verify Phone");
        
        android.widget.LinearLayout rootLayout = new android.widget.LinearLayout(this);
        rootLayout.setOrientation(android.widget.LinearLayout.VERTICAL);
        android.widget.LinearLayout.LayoutParams rootParams = new android.widget.LinearLayout.LayoutParams(
            android.view.ViewGroup.LayoutParams.MATCH_PARENT,
            android.view.ViewGroup.LayoutParams.WRAP_CONTENT
        );
        int margin = (int) (16 * getResources().getDisplayMetrics().density);
        rootParams.leftMargin = margin;
        rootParams.rightMargin = margin;
        rootParams.topMargin = margin;
        rootParams.bottomMargin = margin;
        rootLayout.setLayoutParams(rootParams);

        android.widget.TextView labelSub = new android.widget.TextView(this);
        labelSub.setText("Enter the 6-digit verification code sent to " + cc + " " + phone + "\n(SMS auto-fill is active)");
        labelSub.setTextColor(android.graphics.Color.GRAY);
        labelSub.setTextSize(14);
        labelSub.setPadding(0, 0, 0, (int) (10 * getResources().getDisplayMetrics().density));
        rootLayout.addView(labelSub);

        final EditText otpInput = new EditText(this);
        otpInput.setHint("000000");
        otpInput.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
        otpInput.setGravity(android.view.Gravity.CENTER);
        otpInput.setFilters(new android.text.InputFilter[]{new android.text.InputFilter.LengthFilter(6)});
        otpInput.setTextSize(24);
        otpInput.setTypeface(android.graphics.Typeface.DEFAULT_BOLD);
        rootLayout.addView(otpInput);

        builder.setView(rootLayout);

        // Bind SMS auto-fill receiver callback
        SMSReceiver.bindListener(otp -> {
            runOnUiThread(() -> {
                otpInput.setText(otp);
                Toast.makeText(LoginActivity.this, "✓ OTP Auto-filled from SMS: " + otp, Toast.LENGTH_SHORT).show();
            });
        });

        builder.setPositiveButton("Verify", (dialog, which) -> {
            String enteredOtp = otpInput.getText().toString().trim();
            verifyPhoneOtp(cc, phone, enteredOtp);
        });
        builder.setNegativeButton("Cancel", (dialog, which) -> dialog.cancel());
        
        AlertDialog dialog = builder.create();
        dialog.setOnDismissListener(d -> SMSReceiver.unbindListener());
        dialog.show();
    }

    private void verifyPhoneOtp(String cc, String phone, String code) {
        try {
            JSONObject body = new JSONObject();
            body.put("countryCode", cc);
            body.put("phoneNumber", phone);
            body.put("code", code);
            body.put("flow", "login");

            makeHttpRequest("/phone-verify-otp", body.toString(), new HttpCallback() {
                @Override
                public void onResponse(int statusCode, String response) {
                    try {
                        JSONObject json = new JSONObject(response);
                        if (statusCode == 200) {
                            boolean isRegistered = json.getBoolean("isRegistered");
                            if (isRegistered) {
                                String token = json.getString("accessToken");
                                JSONObject user = json.getJSONObject("user");
                                saveSession(user.getString("name"), user.getString("email"), token);
                                runOnUiThread(() -> {
                                    Toast.makeText(LoginActivity.this, "✓ Verification successful! Logged in.", Toast.LENGTH_SHORT).show();
                                    startActivity(new Intent(LoginActivity.this, MainActivity.class));
                                    finish();
                                });
                            } else {
                                final String verifyToken = json.getString("phoneVerificationToken");
                                runOnUiThread(() -> {
                                    new AlertDialog.Builder(LoginActivity.this, android.R.style.Theme_DeviceDefault_Dialog_Alert)
                                        .setTitle("Phone Number Not Registered")
                                        .setMessage("No DnD account is associated with this number.")
                                        .setPositiveButton("Create Account", (dialog, which) -> {
                                            Intent intent = new Intent(LoginActivity.this, SignupActivity.class);
                                            intent.putExtra("phone_verification_token", verifyToken);
                                            intent.putExtra("country_code", cc);
                                            intent.putExtra("phone_number", phone);
                                            startActivity(intent);
                                            finish();
                                        })
                                        .setNegativeButton("Try Another Number", (dialog, which) -> {
                                            showStep(2);
                                        })
                                        .setCancelable(false)
                                        .show();
                                });
                            }
                        } else {
                            String errorMsg = json.has("error") ? json.getJSONObject("error").getString("message") : "Verification failed.";
                            runOnUiThread(() -> Toast.makeText(LoginActivity.this, "⚠️ " + errorMsg, Toast.LENGTH_SHORT).show());
                        }
                    } catch (Exception e) {
                        runOnUiThread(() -> Toast.makeText(LoginActivity.this, "Error parsing server response.", Toast.LENGTH_SHORT).show());
                    }
                }

                @Override
                public void onError(Exception e) {
                    runOnUiThread(() -> Toast.makeText(LoginActivity.this, "⚠️ Connection error during verification.", Toast.LENGTH_SHORT).show());
                }
            });
        } catch (Exception e) {
            Log.e(TAG, "Phone OTP verify error", e);
        }
    }

    private void signInWithPhoneAuthCredential(PhoneAuthCredential credential) {
        mAuth.signInWithCredential(credential)
            .addOnCompleteListener(this, task -> {
                if (task.isSuccessful()) {
                    FirebaseUser user = mAuth.getCurrentUser();
                    if (user != null) {
                        user.getIdToken(true).addOnCompleteListener(tokenTask -> {
                            if (tokenTask.isSuccessful()) {
                                String idToken = tokenTask.getResult().getToken();
                                exchangeFirebaseToken(idToken);
                            } else {
                                runOnUiThread(() -> {
                                    btnLoginOtpSubmit.setEnabled(true);
                                    Toast.makeText(LoginActivity.this, "Failed to get Firebase ID token.", Toast.LENGTH_SHORT).show();
                                });
                            }
                        });
                    }
                } else {
                    runOnUiThread(() -> {
                        btnLoginOtpSubmit.setEnabled(true);
                        Toast.makeText(LoginActivity.this, "Invalid verification code.", Toast.LENGTH_SHORT).show();
                    });
                }
            });
    }

    private void exchangeFirebaseToken(final String idToken) {
        try {
            JSONObject body = new JSONObject();
            body.put("idToken", idToken);

            makeHttpRequest("/firebase-login", body.toString(), new HttpCallback() {
                @Override
                public void onResponse(int statusCode, String response) {
                    try {
                        JSONObject json = new JSONObject(response);
                        if (statusCode == 200) {
                            boolean isRegistered = json.getBoolean("isRegistered");
                            if (isRegistered) {
                                String token = json.getString("accessToken");
                                JSONObject user = json.getJSONObject("user");
                                saveSession(user.getString("name"), user.getString("email"), token);
                                runOnUiThread(() -> {
                                    Toast.makeText(LoginActivity.this, "✓ Verification successful! Logged in.", Toast.LENGTH_SHORT).show();
                                    startActivity(new Intent(LoginActivity.this, MainActivity.class));
                                    finish();
                                });
                            } else {
                                final String verifyToken = json.getString("phoneVerificationToken");
                                final String phone = json.getString("phoneNumber");
                                runOnUiThread(() -> {
                                    new AlertDialog.Builder(LoginActivity.this, android.R.style.Theme_DeviceDefault_Dialog_Alert)
                                        .setTitle("Phone Number Not Registered")
                                        .setMessage("No DnD account is associated with this number.")
                                        .setPositiveButton("Create Account", (dialog, which) -> {
                                            Intent intent = new Intent(LoginActivity.this, SignupActivity.class);
                                            intent.putExtra("phone_verification_token", verifyToken);
                                            intent.putExtra("country_code", "");
                                            intent.putExtra("phone_number", phone);
                                            startActivity(intent);
                                            finish();
                                        })
                                        .setNegativeButton("Try Another Number", (dialog, which) -> {
                                            showStep(2);
                                        })
                                        .setCancelable(false)
                                        .show();
                                });
                            }
                        } else {
                            String errorMsg = json.has("error") ? json.getJSONObject("error").getString("message") : "Verification failed.";
                            runOnUiThread(() -> {
                                btnLoginOtpSubmit.setEnabled(true);
                                Toast.makeText(LoginActivity.this, "⚠️ " + errorMsg, Toast.LENGTH_SHORT).show();
                            });
                        }
                    } catch (Exception e) {
                        runOnUiThread(() -> {
                            btnLoginOtpSubmit.setEnabled(true);
                            Toast.makeText(LoginActivity.this, "Error parsing server response.", Toast.LENGTH_SHORT).show();
                        });
                    }
                }

                @Override
                public void onError(Exception e) {
                    runOnUiThread(() -> {
                        btnLoginOtpSubmit.setEnabled(true);
                        Toast.makeText(LoginActivity.this, "⚠️ Connection error during verification.", Toast.LENGTH_SHORT).show();
                    });
                }
            });
        } catch (Exception e) {
            Log.e(TAG, "Firebase token exchange error", e);
            btnLoginOtpSubmit.setEnabled(true);
        }
    }

    private void showOtpVerificationDialog(String email, String type) {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("Verify Account");
        
        android.widget.LinearLayout rootLayout = new android.widget.LinearLayout(this);
        rootLayout.setOrientation(android.widget.LinearLayout.VERTICAL);
        android.widget.LinearLayout.LayoutParams rootParams = new android.widget.LinearLayout.LayoutParams(
            android.view.ViewGroup.LayoutParams.MATCH_PARENT,
            android.view.ViewGroup.LayoutParams.WRAP_CONTENT
        );
        int margin = (int) (16 * getResources().getDisplayMetrics().density);
        rootParams.leftMargin = margin;
        rootParams.rightMargin = margin;
        rootParams.topMargin = margin;
        rootParams.bottomMargin = margin;
        rootLayout.setLayoutParams(rootParams);

        android.widget.TextView labelSub = new android.widget.TextView(this);
        labelSub.setText("Enter the 6-digit OTP code sent to " + email);
        labelSub.setTextColor(android.graphics.Color.GRAY);
        labelSub.setTextSize(14);
        labelSub.setPadding(0, 0, 0, (int) (10 * getResources().getDisplayMetrics().density));
        rootLayout.addView(labelSub);

        final EditText otpInput = new EditText(this);
        otpInput.setHint("000000");
        otpInput.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
        otpInput.setGravity(android.view.Gravity.CENTER);
        otpInput.setFilters(new android.text.InputFilter[]{new android.text.InputFilter.LengthFilter(6)});
        otpInput.setTextSize(24);
        otpInput.setTypeface(android.graphics.Typeface.DEFAULT_BOLD);
        rootLayout.addView(otpInput);

        builder.setView(rootLayout);

        builder.setPositiveButton("Verify", (dialog, which) -> {
            String enteredOtp = otpInput.getText().toString().trim();
            verifyEmailOtp(email, enteredOtp, type);
        });
        builder.setNegativeButton("Cancel", (dialog, which) -> dialog.cancel());
        builder.show();
    }

    private void verifyEmailOtp(String email, String code, String type) {
        try {
            JSONObject body = new JSONObject();
            body.put("email", email);
            body.put("code", code);
            body.put("type", type);

            makeHttpRequest("/verify-otp", body.toString(), new HttpCallback() {
                @Override
                public void onResponse(int statusCode, String response) {
                    try {
                        JSONObject json = new JSONObject(response);
                        if (statusCode == 200) {
                            String token = json.getString("accessToken");
                            JSONObject user = json.getJSONObject("user");
                            saveSession(user.getString("name"), user.getString("email"), token);
                            Toast.makeText(LoginActivity.this, "✓ Account verified successfully!", Toast.LENGTH_SHORT).show();
                            startActivity(new Intent(LoginActivity.this, MainActivity.class));
                            finish();
                        } else {
                            String errorMsg = json.has("error") ? json.getJSONObject("error").getString("message") : "Verification failed.";
                            Toast.makeText(LoginActivity.this, "⚠️ " + errorMsg, Toast.LENGTH_SHORT).show();
                        }
                    } catch (Exception e) {
                        Toast.makeText(LoginActivity.this, "Error parsing server response.", Toast.LENGTH_SHORT).show();
                    }
                }

                @Override
                public void onError(Exception e) {
                    Toast.makeText(LoginActivity.this, "⚠️ Connection error.", Toast.LENGTH_SHORT).show();
                }
            });
        } catch (Exception e) {
            Log.e(TAG, "Verify email OTP error", e);
        }
    }

    private void saveSession(String name, String email, String token) {
        prefs.edit()
             .putString("local_username", name)
             .putString("local_email", email)
             .putString("local_token", token)
             .putBoolean("local_profile_exists", true)
             .putBoolean("local_session_active", true)
             .apply();
    }

    private void makeHttpRequest(final String endpoint, final String jsonBody, final HttpCallback callback) {
        new Thread(() -> {
            HttpURLConnection conn = null;
            try {
                URL url = new URL(NetworkConfig.getApiBaseUrl(LoginActivity.this) + endpoint);
                conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("POST");
                conn.setRequestProperty("Content-Type", "application/json; charset=utf-8");
                conn.setRequestProperty("Accept", "application/json");
                conn.setDoOutput(true);
                conn.setDoInput(true);
                conn.setConnectTimeout(8000);
                conn.setReadTimeout(8000);

                OutputStream os = conn.getOutputStream();
                byte[] input = jsonBody.getBytes("utf-8");
                os.write(input, 0, input.length);
                os.close();

                final int responseCode = conn.getResponseCode();
                InputStream is = (responseCode >= 200 && responseCode < 300) 
                    ? conn.getInputStream() 
                    : conn.getErrorStream();
                
                BufferedReader br = new BufferedReader(new InputStreamReader(is, "utf-8"));
                StringBuilder response = new StringBuilder();
                String line;
                while ((line = br.readLine()) != null) {
                    response.append(line.trim());
                }
                br.close();

                final String responseStr = response.toString();
                runOnUiThread(() -> callback.onResponse(responseCode, responseStr));

            } catch (final Exception e) {
                runOnUiThread(() -> {
                    callback.onError(e);
                    NetworkConfig.showConnectionErrorDialog(LoginActivity.this, () -> {
                        makeHttpRequest(endpoint, jsonBody, callback);
                    });
                });
            } finally {
                if (conn != null) {
                    conn.disconnect();
                }
            }
        }).start();
    }

    private static final int REQ_GET_ACCOUNTS_GOOGLE = 1001;
    private static final int REQ_GET_ACCOUNTS_APPLE = 1002;

    private List<String> getDeviceGoogleAccounts() {
        List<String> emails = new java.util.ArrayList<>();
        try {
            if (androidx.core.content.ContextCompat.checkSelfPermission(this, android.Manifest.permission.GET_ACCOUNTS) == android.content.pm.PackageManager.PERMISSION_GRANTED) {
                android.accounts.AccountManager am = android.accounts.AccountManager.get(this);
                android.accounts.Account[] accounts = am.getAccountsByType("com.google");
                for (android.accounts.Account ac : accounts) {
                    if (ac.name != null && ac.name.contains("@")) {
                        emails.add(ac.name);
                    }
                }
            }
        } catch (Exception e) {
            Log.e(TAG, "Error getting accounts", e);
        }
        return emails;
    }

    private List<String> getDeviceAppleAccounts() {
        List<String> emails = new java.util.ArrayList<>();
        try {
            if (androidx.core.content.ContextCompat.checkSelfPermission(this, android.Manifest.permission.GET_ACCOUNTS) == android.content.pm.PackageManager.PERMISSION_GRANTED) {
                android.accounts.AccountManager am = android.accounts.AccountManager.get(this);
                android.accounts.Account[] accounts = am.getAccounts();
                for (android.accounts.Account ac : accounts) {
                    if (ac.name != null && (ac.name.contains("@icloud.com") || ac.name.contains("@me.com") || ac.name.contains("@apple.com"))) {
                        emails.add(ac.name);
                    }
                }
            }
        } catch (Exception e) {
            Log.e(TAG, "Error getting generic accounts", e);
        }
        return emails;
    }

    private void showGoogleAccountChooser() {
        if (androidx.core.content.ContextCompat.checkSelfPermission(this, android.Manifest.permission.GET_ACCOUNTS) != android.content.pm.PackageManager.PERMISSION_GRANTED) {
            androidx.core.app.ActivityCompat.requestPermissions(this, new String[]{android.Manifest.permission.GET_ACCOUNTS}, REQ_GET_ACCOUNTS_GOOGLE);
            return;
        }

        List<String> emails = getDeviceGoogleAccounts();
        if (emails.isEmpty()) {
            emails.add("developer@gmail.com");
            emails.add("tester@gmail.com");
            emails.add("user@gmail.com");
        }
        emails.add("Add another account...");

        final String[] items = emails.toArray(new String[0]);
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("Choose an account to continue to DnD");
        builder.setItems(items, (dialog, which) -> {
            String selected = items[which];
            if (selected.equals("Add another account...")) {
                showManualSsoEmailDialog("Google");
            } else {
                performSsoLogin(selected, "Google");
            }
        });
        builder.show();
    }

    private void showAppleAccountChooser() {
        if (androidx.core.content.ContextCompat.checkSelfPermission(this, android.Manifest.permission.GET_ACCOUNTS) != android.content.pm.PackageManager.PERMISSION_GRANTED) {
            androidx.core.app.ActivityCompat.requestPermissions(this, new String[]{android.Manifest.permission.GET_ACCOUNTS}, REQ_GET_ACCOUNTS_APPLE);
            return;
        }

        List<String> emails = getDeviceAppleAccounts();
        if (emails.isEmpty()) {
            emails.add("developer@icloud.com");
            emails.add("tester@icloud.com");
            emails.add("user@icloud.com");
        }
        emails.add("Add another Apple ID...");

        final String[] items = emails.toArray(new String[0]);
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("Choose an Apple ID to continue to DnD");
        builder.setItems(items, (dialog, which) -> {
            String selected = items[which];
            if (selected.equals("Add another Apple ID...")) {
                showManualSsoEmailDialog("Apple");
            } else {
                performSsoLogin(selected, "Apple");
            }
        });
        builder.show();
    }

    private void showManualSsoEmailDialog(String provider) {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle(provider + " Sign In");
        
        android.widget.FrameLayout container = new android.widget.FrameLayout(this);
        android.widget.FrameLayout.LayoutParams params = new android.widget.FrameLayout.LayoutParams(
            android.view.ViewGroup.LayoutParams.MATCH_PARENT,
            android.view.ViewGroup.LayoutParams.WRAP_CONTENT
        );
        int margin = (int) (16 * getResources().getDisplayMetrics().density);
        params.leftMargin = margin;
        params.rightMargin = margin;
        params.topMargin = margin;
        params.bottomMargin = margin;
        
        final EditText emailInput = new EditText(this);
        emailInput.setHint(provider.equalsIgnoreCase("Google") ? "your.email@gmail.com" : "your.appleid@icloud.com");
        emailInput.setInputType(android.text.InputType.TYPE_TEXT_VARIATION_EMAIL_ADDRESS);
        emailInput.setLayoutParams(params);
        
        container.addView(emailInput);
        builder.setView(container);

        builder.setPositiveButton("Continue", (dialog, which) -> {
            String email = emailInput.getText().toString().trim();
            if (email.isEmpty()) {
                Toast.makeText(this, "⚠️ Email address cannot be empty!", Toast.LENGTH_SHORT).show();
                return;
            }
            if (!android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
                Toast.makeText(this, "⚠️ Please enter a valid email address!", Toast.LENGTH_SHORT).show();
                return;
            }
            performSsoLogin(email, provider);
        });
        builder.setNegativeButton("Cancel", (dialog, which) -> dialog.cancel());
        builder.show();
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == REQ_GET_ACCOUNTS_GOOGLE) {
            showGoogleAccountChooser();
        } else if (requestCode == REQ_GET_ACCOUNTS_APPLE) {
            showAppleAccountChooser();
        }
    }

    public interface HttpCallback {
        void onResponse(int statusCode, String response);
        void onError(Exception e);
    }
}
