package com.hmnandeesh.dnd;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.animation.DecelerateInterpolator;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.LinearLayout;
import android.animation.ObjectAnimator;
import android.animation.ValueAnimator;
import android.animation.AnimatorSet;

import androidx.appcompat.app.AppCompatActivity;

public class WelcomeActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_welcome);

        // Bind views
        View logoGlow = findViewById(R.id.logo_glow);
        RelativeLayout welcomeLogoBadge = findViewById(R.id.welcome_logo_badge);
        TextView welcomeHeadline = findViewById(R.id.welcome_headline);
        TextView welcomeDescription = findViewById(R.id.welcome_description);
        LinearLayout btnContainer = findViewById(R.id.btn_container);
        RelativeLayout btnWelcomeSignup = findViewById(R.id.btn_welcome_signup);
        RelativeLayout btnWelcomeLogin = findViewById(R.id.btn_welcome_login);

        // 1. Initial State for entrance animations (translation and alpha)
        welcomeLogoBadge.setAlpha(0f);
        welcomeLogoBadge.setTranslationY(60f);

        welcomeHeadline.setAlpha(0f);
        welcomeHeadline.setTranslationY(60f);

        welcomeDescription.setAlpha(0f);
        welcomeDescription.setTranslationY(60f);

        btnContainer.setAlpha(0f);
        btnContainer.setTranslationY(60f);

        logoGlow.setAlpha(0f);

        // 2. Play hardware-accelerated entrance animations
        welcomeLogoBadge.animate()
                .alpha(1f)
                .translationY(0f)
                .setDuration(800)
                .setInterpolator(new DecelerateInterpolator())
                .start();

        welcomeHeadline.animate()
                .alpha(1f)
                .translationY(0f)
                .setDuration(800)
                .setStartDelay(150)
                .setInterpolator(new DecelerateInterpolator())
                .start();

        welcomeDescription.animate()
                .alpha(1f)
                .translationY(0f)
                .setDuration(800)
                .setStartDelay(300)
                .setInterpolator(new DecelerateInterpolator())
                .start();

        btnContainer.animate()
                .alpha(1f)
                .translationY(0f)
                .setDuration(800)
                .setStartDelay(450)
                .setInterpolator(new DecelerateInterpolator())
                .start();

        // Fade in logo glow gently
        logoGlow.animate()
                .alpha(0.15f)
                .setDuration(1200)
                .setStartDelay(400)
                .start();

        // 3. Infinite logo glow pulsing animation
        ObjectAnimator scaleX = ObjectAnimator.ofFloat(logoGlow, "scaleX", 1f, 1.18f);
        ObjectAnimator scaleY = ObjectAnimator.ofFloat(logoGlow, "scaleY", 1f, 1.18f);
        ObjectAnimator glowAlpha = ObjectAnimator.ofFloat(logoGlow, "alpha", 0.15f, 0.32f);

        scaleX.setDuration(3000);
        scaleX.setRepeatCount(ValueAnimator.INFINITE);
        scaleX.setRepeatMode(ValueAnimator.REVERSE);

        scaleY.setDuration(3000);
        scaleY.setRepeatCount(ValueAnimator.INFINITE);
        scaleY.setRepeatMode(ValueAnimator.REVERSE);

        glowAlpha.setDuration(3000);
        glowAlpha.setRepeatCount(ValueAnimator.INFINITE);
        glowAlpha.setRepeatMode(ValueAnimator.REVERSE);

        AnimatorSet animatorSet = new AnimatorSet();
        animatorSet.playTogether(scaleX, scaleY, glowAlpha);
        animatorSet.start();

        // 4. Click Actions
        btnWelcomeSignup.setOnClickListener(v -> {
            Intent intent = new Intent(WelcomeActivity.this, SignupActivity.class);
            startActivity(intent);
        });

        btnWelcomeLogin.setOnClickListener(v -> {
            Intent intent = new Intent(WelcomeActivity.this, LoginActivity.class);
            startActivity(intent);
        });
    }
}
