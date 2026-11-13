const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "https://ai-interview-prep-pi-ochre.vercel.app",
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth.routes.js");
const interviewRouter = require("./routes/interview.routes.js");

app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

module.exports = app;