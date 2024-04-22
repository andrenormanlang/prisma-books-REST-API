"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
/**
 * JWT Authentication Middleware
 */
const debug_1 = __importDefault(require("debug"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const debug = (0, debug_1.default)('prisma-books:jwt');
/**
 * Validate JWT Access Token
 *
 * Authorization: Bearer <token>
 */
const validateToken = (req, res, next) => {
    debug("Hello from auth/jwt!");
    // Make sure Authorization header exists, otherwise bail 🛑
    if (!req.headers.authorization) {
        debug("Authorization header missing");
        return res.status(401).send({
            status: "fail",
            data: "Authorization required",
        });
    }
    // Split Authorization header on ` `
    // "Bearer <token>"
    const [authSchema, token] = req.headers.authorization.split(" ");
    // Check that Authorization scheme is "Bearer", otherwise bail 🛑
    if (authSchema.toLowerCase() !== "bearer") {
        debug("Authorization schema isn't Bearer");
        return res.status(401).send({
            status: "fail",
            data: "Authorization required",
        });
    }
    // Verify token and attach payload to request, otherwise bail 🛑
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET || "");
        debug("Yay got 📦: %o", payload);
        // Attach payload to Request 🤩
        req.token = payload;
    }
    catch (err) {
        debug("Token failed verification", err);
        return res.status(401).send({
            status: "fail",
            data: "Authorization required",
        });
    }
    // Pass request along ✅
    next();
};
exports.validateToken = validateToken;
