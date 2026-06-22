package com.hmnandeesh.dnd;

import android.app.AlertDialog;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.view.View;
import android.view.KeyEvent;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import org.json.JSONObject;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.PhoneAuthCredential;
import com.google.firebase.auth.PhoneAuthOptions;
import com.google.firebase.auth.PhoneAuthProvider;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.FirebaseException;
import java.util.concurrent.TimeUnit;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class SignupActivity extends AppCompatActivity {
    private static final String TAG = "SignupActivity";
    private static final String API_BASE_URL = "http://10.0.2.2:3000/api/auth";

    private SharedPreferences prefs;

    // View Containers
    private LinearLayout stepLayout1, stepLayout2, stepLayoutDob, stepLayoutGender, stepLayoutName, stepLayoutEmailExists, stepLayoutSuccess;

    // Step 1
    private EditText inputEmail;
    private Button btnNext1;

    // Step 2
    private EditText inputPassword;
    private EditText inputConfirmPassword;
    private TextView ruleLen, ruleLet, ruleLowercase, ruleNum, ruleMatch;
    private Button btnBack2, btnNext2;

    // Step 3 (Date of Birth)
    private EditText inputDobDay;
    private EditText inputDobYear;
    private Spinner spinnerDobMonth;
    private Button btnBackDob, btnNextDob;

    // Step 4 (Gender)
    private Spinner spinnerGender;
    private Button btnBackGender, btnNextGender;

    // Step 5 (Name)
    private EditText inputName;
    private Button btnBackName, btnSubmit;

    // Email Exists Screen Actions
    private Button btnExistsGotoLogin, btnExistsClose;

    private TextView linkGotoLogin;

    // Phone & OTP step views
    private LinearLayout stepLayoutPhone, stepLayoutOtp;
    private Spinner spinnerCountry;
    private TextView textDialCode;
    private EditText inputPhone;
    private Button btnPhoneBack, btnPhoneSubmit;
    private TextView textOtpSubtitle, textOtpCountdown;
    private EditText inputOtp1, inputOtp2, inputOtp3, inputOtp4, inputOtp5, inputOtp6;
    private Button btnOtpSubmit, btnOtpResend, btnOtpEdit;
    private int countdownSeconds = 60;
    private android.os.Handler timerHandler = new android.os.Handler(android.os.Looper.getMainLooper());
    private Runnable timerRunnable;
    private String selectedCountryCode = "+91";
    private int selectedPhoneLength = 10;

    // Firebase Auth fields
    private FirebaseAuth mAuth;
    private String mVerificationId;
    private PhoneAuthProvider.ForceResendingToken mResendToken;
    private PhoneAuthProvider.OnVerificationStateChangedCallbacks mCallbacks;

    // Phone registration data from intent
    private String phoneVerificationToken = null;
    private String countryCode = null;
    private String phoneNumber = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signup);

        prefs = getSharedPreferences("CapacitorStorage", Context.MODE_PRIVATE);
        try {
            mAuth = FirebaseAuth.getInstance();
        } catch (Exception e) {
            Log.e(TAG, "Firebase Auth not initialized: " + e.getMessage());
            mAuth = null;
        }

        // Fetch intent extras for phone verification redirect
        if (getIntent() != null) {
            phoneVerificationToken = getIntent().getStringExtra("phone_verification_token");
            countryCode = getIntent().getStringExtra("country_code");
            phoneNumber = getIntent().getStringExtra("phone_number");
        }

        // Initialize Views
        stepLayout1 = findViewById(R.id.layout_signup_step_1);
        stepLayout2 = findViewById(R.id.layout_signup_step_2);
        stepLayoutDob = findViewById(R.id.layout_signup_step_dob);
        stepLayoutGender = findViewById(R.id.layout_signup_step_gender);
        stepLayoutName = findViewById(R.id.layout_signup_step_name);
        stepLayoutEmailExists = findViewById(R.id.layout_signup_email_exists);
        stepLayoutSuccess = findViewById(R.id.layout_signup_success);

        inputEmail = findViewById(R.id.input_signup_email);
        btnNext1 = findViewById(R.id.btn_signup_next_1);

        inputPassword = findViewById(R.id.input_signup_password);
        inputConfirmPassword = findViewById(R.id.input_signup_confirm_password);
        ruleLen = findViewById(R.id.rule_len);
        ruleLet = findViewById(R.id.rule_let);
        ruleLowercase = findViewById(R.id.rule_lowercase);
        ruleNum = findViewById(R.id.rule_num);
        ruleMatch = findViewById(R.id.rule_match);
        btnBack2 = findViewById(R.id.btn_signup_back_2);
        btnNext2 = findViewById(R.id.btn_signup_next_2);

        inputDobDay = findViewById(R.id.input_dob_day);
        inputDobYear = findViewById(R.id.input_dob_year);
        spinnerDobMonth = findViewById(R.id.spinner_dob_month);
        btnBackDob = findViewById(R.id.btn_signup_back_dob);
        btnNextDob = findViewById(R.id.btn_signup_next_dob);

        spinnerGender = findViewById(R.id.spinner_gender);
        btnBackGender = findViewById(R.id.btn_signup_back_gender);
        btnNextGender = findViewById(R.id.btn_signup_next_gender);

        inputName = findViewById(R.id.input_signup_name);
        btnBackName = findViewById(R.id.btn_signup_back_name);
        btnSubmit = findViewById(R.id.btn_signup_submit);

        btnExistsGotoLogin = findViewById(R.id.btn_exists_goto_login);
        btnExistsClose = findViewById(R.id.btn_exists_close);

        linkGotoLogin = findViewById(R.id.link_goto_login);

        // Initialize Phone & OTP Views
        stepLayoutPhone = findViewById(R.id.layout_signup_phone);
        stepLayoutOtp = findViewById(R.id.layout_signup_otp);
        spinnerCountry = findViewById(R.id.spinner_signup_country);
        textDialCode = findViewById(R.id.text_signup_dial_code);
        inputPhone = findViewById(R.id.input_signup_phone);
        btnPhoneBack = findViewById(R.id.btn_signup_phone_back);
        btnPhoneSubmit = findViewById(R.id.btn_signup_phone_submit);
        
        textOtpSubtitle = findViewById(R.id.text_signup_otp_subtitle);
        textOtpCountdown = findViewById(R.id.text_otp_countdown);
        inputOtp1 = findViewById(R.id.input_otp_1);
        inputOtp2 = findViewById(R.id.input_otp_2);
        inputOtp3 = findViewById(R.id.input_otp_3);
        inputOtp4 = findViewById(R.id.input_otp_4);
        inputOtp5 = findViewById(R.id.input_otp_5);
        inputOtp6 = findViewById(R.id.input_otp_6);
        btnOtpSubmit = findViewById(R.id.btn_signup_otp_submit);
        btnOtpResend = findViewById(R.id.btn_signup_otp_resend);
        btnOtpEdit = findViewById(R.id.btn_signup_otp_edit);

        // Setup Spinners
        String[] months = {"Month", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"};
        ArrayAdapter<String> monthAdapter = new ArrayAdapter<>(this, android.R.layout.simple_spinner_item, months);
        monthAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinnerDobMonth.setAdapter(monthAdapter);

        String[] genders = {"Select gender", "Male", "Female", "Non-binary", "Other", "Prefer not to say"};
        ArrayAdapter<String> genderAdapter = new ArrayAdapter<>(this, android.R.layout.simple_spinner_item, genders);
        genderAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinnerGender.setAdapter(genderAdapter);

        // Bind Listeners for Password Rules
        TextWatcher passWatcher = new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {}
            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                validatePasswordRules();
            }
            @Override
            public void afterTextChanged(Editable s) {}
        };
        inputPassword.addTextChangedListener(passWatcher);
        inputConfirmPassword.addTextChangedListener(passWatcher);

        // SSO Button Handlers
        View ssoContainer = findViewById(R.id.layout_signup_sso_container);
        if (ssoContainer != null) ssoContainer.setVisibility(View.GONE);

        View btnSsoPhone = findViewById(R.id.btn_signup_sso_phone);
        View btnSsoGoogle = findViewById(R.id.btn_signup_sso_google);

        if (btnSsoGoogle != null) {
            btnSsoGoogle.setOnClickListener(v -> {
                Intent intent = new Intent(SignupActivity.this, LoginActivity.class);
                intent.putExtra("trigger_sso", "google");
                startActivity(intent);
                finish();
            });
        }

        // Wizard Navigation Flow
        btnNext1.setOnClickListener(v -> {
            String email = inputEmail.getText().toString().trim();
            if (email.isEmpty() || !android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
                Toast.makeText(this, "⚠️ Please enter a valid email address!", Toast.LENGTH_SHORT).show();
                return;
            }

            btnNext1.setEnabled(false);
            try {
                JSONObject body = new JSONObject();
                body.put("email", email);

                makeHttpRequest("/check-email", body.toString(), new HttpCallback() {
                    @Override
                    public void onResponse(int statusCode, String response) {
                        runOnUiThread(() -> btnNext1.setEnabled(true));
                        try {
                            JSONObject json = new JSONObject(response);
                            if (statusCode == 200) {
                                boolean exists = json.getBoolean("exists");
                                runOnUiThread(() -> {
                                    if (exists) {
                                        // Display the custom "This email is already connected" screen
                                        stepLayout1.setVisibility(View.GONE);
                                        stepLayoutEmailExists.setVisibility(View.VISIBLE);
                                    } else {
                                        showStep(2);
                                        validatePasswordRules(); // Initialize button state
                                    }
                                });
                            } else {
                                String errorMsg = json.has("error") ? json.getJSONObject("error").getString("message") : "Error verifying email.";
                                runOnUiThread(() -> Toast.makeText(SignupActivity.this, "⚠️ " + errorMsg, Toast.LENGTH_SHORT).show());
                            }
                        } catch (Exception e) {
                            runOnUiThread(() -> Toast.makeText(SignupActivity.this, "Error parsing server check.", Toast.LENGTH_SHORT).show());
                        }
                    }

                    @Override
                    public void onError(Exception e) {
                        runOnUiThread(() -> {
                            btnNext1.setEnabled(true);
                            Toast.makeText(SignupActivity.this, "⚠️ Connection error. Please check server.", Toast.LENGTH_SHORT).show();
                        });
                    }
                });
            } catch (Exception e) {
                btnNext1.setEnabled(true);
                Log.e(TAG, "Email check payload error", e);
            }
        });

        // Email exists screen buttons
        btnExistsGotoLogin.setOnClickListener(v -> {
            stepLayoutEmailExists.setVisibility(View.GONE);
            startActivity(new Intent(SignupActivity.this, LoginActivity.class));
            finish();
        });

        btnExistsClose.setOnClickListener(v -> {
            stepLayoutEmailExists.setVisibility(View.GONE);
            stepLayout1.setVisibility(View.VISIBLE);
        });

        btnBack2.setOnClickListener(v -> showStep(1));
        btnNext2.setOnClickListener(v -> {
            if (!validatePasswordRules()) {
                Toast.makeText(this, "⚠️ Please satisfy all password requirements!", Toast.LENGTH_SHORT).show();
                return;
            }
            showStep(3);
        });

        btnBackDob.setOnClickListener(v -> showStep(2));
        btnNextDob.setOnClickListener(v -> {
            String day = inputDobDay.getText().toString().trim();
            String year = inputDobYear.getText().toString().trim();
            int monthSel = spinnerDobMonth.getSelectedItemPosition();

            if (day.isEmpty() || monthSel == 0 || year.isEmpty()) {
                Toast.makeText(this, "⚠️ Please enter your date of birth!", Toast.LENGTH_SHORT).show();
                return;
            }
            int dVal = Integer.parseInt(day);
            int yVal = Integer.parseInt(year);
            if (dVal < 1 || dVal > 31 || yVal < 1900 || yVal > java.util.Calendar.getInstance().get(java.util.Calendar.YEAR)) {
                Toast.makeText(this, "⚠️ Invalid date of birth!", Toast.LENGTH_SHORT).show();
                return;
            }
            
            // Calculate age
            java.util.Calendar dob = java.util.Calendar.getInstance();
            dob.set(yVal, monthSel - 1, dVal);
            java.util.Calendar today = java.util.Calendar.getInstance();
            int age = today.get(java.util.Calendar.YEAR) - dob.get(java.util.Calendar.YEAR);
            if (today.get(java.util.Calendar.DAY_OF_YEAR) < dob.get(java.util.Calendar.DAY_OF_YEAR)) {
                age--;
            }
            if (age < 13) {
                Toast.makeText(this, "⚠️ You must be at least 13 years old to sign up.", Toast.LENGTH_LONG).show();
                return;
            }

            showStep(4);
        });

        btnBackGender.setOnClickListener(v -> showStep(3));
        btnNextGender.setOnClickListener(v -> {
            int genderSel = spinnerGender.getSelectedItemPosition();
            if (genderSel == 0) {
                Toast.makeText(this, "⚠️ Please select your gender!", Toast.LENGTH_SHORT).show();
                return;
            }
            showStep(5);
        });

        btnBackName.setOnClickListener(v -> showStep(4));
        btnSubmit.setOnClickListener(v -> {
            String name = inputName.getText().toString().trim();
            if (name.isEmpty()) {
                Toast.makeText(this, "⚠️ Please enter your name!", Toast.LENGTH_SHORT).show();
                return;
            }
            performSignup();
        });

        linkGotoLogin.setOnClickListener(v -> {
            startActivity(new Intent(this, LoginActivity.class));
            finish();
        });

        // If already verified from login redirection, customize UI
        if (phoneVerificationToken != null) {
            TextView textSignupTitle = findViewById(R.id.text_signup_title);
            if (textSignupTitle != null) {
                textSignupTitle.setText("Sign up with " + countryCode + " " + phoneNumber);
            }
            if (ssoContainer != null) {
                ssoContainer.setVisibility(View.GONE);
            }
        }
    }

    private void showStep(int step) {
        stepLayout1.setVisibility(step == 1 ? View.VISIBLE : View.GONE);
        stepLayout2.setVisibility(step == 2 ? View.VISIBLE : View.GONE);
        stepLayoutDob.setVisibility(step == 3 ? View.VISIBLE : View.GONE);
        stepLayoutGender.setVisibility(step == 4 ? View.VISIBLE : View.GONE);
        stepLayoutName.setVisibility(step == 5 ? View.VISIBLE : View.GONE);
        stepLayoutSuccess.setVisibility(step == 6 ? View.VISIBLE : View.GONE);
        stepLayoutPhone.setVisibility(step == 7 ? View.VISIBLE : View.GONE);
        stepLayoutOtp.setVisibility(step == 8 ? View.VISIBLE : View.GONE);
        stepLayoutEmailExists.setVisibility(View.GONE);
    }

    private boolean validatePasswordRules() {
        String pass = inputPassword.getText().toString();
        String confirm = inputConfirmPassword.getText().toString();

        boolean isLengthValid = pass.length() >= 8;
        boolean hasUppercase = pass.matches(".*[A-Z].*");
        boolean hasLowercase = pass.matches(".*[a-z].*");
        boolean hasNumOrSpec = pass.matches(".*[0-9!@#$%^&*(),.?\":{}|<>].*");
        boolean isMatch = !pass.isEmpty() && pass.equals(confirm);

        updateRuleText(ruleLen, isLengthValid, "At least 8 characters");
        updateRuleText(ruleLet, hasUppercase, "At least 1 uppercase letter");
        updateRuleText(ruleLowercase, hasLowercase, "At least 1 lowercase letter");
        updateRuleText(ruleNum, hasNumOrSpec, "At least 1 number or symbol");
        updateRuleText(ruleMatch, isMatch, "Passwords match");

        boolean allValid = isLengthValid && hasUppercase && hasLowercase && hasNumOrSpec && isMatch;
        btnNext2.setEnabled(allValid);

        return allValid;
    }

    private void updateRuleText(TextView tv, boolean isValid, String text) {
        if (tv == null) return;
        if (isValid) {
            tv.setText("✓ " + text);
            tv.setTextColor(android.graphics.Color.parseColor("#10b981")); // Green
        } else {
            tv.setText("✗ " + text);
            tv.setTextColor(android.graphics.Color.parseColor("#ef4444")); // Red
        }
    }

    private void performSignup() {
        try {
            String name = inputName.getText().toString().trim();
            String email = inputEmail.getText().toString().trim();
            String password = inputPassword.getText().toString();
            String confirmPassword = inputConfirmPassword.getText().toString();

            // Format Date of Birth: YYYY-MM-DD
            int monthSel = spinnerDobMonth.getSelectedItemPosition();
            String dob = inputDobYear.getText().toString().trim() + "-" +
                         String.format(java.util.Locale.US, "%02d", monthSel) + "-" +
                         String.format(java.util.Locale.US, "%02d", Integer.parseInt(inputDobDay.getText().toString().trim()));
            String gender = spinnerGender.getSelectedItem().toString();
            
            JSONObject body = new JSONObject();
            body.put("name", name);
            body.put("email", email);
            body.put("password", password);
            body.put("confirmPassword", confirmPassword);
            body.put("dob", dob);
            body.put("gender", gender);

            if (phoneVerificationToken != null) {
                // Phone register path
                body.put("phoneVerificationToken", phoneVerificationToken);
                body.put("countryCode", countryCode);
                body.put("phoneNumber", phoneNumber);

                makeHttpRequest("/phone-register", body.toString(), new HttpCallback() {
                    @Override
                    public void onResponse(int statusCode, String response) {
                        try {
                            JSONObject json = new JSONObject(response);
                            if (statusCode == 200) {
                                String token = json.getString("accessToken");
                                JSONObject user = json.getJSONObject("user");
                                saveSession(user.getString("name"), user.getString("email"), token);
                                Toast.makeText(SignupActivity.this, "✓ Account registered successfully!", Toast.LENGTH_SHORT).show();
                                startActivity(new Intent(SignupActivity.this, MainActivity.class));
                                finish();
                            } else {
                                String errorMsg = json.has("error") ? json.getJSONObject("error").getString("message") : "Registration failed.";
                                Toast.makeText(SignupActivity.this, "⚠️ " + errorMsg, Toast.LENGTH_SHORT).show();
                            }
                        } catch (Exception e) {
                            Toast.makeText(SignupActivity.this, "Error parsing server response.", Toast.LENGTH_SHORT).show();
                        }
                    }

                    @Override
                    public void onError(Exception e) {
                        Toast.makeText(SignupActivity.this, "⚠️ Cannot connect to registration server.", Toast.LENGTH_SHORT).show();
                    }
                });
            } else {
                // Email standard progressive sign up
                makeHttpRequest("/signup", body.toString(), new HttpCallback() {
                    @Override
                    public void onResponse(int statusCode, String response) {
                        try {
                            JSONObject json = new JSONObject(response);
                            if (statusCode == 201) {
                                String token = json.getString("accessToken");
                                JSONObject user = json.getJSONObject("user");
                                saveSession(user.getString("name"), user.getString("email"), token);
                                
                                showStep(6); // Show the success step
                                Toast.makeText(SignupActivity.this, "✓ Account created successfully!", Toast.LENGTH_SHORT).show();
                                
                                new android.os.Handler(android.os.Looper.getMainLooper()).postDelayed(() -> {
                                    startActivity(new Intent(SignupActivity.this, MainActivity.class));
                                    finish();
                                }, 2000);
                            } else {
                                String errorMsg = json.has("error") ? json.getJSONObject("error").getString("message") : "Sign up failed.";
                                Toast.makeText(SignupActivity.this, "⚠️ " + errorMsg, Toast.LENGTH_SHORT).show();
                            }
                        } catch (Exception e) {
                            Toast.makeText(SignupActivity.this, "Error parsing server response.", Toast.LENGTH_SHORT).show();
                        }
                    }

                    @Override
                    public void onError(Exception e) {
                        Toast.makeText(SignupActivity.this, "⚠️ Connection error.", Toast.LENGTH_SHORT).show();
                    }
                });
            }
        } catch (Exception e) {
            Log.e(TAG, "Signup error", e);
        }
    }

    private void showOtpVerificationDialog(String email) {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("Verify Account");
        builder.setCancelable(false);
        
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
            verifyEmailOtp(email, enteredOtp);
        });
        builder.setNegativeButton("Cancel", (dialog, which) -> {
            dialog.cancel();
            startActivity(new Intent(SignupActivity.this, LoginActivity.class));
            finish();
        });
        builder.show();
    }

    private void verifyEmailOtp(String email, String code) {
        try {
            JSONObject body = new JSONObject();
            body.put("email", email);
            body.put("code", code);
            body.put("type", "signup");

            makeHttpRequest("/verify-otp", body.toString(), new HttpCallback() {
                @Override
                public void onResponse(int statusCode, String response) {
                    try {
                        JSONObject json = new JSONObject(response);
                        if (statusCode == 200) {
                            String token = json.getString("accessToken");
                            JSONObject user = json.getJSONObject("user");
                            saveSession(user.getString("name"), user.getString("email"), token);
                            Toast.makeText(SignupActivity.this, "✓ Account verified successfully!", Toast.LENGTH_SHORT).show();
                            startActivity(new Intent(SignupActivity.this, MainActivity.class));
                            finish();
                        } else {
                            String errorMsg = json.has("error") ? json.getJSONObject("error").getString("message") : "Verification failed.";
                            Toast.makeText(SignupActivity.this, "⚠️ " + errorMsg, Toast.LENGTH_SHORT).show();
                            showOtpVerificationDialog(email); // Show dialog again
                        }
                    } catch (Exception e) {
                        Toast.makeText(SignupActivity.this, "Error parsing server response.", Toast.LENGTH_SHORT).show();
                    }
                }

                @Override
                public void onError(Exception e) {
                    Toast.makeText(SignupActivity.this, "⚠️ Connection error.", Toast.LENGTH_SHORT).show();
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
                URL url = new URL(NetworkConfig.getApiBaseUrl(SignupActivity.this) + endpoint);
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
                    NetworkConfig.showConnectionErrorDialog(SignupActivity.this, () -> {
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

    private void setupPhoneFlow() {
        mCallbacks = new PhoneAuthProvider.OnVerificationStateChangedCallbacks() {
            @Override
            public void onVerificationCompleted(com.google.firebase.auth.PhoneAuthCredential credential) {
                String code = credential.getSmsCode();
                if (code != null) {
                    final EditText[] otpBoxes = {inputOtp1, inputOtp2, inputOtp3, inputOtp4, inputOtp5, inputOtp6};
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
                    btnPhoneSubmit.setEnabled(true);
                    Toast.makeText(SignupActivity.this, "Verification failed: " + e.getLocalizedMessage(), Toast.LENGTH_LONG).show();
                });
            }

            @Override
            public void onCodeSent(String verificationId, PhoneAuthProvider.ForceResendingToken token) {
                mVerificationId = verificationId;
                mResendToken = token;
                runOnUiThread(() -> {
                    btnPhoneSubmit.setEnabled(true);
                    String phoneVal = inputPhone.getText().toString().trim();
                    stepLayoutPhone.setVisibility(View.GONE);
                    stepLayoutOtp.setVisibility(View.VISIBLE);
                    textOtpSubtitle.setText("We've sent a 6-digit verification code to " + selectedCountryCode + " " + phoneVal);
                    startOtpCountdown();
                    setupOtpInputs();
                });
            }
        };

        // Setup countries spinner
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
        String[] dialCodes = {"+91", "+1", "+1", "+44", "+61", "+49", "+33", "+81", "+65"};
        int[] phoneLengths = {10, 10, 10, 10, 9, 11, 9, 10, 8};

        ArrayAdapter<String> countryAdapter = new ArrayAdapter<>(this, android.R.layout.simple_spinner_item, countries);
        countryAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinnerCountry.setAdapter(countryAdapter);

        spinnerCountry.setOnItemSelectedListener(new android.widget.AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(android.widget.AdapterView<?> parent, View view, int position, long id) {
                selectedCountryCode = dialCodes[position];
                selectedPhoneLength = phoneLengths[position];
                textDialCode.setText(selectedCountryCode);
                
                // Restrict input length
                inputPhone.setFilters(new android.text.InputFilter[] { new android.text.InputFilter.LengthFilter(selectedPhoneLength) });
                
                // Trigger watch check
                boolean isValid = inputPhone.getText().toString().trim().length() == selectedPhoneLength;
                btnPhoneSubmit.setEnabled(isValid);
            }

            @Override
            public void onNothingSelected(android.widget.AdapterView<?> parent) {}
        });

        inputPhone.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {}

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                boolean isValid = s.toString().trim().length() == selectedPhoneLength;
                btnPhoneSubmit.setEnabled(isValid);
            }

            @Override
            public void afterTextChanged(Editable s) {}
        });

        btnPhoneBack.setOnClickListener(v -> showStep(1));

        btnPhoneSubmit.setOnClickListener(v -> {
            sendOtpAndTransition();
        });

        // Edit Number returns to phone entry
        btnOtpEdit.setOnClickListener(v -> {
            stopOtpCountdown();
            SMSReceiver.unbindListener();
            stepLayoutOtp.setVisibility(View.GONE);
            stepLayoutPhone.setVisibility(View.VISIBLE);
        });

        // Resend OTP trigger
        btnOtpResend.setOnClickListener(v -> {
            btnOtpResend.setEnabled(false);
            String phoneVal = inputPhone.getText().toString().trim();
            String fullPhoneNumber = selectedCountryCode + phoneVal;
            try {
                PhoneAuthOptions options =
                        PhoneAuthOptions.newBuilder(mAuth)
                                .setPhoneNumber(fullPhoneNumber)
                                .setTimeout(60L, TimeUnit.SECONDS)
                                .setActivity(this)
                                .setCallbacks(mCallbacks)
                                .setForceResendingToken(mResendToken)
                                .build();
                PhoneAuthProvider.verifyPhoneNumber(options);
            } catch (Exception e) {
                btnOtpResend.setEnabled(true);
                Toast.makeText(this, "Error starting phone verification: " + e.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });

        btnOtpSubmit.setOnClickListener(v -> performPhoneOtpVerification());
    }

    private void setupOtpInputs() {
        final EditText[] otpBoxes = {inputOtp1, inputOtp2, inputOtp3, inputOtp4, inputOtp5, inputOtp6};
        
        // Clear all boxes
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
                    
                    // Auto verify if all 6 digits are typed
                    checkAndAutoVerifyOtp();
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

        // SMS OTP Auto-detection hook
        SMSReceiver.bindListener(otp -> {
            runOnUiThread(() -> {
                if (otp != null && otp.length() == 6) {
                    for (int j = 0; j < 6; j++) {
                        otpBoxes[j].setText(String.valueOf(otp.charAt(j)));
                    }
                    otpBoxes[5].requestFocus();
                    performPhoneOtpVerification();
                }
            });
        });
    }

    private void checkAndAutoVerifyOtp() {
        final EditText[] otpBoxes = {inputOtp1, inputOtp2, inputOtp3, inputOtp4, inputOtp5, inputOtp6};
        StringBuilder sb = new StringBuilder();
        for (EditText box : otpBoxes) {
            sb.append(box.getText().toString().trim());
        }
        if (sb.toString().length() == 6) {
            performPhoneOtpVerification();
        }
    }

    private void performPhoneOtpVerification() {
        final EditText[] otpBoxes = {inputOtp1, inputOtp2, inputOtp3, inputOtp4, inputOtp5, inputOtp6};
        StringBuilder sb = new StringBuilder();
        for (EditText box : otpBoxes) {
            sb.append(box.getText().toString().trim());
        }
        String enteredOtp = sb.toString();
        if (enteredOtp.length() < 6) {
            Toast.makeText(this, "⚠️ Please enter the 6-digit OTP code!", Toast.LENGTH_SHORT).show();
            return;
        }

        btnOtpSubmit.setEnabled(false);
        
        if (mVerificationId != null) {
            PhoneAuthCredential credential = PhoneAuthProvider.getCredential(mVerificationId, enteredOtp);
            signInWithPhoneAuthCredential(credential);
        } else {
            String phoneVal = inputPhone.getText().toString().trim();
            verifyPhoneOtpSimulated(selectedCountryCode, phoneVal, enteredOtp);
        }
    }

    private void verifyPhoneOtpSimulated(final String cc, final String phone, final String code) {
        try {
            JSONObject body = new JSONObject();
            body.put("countryCode", cc);
            body.put("phoneNumber", phone);
            body.put("code", code);

            makeHttpRequest("/phone-verify-otp", body.toString(), new HttpCallback() {
                @Override
                public void onResponse(int statusCode, String response) {
                    runOnUiThread(() -> btnOtpSubmit.setEnabled(true));
                    try {
                        JSONObject json = new JSONObject(response);
                        if (statusCode == 200) {
                            stopOtpCountdown();
                            SMSReceiver.unbindListener();
                            
                            boolean isRegistered = json.optBoolean("isRegistered", false);
                            if (isRegistered) {
                                String token = json.getString("accessToken");
                                JSONObject user = json.getJSONObject("user");
                                saveSession(user.getString("name"), user.getString("email"), token);
                                
                                runOnUiThread(() -> {
                                    showStep(6);
                                    Toast.makeText(SignupActivity.this, "✓ Account verified successfully!", Toast.LENGTH_SHORT).show();
                                });

                                new android.os.Handler(android.os.Looper.getMainLooper()).postDelayed(() -> {
                                    startActivity(new Intent(SignupActivity.this, MainActivity.class));
                                    finish();
                                }, 2000);
                            } else {
                                phoneVerificationToken = json.getString("phoneVerificationToken");
                                countryCode = cc;
                                phoneNumber = phone;

                                runOnUiThread(() -> {
                                    TextView textSignupTitle = findViewById(R.id.text_signup_title);
                                    if (textSignupTitle != null) {
                                        textSignupTitle.setText("Sign up with " + countryCode + " " + phoneNumber);
                                    }
                                    View ssoContainer = findViewById(R.id.layout_signup_sso_container);
                                    if (ssoContainer != null) {
                                        ssoContainer.setVisibility(View.GONE);
                                    }
                                    showStep(1);
                                    Toast.makeText(SignupActivity.this, "✓ Phone verified. Complete your profile details.", Toast.LENGTH_SHORT).show();
                                });
                            }
                        } else {
                            String errorMsg = json.has("error") ? json.getJSONObject("error").getString("message") : "Incorrect code.";
                            runOnUiThread(() -> Toast.makeText(SignupActivity.this, "⚠️ " + errorMsg, Toast.LENGTH_SHORT).show());
                        }
                    } catch (Exception e) {
                        runOnUiThread(() -> Toast.makeText(SignupActivity.this, "Error parsing server response.", Toast.LENGTH_SHORT).show());
                    }
                }

                @Override
                public void onError(Exception e) {
                    runOnUiThread(() -> {
                        btnOtpSubmit.setEnabled(true);
                        Toast.makeText(SignupActivity.this, "⚠️ Verification connection error.", Toast.LENGTH_SHORT).show();
                    });
                }
            });
        } catch (Exception e) {
            btnOtpSubmit.setEnabled(true);
        }
    }

    private void sendOtpAndTransition() {
        if (mAuth == null) {
            btnPhoneSubmit.setEnabled(true);
            new AlertDialog.Builder(this, android.R.style.Theme_DeviceDefault_Dialog_Alert)
                .setTitle("Firebase Not Configured")
                .setMessage("Firebase Phone Authentication is not configured.\n\nWould you like to run in local Simulated Mode for testing?")
                .setPositiveButton("Simulated Mode", (dialog, which) -> sendSimulatedOtpAndTransition())
                .setNegativeButton("Cancel", null)
                .show();
            return;
        }
        String phoneVal = inputPhone.getText().toString().trim();
        btnPhoneSubmit.setEnabled(false);
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
            btnPhoneSubmit.setEnabled(true);
            Toast.makeText(this, "Error starting phone verification: " + e.getMessage(), Toast.LENGTH_SHORT).show();
        }
    }

    private void sendSimulatedOtpAndTransition() {
        final String phoneVal = inputPhone.getText().toString().trim();
        btnPhoneSubmit.setEnabled(false);
        mVerificationId = null; // Mark as simulated
        
        try {
            JSONObject body = new JSONObject();
            body.put("countryCode", selectedCountryCode);
            body.put("phoneNumber", phoneVal);

            makeHttpRequest("/phone-send-otp", body.toString(), new HttpCallback() {
                @Override
                public void onResponse(int statusCode, String response) {
                    runOnUiThread(() -> btnPhoneSubmit.setEnabled(true));
                    try {
                        JSONObject json = new JSONObject(response);
                        if (statusCode == 200) {
                            String otpCode = json.optString("otpCode");
                            runOnUiThread(() -> {
                                if (!otpCode.isEmpty()) {
                                    Toast.makeText(SignupActivity.this, "[Simulated Mode] OTP sent: " + otpCode, Toast.LENGTH_LONG).show();
                                } else {
                                    Toast.makeText(SignupActivity.this, "OTP sent successfully.", Toast.LENGTH_SHORT).show();
                                }
                                stepLayoutPhone.setVisibility(View.GONE);
                                stepLayoutOtp.setVisibility(View.VISIBLE);
                                textOtpSubtitle.setText("[Simulated] We've sent a code to " + selectedCountryCode + " " + phoneVal);
                                startOtpCountdown();
                                setupOtpInputs();
                            });
                        } else {
                            String errorMsg = json.has("error") ? json.getJSONObject("error").getString("message") : "Failed to send OTP.";
                            runOnUiThread(() -> Toast.makeText(SignupActivity.this, "⚠️ " + errorMsg, Toast.LENGTH_SHORT).show());
                        }
                    } catch (Exception e) {
                        runOnUiThread(() -> Toast.makeText(SignupActivity.this, "Error parsing server response.", Toast.LENGTH_SHORT).show());
                    }
                }

                @Override
                public void onError(Exception e) {
                    runOnUiThread(() -> {
                        btnPhoneSubmit.setEnabled(true);
                        Toast.makeText(SignupActivity.this, "⚠️ Connection error.", Toast.LENGTH_SHORT).show();
                    });
                }
            });
        } catch (Exception e) {
            btnPhoneSubmit.setEnabled(true);
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
                                    btnOtpSubmit.setEnabled(true);
                                    Toast.makeText(SignupActivity.this, "Failed to get Firebase ID token.", Toast.LENGTH_SHORT).show();
                                });
                            }
                        });
                    }
                } else {
                    runOnUiThread(() -> {
                        btnOtpSubmit.setEnabled(true);
                        Toast.makeText(SignupActivity.this, "Invalid verification code.", Toast.LENGTH_SHORT).show();
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
                            stopOtpCountdown();
                            SMSReceiver.unbindListener();
                            
                            boolean isRegistered = json.getBoolean("isRegistered");
                            if (isRegistered) {
                                String token = json.getString("accessToken");
                                JSONObject user = json.getJSONObject("user");
                                saveSession(user.getString("name"), user.getString("email"), token);
                                runOnUiThread(() -> {
                                    showStep(6);
                                    Toast.makeText(SignupActivity.this, "✓ Account verified successfully!", Toast.LENGTH_SHORT).show();
                                });
                                new android.os.Handler(android.os.Looper.getMainLooper()).postDelayed(() -> {
                                    startActivity(new Intent(SignupActivity.this, MainActivity.class));
                                    finish();
                                }, 2000);
                            } else {
                                phoneVerificationToken = json.getString("phoneVerificationToken");
                                countryCode = selectedCountryCode;
                                phoneNumber = inputPhone.getText().toString().trim();

                                runOnUiThread(() -> {
                                    TextView textSignupTitle = findViewById(R.id.text_signup_title);
                                    if (textSignupTitle != null) {
                                        textSignupTitle.setText("Sign up with " + countryCode + " " + phoneNumber);
                                    }
                                    View ssoContainer = findViewById(R.id.layout_signup_sso_container);
                                    if (ssoContainer != null) {
                                        ssoContainer.setVisibility(View.GONE);
                                    }
                                    showStep(1);
                                    Toast.makeText(SignupActivity.this, "✓ Phone verified. Complete your profile details.", Toast.LENGTH_SHORT).show();
                                });
                            }
                        } else {
                            String errorMsg = json.has("error") ? json.getJSONObject("error").getString("message") : "Verification failed.";
                            runOnUiThread(() -> {
                                btnOtpSubmit.setEnabled(true);
                                Toast.makeText(SignupActivity.this, "⚠️ " + errorMsg, Toast.LENGTH_SHORT).show();
                            });
                        }
                    } catch (Exception e) {
                        runOnUiThread(() -> {
                            btnOtpSubmit.setEnabled(true);
                            Toast.makeText(SignupActivity.this, "Error parsing server response.", Toast.LENGTH_SHORT).show();
                        });
                    }
                }

                @Override
                public void onError(Exception e) {
                    runOnUiThread(() -> {
                        btnOtpSubmit.setEnabled(true);
                        Toast.makeText(SignupActivity.this, "⚠️ Connection error during verification.", Toast.LENGTH_SHORT).show();
                    });
                }
            });
        } catch (Exception e) {
            Log.e(TAG, "Firebase token exchange error", e);
            btnOtpSubmit.setEnabled(true);
        }
    }

    private void startOtpCountdown() {
        stopOtpCountdown();
        countdownSeconds = 60;
        btnOtpResend.setEnabled(false);
        btnOtpResend.setText("Resend OTP");

        timerRunnable = new Runnable() {
            @Override
            public void run() {
                if (countdownSeconds > 0) {
                    countdownSeconds--;
                    textOtpCountdown.setText("OTP expires in: " + countdownSeconds + "s");
                    btnOtpResend.setText("Resend OTP (" + countdownSeconds + "s)");
                    timerHandler.postDelayed(this, 1000);
                } else {
                    textOtpCountdown.setText("OTP code expired. Please request a new one.");
                    btnOtpResend.setEnabled(true);
                    btnOtpResend.setText("Resend OTP");
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

    @Override
    protected void onDestroy() {
        stopOtpCountdown();
        SMSReceiver.unbindListener();
        super.onDestroy();
    }

    public interface HttpCallback {
        void onResponse(int statusCode, String response);
        void onError(Exception e);
    }
}
