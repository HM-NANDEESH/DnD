package com.hmnandeesh.dnd;

import android.app.AlertDialog;
import android.content.Context;
import android.content.SharedPreferences;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.Toast;

public class NetworkConfig {
    private static final String PREF_KEY = "server_api_url";
    private static final String DEFAULT_URL = "http://10.70.221.36:3000/api/auth";

    public static String getApiBaseUrl(Context context) {
        SharedPreferences prefs = context.getSharedPreferences("CapacitorStorage", Context.MODE_PRIVATE);
        String url = prefs.getString(PREF_KEY, DEFAULT_URL);
        if (url != null && url.contains("10.0.2.2")) {
            url = url.replace("10.0.2.2", "10.70.221.36");
            prefs.edit().putString(PREF_KEY, url).apply();
        }
        return url;
    }

    public static void setApiBaseUrl(Context context, String url) {
        SharedPreferences prefs = context.getSharedPreferences("CapacitorStorage", Context.MODE_PRIVATE);
        prefs.edit().putString(PREF_KEY, url).apply();
    }

    public static void showConnectionErrorDialog(final Context context, final Runnable retryAction) {
        AlertDialog.Builder builder = new AlertDialog.Builder(context);
        builder.setTitle("Server Connection Error");
        builder.setMessage("Could not connect to the server. Please verify:\n\n" +
                "• USB connection (Recommended): Run 'adb reverse tcp:3000 tcp:3000' on your PC and tap 'Use USB (Localhost)'.\n\n" +
                "• Wi-Fi connection: Ensure your phone is on the same Wi-Fi network as your PC (IP: 10.70.221.36).");
        builder.setCancelable(true);

        final EditText input = new EditText(context);
        input.setText(getApiBaseUrl(context));
        
        LinearLayout container = new LinearLayout(context);
        container.setOrientation(LinearLayout.VERTICAL);
        
        LinearLayout.LayoutParams lp = new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                LinearLayout.LayoutParams.WRAP_CONTENT);
        int margin = (int) (20 * context.getResources().getDisplayMetrics().density);
        lp.leftMargin = margin;
        lp.rightMargin = margin;
        lp.topMargin = margin / 2;
        lp.bottomMargin = margin;
        
        input.setLayoutParams(lp);
        container.addView(input);
        builder.setView(container);

        builder.setPositiveButton("Save & Retry", (dialog, which) -> {
            String newUrl = input.getText().toString().trim();
            if (newUrl.isEmpty()) {
                Toast.makeText(context, "URL cannot be empty", Toast.LENGTH_SHORT).show();
                return;
            }
            if (!newUrl.startsWith("http://") && !newUrl.startsWith("https://")) {
                Toast.makeText(context, "URL must start with http:// or https://", Toast.LENGTH_SHORT).show();
                return;
            }
            if (newUrl.endsWith("/")) {
                newUrl = newUrl.substring(0, newUrl.length() - 1);
            }
            setApiBaseUrl(context, newUrl);
            if (retryAction != null) {
                retryAction.run();
            }
        });

        builder.setNeutralButton("Use USB (Localhost)", (dialog, which) -> {
            setApiBaseUrl(context, "http://localhost:3000/api/auth");
            if (retryAction != null) {
                retryAction.run();
            }
        });

        builder.setNegativeButton("Cancel", (dialog, which) -> dialog.cancel());
        builder.show();
    }
}
