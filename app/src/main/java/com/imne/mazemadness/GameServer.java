package com.imne.mazemadness;
import android.content.Context;

import java.io.IOException;

import fi.iki.elonen.NanoHTTPD;

public class GameServer extends NanoHTTPD {

    private Context context;
    public GameServer(Context ctx) throws IOException {
        super(8080);
        context = ctx;
        start(NanoHTTPD.SOCKET_READ_TIMEOUT, false);
    }

}