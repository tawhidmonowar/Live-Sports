package com.imne.mazemadness;

import androidx.appcompat.app.AppCompatActivity;

import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.View;
import android.view.WindowManager;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ImageView;

import com.google.android.material.snackbar.Snackbar;
import com.ime.game.R;


import java.io.IOException;
import java.net.InetSocketAddress;

public class GameViewLauncher extends AppCompatActivity {

    private boolean doubleBackToExitPressedOnce = false;
    private static boolean isStarted = false;
    private WebServer androidWebServer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.game_view_launcher);

        init_screen();

        if (!isStarted && startAndroidWebServer()) {
            isStarted = true;
        }

        if (InternetCheck.isConnected(this)) {
            GameView gameView = findViewById(R.id.gameView);
            ImageView imageView = findViewById(R.id.no_internet_img);
            gameView.setVisibility(View.VISIBLE);
            imageView.setVisibility(View.GONE);
            gameView.loadGameUrl(Config.GAME_URL);

            gameView.setWebViewClient(new WebViewClient() {
                @Override
                public void onPageStarted(WebView view, String url, Bitmap favicon) {
                    super.onPageStarted(view, url, favicon);
                }

                @Override
                public void onPageFinished(WebView view, String url) {
                    super.onPageFinished(view, url);
                }
            });

        }
    }

    @Override
    public void onBackPressed() {
        if (doubleBackToExitPressedOnce) {
            super.onBackPressed();
            return;
        }

        this.doubleBackToExitPressedOnce = true;
        Snackbar.make(findViewById(android.R.id.content), Config.EXIT_MSG, Snackbar.LENGTH_SHORT).show();

        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                doubleBackToExitPressedOnce = false;
            }
        }, 2000);
    }
















    private void init_screen(){
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN); //show the activity in full screen

        getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            getWindow().getAttributes().layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;
            getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
        }
    }


    private boolean startAndroidWebServer() {
        if (!isStarted) {
            try {
                int port = 3506;

                AssetManager am = getAssets();
                //String localPath = "file:///android_asset/game/";
                String localPath = "game";
                AndroidFile f = new AndroidFile(localPath);
                f.setAssetManager( am );
                Log.d("Gradle start 8082", f.getPath());
                androidWebServer = new WebServer(port, f);
                return true;
            }
            catch (Exception e) {
                Log.w("Gradle not 8082", "The server could not start."+e);
                e.printStackTrace();
            }
        }
        return false;
    }

    private boolean stopAndroidWebServer() {
        if (isStarted && androidWebServer != null) {
            androidWebServer.stop();
            return true;
        }
        return false;
    }

    public class WebServer extends NanoHTTPD {
        public WebServer(InetSocketAddress localAddr, AndroidFile wwwroot) throws IOException {
            super(localAddr, wwwroot);
        }

        public WebServer(int port, AndroidFile wwwroot ) throws IOException {
            super(port, wwwroot);
        }
    }


    @Override
    protected void onDestroy() {
        stopAndroidWebServer();
        isStarted = false;
        super.onDestroy();
    }



}