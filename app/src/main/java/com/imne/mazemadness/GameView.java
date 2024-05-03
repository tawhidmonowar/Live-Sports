package com.imne.mazemadness;

import android.annotation.SuppressLint;
import android.content.Context;
import android.util.AttributeSet;
import android.view.MotionEvent;
import android.view.View;
import android.webkit.WebSettings;
import android.webkit.WebView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

public class GameView extends WebView {

    public GameView(@NonNull Context context) {
        super(context);
        initGameView();
        setWebViewClient(new GameViewClient());
    }

    public GameView(@NonNull Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        initGameView();
    }

    public GameView(@NonNull Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        initGameView();
    }

    public GameView(@NonNull Context context, @Nullable AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
    }

    public GameView(@NonNull Context context, @Nullable AttributeSet attrs, int defStyleAttr, boolean privateBrowsing) {
        super(context, attrs, defStyleAttr, privateBrowsing);
    }

    @SuppressLint("SetJavaScriptEnabled")
    private void initGameView() {
        WebSettings gameViewSettings = getSettings();
        gameViewSettings.setJavaScriptEnabled(true);
        gameViewSettings.setDomStorageEnabled(true);
        gameViewSettings.setUseWideViewPort(true);
        gameViewSettings.setLoadWithOverviewMode(true);
        gameViewSettings.setRenderPriority(WebSettings.RenderPriority.HIGH);
        setOverScrollMode(View.OVER_SCROLL_NEVER);
        gameViewSettings.setLayoutAlgorithm(WebSettings.LayoutAlgorithm.TEXT_AUTOSIZING);
        gameViewSettings.setRenderPriority(WebSettings.RenderPriority.HIGH);
        gameViewSettings.setEnableSmoothTransition(true);
        gameViewSettings.setSupportZoom(false);
        gameViewSettings.setBuiltInZoomControls(false);
        setFocusable(true);
        setFocusableInTouchMode(true);
        requestFocus();
        setLayerType(View.LAYER_TYPE_HARDWARE, null);
        gameViewSettings.setCacheMode(WebSettings.LOAD_DEFAULT);
        gameViewSettings.setDatabaseEnabled(true);

    }

    @SuppressLint("ClickableViewAccessibility")
    @Override
    public boolean onTouchEvent(MotionEvent event) {
        requestFocus();
        return super.onTouchEvent(event);
    }

    public void loadGameUrl(String url) {
        if (url != null && !url.isEmpty()) {
            loadUrl(url);
        }
    }
}
