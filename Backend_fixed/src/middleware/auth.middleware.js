const jwt = require("jsonwebtoken");
const tokenBlackListModel = require("../models/blacklist.model.js");

async function authUser(req, res, next) {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: "Token not provided"
            });
        }

        const isBlacklisted = await tokenBlackListModel.findOne({ token });

        if (isBlacklisted) {
            return res.status(401).json({
                message: "Token is invalid"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        return next();
    } catch (error) {
        console.error("[AUTH] Middleware error:", error);

        if (
            error.name === "JsonWebTokenError" ||
            error.name === "TokenExpiredError"
        ) {
            return res.status(401).json({
                message: "Invalid or expired user token"
            });
        }

        return res.status(500).json({
            message: "Authentication service error"
        });
    }
}

module.exports = { authUser };
