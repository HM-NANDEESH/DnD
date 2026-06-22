package com.hmnandeesh.dnd;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.widget.RemoteViews;
import org.json.JSONArray;
import org.json.JSONObject;
import com.hmnandeesh.dnd.R;

public class HabitWidgetProvider extends AppWidgetProvider {

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        // Load data from CapacitorStorage SharedPreferences
        SharedPreferences prefs = context.getSharedPreferences("CapacitorStorage", Context.MODE_PRIVATE);
        String habitsJson = prefs.getString("active_habits_stats", "[]");
        String activeHabitIdStr = prefs.getString("widget_active_habit_id", "");
        String widgetTheme = prefs.getString("widget_active_theme", "glass");
        String widgetSize = prefs.getString("widget_active_size", "medium");
        String showAlertsStr = prefs.getString("widget_show_alerts", "true");
        boolean showAlerts = "true".equals(showAlertsStr);

        for (int appWidgetId : appWidgetIds) {
            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.habit_widget_layout);

            try {
                JSONArray arr = new JSONArray(habitsJson);
                JSONObject habitObj = null;

                if (arr.length() > 0) {
                    if (!activeHabitIdStr.isEmpty()) {
                        try {
                            int targetId = Integer.parseInt(activeHabitIdStr);
                            for (int i = 0; i < arr.length(); i++) {
                                JSONObject item = arr.getJSONObject(i);
                                if (item.getInt("id") == targetId) {
                                    habitObj = item;
                                    break;
                                }
                            }
                        } catch (NumberFormatException e) {
                            // Ignore
                        }
                    }
                    if (habitObj == null) {
                        // Fallback to first active habit
                        habitObj = arr.getJSONObject(0);
                    }
                }

                if (habitObj != null) {
                    String name = habitObj.getString("name");
                    String emoji = habitObj.getString("emoji");
                    int currentStreak = habitObj.getInt("currentStreak");
                    int score = habitObj.getInt("score");
                    boolean isStreakAtRisk = habitObj.getBoolean("isStreakAtRisk");

                    views.setTextViewText(R.id.widget_emoji, emoji);
                    views.setTextViewText(R.id.widget_habit_name, name);
                    views.setTextViewText(R.id.widget_streak_val, "🔥 " + currentStreak);
                    views.setTextViewText(R.id.widget_score_lbl, "Score: " + score + "%");
                    views.setProgressBar(R.id.widget_progress_bar, 100, score, false);

                    if (showAlerts && isStreakAtRisk) {
                        views.setTextViewText(R.id.widget_streak_lbl, "⚠️ Streak at Risk!");
                        views.setTextViewText(R.id.widget_tag, "ALERT");
                    } else {
                        views.setTextViewText(R.id.widget_streak_lbl, "Days Streak");
                        views.setTextViewText(R.id.widget_tag, "STREAKS");
                    }
                } else {
                    // Fallback state if no habits found
                    views.setTextViewText(R.id.widget_emoji, "📅");
                    views.setTextViewText(R.id.widget_habit_name, "No habits active");
                    views.setTextViewText(R.id.widget_streak_val, "🔥 0");
                    views.setTextViewText(R.id.widget_streak_lbl, "Create a habit!");
                    views.setTextViewText(R.id.widget_score_lbl, "Score: 0%");
                    views.setProgressBar(R.id.widget_progress_bar, 100, 0, false);
                }

            } catch (Exception e) {
                e.printStackTrace();
            }

            // Apply themes dynamically by changing the background drawable
            int bgDrawableId = R.drawable.widget_bg_glass;
            if ("dark".equals(widgetTheme)) {
                bgDrawableId = R.drawable.widget_bg_dark;
            } else if ("indigo".equals(widgetTheme)) {
                bgDrawableId = R.drawable.widget_bg_indigo;
            } else if ("emerald".equals(widgetTheme)) {
                bgDrawableId = R.drawable.widget_bg_emerald;
            } else if ("rose".equals(widgetTheme)) {
                bgDrawableId = R.drawable.widget_bg_rose;
            }
            views.setInt(R.id.widget_background, "setBackgroundResource", bgDrawableId);

            // Set launch intent to open MainActivity when clicking the widget
            android.app.PendingIntent pendingIntent = android.app.PendingIntent.getActivity(
                context, 
                0, 
                new Intent(context, MainActivity.class), 
                android.app.PendingIntent.FLAG_UPDATE_CURRENT | android.app.PendingIntent.FLAG_IMMUTABLE
            );
            views.setOnClickPendingIntent(R.id.widget_background, pendingIntent);

            appWidgetManager.updateAppWidget(appWidgetId, views);
        }
    }
}
