const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// Keep the production frontend origin here. Vercel preview deployments
// for this same project are also allowed by the restricted pattern below.
const allowedOrigins = new Set([
    "http://localhost:5173",
    "https://ai-interview-prep-pi-ochre.vercel.app",
    ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL.replace(/\/$/, "")] : []),
]);

function isAllowedOrigin(origin) {
    if (!origin) return true; // curl, server-to-server and health checks

    if (allowedOrigins.has(origin)) return true;

    // Allow only this project's Vercel deployments, not every *.vercel.app site.
    return /^https:\/\/ai-interview-prep(?:-[a-z0-9-]+)?\.vercel\.app$/i.test(origin);
}

const corsOptions = {
    origin(origin, callback) {
        console.log("[CORS] Incoming origin:", origin || "(no origin)");

        if (isAllowedOrigin(origin)) {
            return callback(null, true);
        }

        console.error("[CORS] Blocked origin:", origin);
        return callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth.routes.js");
const interviewRouter = require("./routes/interview.routes.js");

app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

module.exports = app;
