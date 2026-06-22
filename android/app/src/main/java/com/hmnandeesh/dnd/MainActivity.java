package com.hmnandeesh.dnd;

import android.Manifest;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.content.ActivityNotFoundException;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.util.Base64;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.Toast;

import com.getcapacitor.BridgeActivity;

import androidx.core.app.ActivityCompat;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;
import androidx.core.content.ContextCompat;
import androidx.core.content.FileProvider;

import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.List;

public class MainActivity extends BridgeActivity {
    private static final int REQUEST_MEDIA_PERMISSIONS = 7801;
    private static final int REQUEST_NOTIFICATION_PERMISSION = 7802;
    private static final String NOTIFICATION_CHANNEL_ID = "dnd_local_reminders";

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState); 

        // Redirect to native WelcomeActivity if session is not active
        android.content.SharedPreferences prefs = getSharedPreferences("CapacitorStorage", Context.MODE_PRIVATE);
        boolean isLoggedIn = prefs.getBoolean("local_session_active", false);
        if (!isLoggedIn) {
            startActivity(new Intent(this, WelcomeActivity.class));
            finish();
            return;
        }
        
        // Force the webview to ignore system font size zoom settings to prevent layout distortion
        WebView webView = this.bridge.getWebView();
        if (webView != null) {
            WebSettings settings = webView.getSettings();
            settings.setTextZoom(100);
            settings.setMediaPlaybackRequiresUserGesture(false);
            settings.setAllowFileAccess(true);
            settings.setAllowContentAccess(true);
            webView.addJavascriptInterface(new DnDAndroidBridge(), "DnDAndroid");
        }

        ensureNotificationChannel();
    }

    @Override
    public void onStop() {
        super.onStop();
        
        // Trigger widget update when leaving the app
        Context context = getApplicationContext();
        Intent intent = new Intent(context, HabitWidgetProvider.class);
        intent.setAction(AppWidgetManager.ACTION_APPWIDGET_UPDATE);
        int[] ids = AppWidgetManager.getInstance(context)
            .getAppWidgetIds(new ComponentName(context, HabitWidgetProvider.class));
        intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, ids);
        context.sendBroadcast(intent);
    }

    private class DnDAndroidBridge {
        @JavascriptInterface
        public boolean isReady() {
            return true;
        }

        @JavascriptInterface
        public void requestMediaPermissions(String kind) {
            runOnUiThread(() -> requestRequiredMediaPermissions(kind));
        }

        @JavascriptInterface
        public void requestPostNotificationsPermission() {
            runOnUiThread(() -> requestPostNotificationPermissionIfNeeded());
        }

        @JavascriptInterface
        public boolean hasPostNotificationsPermission() {
            return hasNotificationPermission();
        }

        @JavascriptInterface
        public void showLocalNotification(String title, String body) {
            runOnUiThread(() -> showNativeNotification(title, body));
        }

        @JavascriptInterface
        public void openBase64File(String dataUrl, String fileName, String mimeType) {
            openBase64FileInternal(dataUrl, fileName, mimeType);
        }

        @JavascriptInterface
        public boolean isLoggedIn() {
            android.content.SharedPreferences prefs = getSharedPreferences("CapacitorStorage", Context.MODE_PRIVATE);
            return prefs.getBoolean("local_session_active", false);
        }

        @JavascriptInterface
        public String getUsername() {
            android.content.SharedPreferences prefs = getSharedPreferences("CapacitorStorage", Context.MODE_PRIVATE);
            return prefs.getString("local_username", "");
        }

        @JavascriptInterface
        public void logout() {
            runOnUiThread(() -> {
                android.content.SharedPreferences prefs = getSharedPreferences("CapacitorStorage", Context.MODE_PRIVATE);
                prefs.edit().putBoolean("local_session_active", false).apply();
                Toast.makeText(MainActivity.this, "✓ Logged out successfully!", Toast.LENGTH_SHORT).show();
                startActivity(new Intent(MainActivity.this, LoginActivity.class));
                finish();
            });
        }
    }

    private void requestRequiredMediaPermissions(String kind) {
        String normalized = kind == null ? "" : kind.toLowerCase();
        List<String> permissions = new ArrayList<>();

        if (normalized.contains("camera")
                && ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
            permissions.add(Manifest.permission.CAMERA);
        }
        if ((normalized.contains("audio") || normalized.contains("microphone") || normalized.contains("mic"))
                && ContextCompat.checkSelfPermission(this, Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED) {
            permissions.add(Manifest.permission.RECORD_AUDIO);
        }

        if (!permissions.isEmpty()) {
            ActivityCompat.requestPermissions(this, permissions.toArray(new String[0]), REQUEST_MEDIA_PERMISSIONS);
        }
    }

    private void requestPostNotificationPermissionIfNeeded() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU
                && ContextCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.POST_NOTIFICATIONS}, REQUEST_NOTIFICATION_PERMISSION);
        }
    }

    private boolean hasNotificationPermission() {
        return Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU
                || ContextCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS) == PackageManager.PERMISSION_GRANTED;
    }

    private void ensureNotificationChannel() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return;

        NotificationChannel channel = new NotificationChannel(
                NOTIFICATION_CHANNEL_ID,
                "DnD Habit Reminders",
                NotificationManager.IMPORTANCE_HIGH
        );
        channel.setDescription("Local reminders and test notifications from DnD Life Tracker");
        channel.enableVibration(true);
        channel.setBypassDnd(true);

        NotificationManager manager = getSystemService(NotificationManager.class);
        if (manager != null) {
            manager.createNotificationChannel(channel);
        }
    }

    private void showNativeNotification(String title, String body) {
        if (!hasNotificationPermission()) {
            requestPostNotificationPermissionIfNeeded();
            Toast.makeText(this, "Allow notifications, then tap Test again.", Toast.LENGTH_SHORT).show();
            return;
        }

        Intent intent = new Intent(this, MainActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        PendingIntent pendingIntent = PendingIntent.getActivity(
                this,
                0,
                intent,
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );

        NotificationCompat.Builder builder = new NotificationCompat.Builder(this, NOTIFICATION_CHANNEL_ID)
                .setSmallIcon(R.mipmap.ic_launcher)
                .setContentTitle(title)
                .setContentText(body)
                .setStyle(new NotificationCompat.BigTextStyle().bigText(body))
                .setPriority(NotificationCompat.PRIORITY_HIGH)
                .setDefaults(NotificationCompat.DEFAULT_ALL)
                .setContentIntent(pendingIntent)
                .setAutoCancel(true);

        NotificationManagerCompat.from(this)
                .notify((int) (System.currentTimeMillis() & 0x0fffffff), builder.build());
    }

    private void openBase64FileInternal(String dataUrl, String fileName, String mimeType) {
        new Thread(() -> {
            try {
                if (dataUrl == null || !dataUrl.startsWith("data:")) {
                    throw new IllegalArgumentException("Unsupported attachment data");
                }

                int commaIndex = dataUrl.indexOf(',');
                if (commaIndex < 0) {
                    throw new IllegalArgumentException("Invalid attachment data");
                }

                String header = dataUrl.substring(0, commaIndex);
                String payload = dataUrl.substring(commaIndex + 1);
                String effectiveMimeType = mimeType != null && !mimeType.trim().isEmpty()
                        ? mimeType
                        : mimeTypeFromDataUrl(header);
                if (effectiveMimeType == null || effectiveMimeType.trim().isEmpty()) {
                    effectiveMimeType = "*/*";
                }

                byte[] bytes = Base64.decode(payload, Base64.DEFAULT);
                File outDir = new File(getCacheDir(), "note_attachments");
                if (!outDir.exists()) {
                    outDir.mkdirs();
                }

                File outFile = new File(outDir, sanitizeFileName(fileName));
                FileOutputStream outputStream = new FileOutputStream(outFile);
                outputStream.write(bytes);
                outputStream.close();

                Uri uri = FileProvider.getUriForFile(
                        this,
                        getPackageName() + ".fileprovider",
                        outFile
                );

                String finalMimeType = effectiveMimeType;
                runOnUiThread(() -> openCachedAttachment(uri, finalMimeType));
            } catch (Exception e) {
                runOnUiThread(() -> Toast.makeText(this, "Unable to open this attachment.", Toast.LENGTH_SHORT).show());
            }
        }).start();
    }

    private void openCachedAttachment(Uri uri, String mimeType) {
        Intent intent = new Intent(Intent.ACTION_VIEW);
        intent.setDataAndType(uri, mimeType);
        intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);

        try {
            startActivity(Intent.createChooser(intent, "Open attachment"));
        } catch (ActivityNotFoundException e) {
            Intent fallback = new Intent(Intent.ACTION_VIEW);
            fallback.setDataAndType(uri, "*/*");
            fallback.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
            try {
                startActivity(Intent.createChooser(fallback, "Open attachment"));
            } catch (ActivityNotFoundException ignored) {
                Toast.makeText(this, "No app found to open this file.", Toast.LENGTH_SHORT).show();
            }
        }
    }

    private String mimeTypeFromDataUrl(String header) {
        if (header == null) return "*/*";
        int start = header.indexOf(':');
        int end = header.indexOf(';');
        if (start >= 0 && end > start) {
            return header.substring(start + 1, end);
        }
        return "*/*";
    }

    private String sanitizeFileName(String fileName) {
        String fallbackName = "note-attachment";
        String value = fileName == null || fileName.trim().isEmpty() ? fallbackName : fileName.trim();
        return value.replaceAll("[\\\\/:*?\"<>|]", "_");
    }
}
