package com.hmnandeesh.dnd;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class RecoverActivity extends AppCompatActivity {
    private static final String TAG = "RecoverActivity";
    private static final String API_BASE_URL = "http://10.0.2.2:3000/api/auth";

    private EditText inputEmail;
    private Button btnSendCode;
    private TextView linkBackToLogin;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_recover);

        // Bind Views
        inputEmail = findViewById(R.id.input_recover_email);
        btnSendCode = findViewById(R.id.btn_recover_send_code);
        linkBackToLogin = findViewById(R.id.link_back_to_login);

        // Hide Step 2 and Step 3 layouts as password resets are completed in the browser
        View layoutStep2 = findViewById(R.id.layout_recover_step2);
        if (layoutStep2 != null) {
            layoutStep2.setVisibility(View.GONE);
        }
        View layoutStep3 = findViewById(R.id.layout_recover_step3);
        if (layoutStep3 != null) {
            layoutStep3.setVisibility(View.GONE);
        }

        // Change button text to match link-based flow
        if (btnSendCode != null) {
            btnSendCode.setText("Send Reset Link");
        }

        btnSendCode.setOnClickListener(v -> {
            String email = inputEmail.getText().toString().trim();
            if (email.isEmpty()) {
                Toast.makeText(this, "⚠️ Please enter your email address!", Toast.LENGTH_SHORT).show();
                return;
            }
            if (!android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
                Toast.makeText(this, "⚠️ Please enter a valid email address!", Toast.LENGTH_SHORT).show();
                return;
            }
            sendRecoveryLink(email);
        });

        // Link back to Login
        linkBackToLogin.setOnClickListener(v -> {
            startActivity(new Intent(this, LoginActivity.class));
            finish();
        });
    }

    private void sendRecoveryLink(String email) {
        try {
            JSONObject body = new JSONObject();
            body.put("email", email);

            makeHttpRequest("/forgot-password", body.toString(), new HttpCallback() {
                @Override
                public void onResponse(int statusCode, String response) {
                    try {
                        JSONObject json = new JSONObject(response);
                        if (statusCode == 200) {
                            String message = json.optString("message", "If an account exists with that email, a password reset link has been sent.");
                            String previewUrl = json.optString("previewUrl", "");
                            final String resetLink = json.optString("resetLink", "");
                            
                            String processedResetLink = resetLink;
                            if (!resetLink.isEmpty()) {
                                try {
                                    java.net.URL backendUrl = new java.net.URL(resetLink);
                                    String backendHost = backendUrl.getHost();
                                    int backendPort = backendUrl.getPort();
                                    
                                    String apiBaseUrl = NetworkConfig.getApiBaseUrl(RecoverActivity.this);
                                    java.net.URL apiUrl = new java.net.URL(apiBaseUrl);
                                    String apiHost = apiUrl.getHost();
                                    int apiPort = apiUrl.getPort();
                                    
                                    if (apiHost != null && !apiHost.isEmpty()) {
                                        String backendHostPort = backendHost + (backendPort != -1 ? ":" + backendPort : "");
                                        String apiHostPort = apiHost + (apiPort != -1 && apiPort != 80 && apiPort != 443 ? ":" + apiPort : "");
                                        processedResetLink = resetLink.replace(backendHostPort, apiHostPort);
                                    }
                                } catch (Exception e) {
                                    Log.e(TAG, "Error resolving api host for dev reset link", e);
                                }
                            }
                            final String finalResetLink = processedResetLink;

                            AlertDialog.Builder builder = new AlertDialog.Builder(RecoverActivity.this);
                            builder.setTitle("Check Your Email");
                            
                            builder.setMessage(message);
                            builder.setCancelable(false);

                            builder.setPositiveButton("Back to Login", (dialog, which) -> {
                                finish();
                            });

                            if (!finalResetLink.isEmpty()) {
                                builder.setNeutralButton("Reset Password", (dialog, which) -> {
                                    try {
                                        Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(finalResetLink));
                                        startActivity(browserIntent);
                                    } catch (Exception e) {
                                        Toast.makeText(RecoverActivity.this, "Could not open browser.", Toast.LENGTH_SHORT).show();
                                    }
                                    finish();
                                });
                            } else if (!previewUrl.isEmpty()) {
                                builder.setNeutralButton("Open Email", (dialog, which) -> {
                                    try {
                                        Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(previewUrl));
                                        startActivity(browserIntent);
                                    } catch (Exception e) {
                                        Toast.makeText(RecoverActivity.this, "Could not open browser.", Toast.LENGTH_SHORT).show();
                                    }
                                    finish();
                                });
                            }

                            builder.show();
                        } else {
                            String errorMsg = json.has("error") ? json.getJSONObject("error").getString("message") : "Failed to request password reset.";
                            Toast.makeText(RecoverActivity.this, "⚠️ " + errorMsg, Toast.LENGTH_SHORT).show();
                        }
                    } catch (Exception e) {
                        Toast.makeText(RecoverActivity.this, "Error parsing server response.", Toast.LENGTH_SHORT).show();
                    }
                }

                @Override
                public void onError(Exception e) {
                    Toast.makeText(RecoverActivity.this, "⚠️ Connection error. Make sure local server is running.", Toast.LENGTH_SHORT).show();
                }
            });
        } catch (Exception e) {
            Log.e(TAG, "Send recovery link error", e);
        }
    }

    private void makeHttpRequest(final String endpoint, final String jsonBody, final HttpCallback callback) {
        new Thread(() -> {
            HttpURLConnection conn = null;
            try {
                URL url = new URL(NetworkConfig.getApiBaseUrl(RecoverActivity.this) + endpoint);
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
                    NetworkConfig.showConnectionErrorDialog(RecoverActivity.this, () -> {
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

    public interface HttpCallback {
        void onResponse(int statusCode, String response);
        void onError(Exception e);
    }
}
