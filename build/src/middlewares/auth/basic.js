"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.basic = void 0;
/**
 * HTTP Basic Authentication Middleware
 */
const bcrypt_1 = __importDefault(require("bcrypt"));
const debug_1 = __importDefault(require("debug"));
const user_service_1 = require("../../services/user_service");
const debug = (0, debug_1.default)('prisma-books:basic');
const basic = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    debug("Hello from auth/basic!");
    // Make sure Authorization header exists, otherwise bail 🛑
    if (!req.headers.authorization) {
        debug("Authorization header missing");
        return res.status(401).send({
            status: "fail",
            data: "Authorization required",
        });
    }
    // Split Authorization header on ` `
    // "Basic am5AdGhlaGl2ZXJlc2lzdGFuY2UuY29tOmFiYzEyMw=="
    // =>
    // [0] => "Basic"
    // [1] => "am5AdGhlaGl2ZXJlc2lzdGFuY2UuY29tOmFiYzEyMw=="
    debug("Authorization header: %o", req.headers.authorization);
    const [authSchema, base64Payload] = req.headers.authorization.split(" ");
    // Check that Authorization scheme is "Basic", otherwise bail 🛑
    if (authSchema.toLowerCase() !== "basic") {
        debug("Authorization schema isn't Basic");
        return res.status(401).send({
            status: "fail",
            data: "Authorization required",
        });
    }
    // Decode credentials from base64 => ascii
    const decodedPayload = Buffer.from(base64Payload, "base64").toString("ascii");
    // decodedPayload = "jn@thehiveresistance.com:abc123"
    // Split decodedPayload on `:`
    const [email, password] = decodedPayload.split(":");
    // Get user from database, otherwise bail 🛑
    const user = yield (0, user_service_1.getUserByEmail)(email);
    if (!user) {
        debug("User %s does not exist", email);
        return res.status(401).send({
            status: "fail",
            data: "Authorization required",
        });
    }
    // Verify hash against credentials, otherwise bail 🛑
    const result = yield bcrypt_1.default.compare(password, user.password);
    if (!result) {
        debug("Password for user %s didn't match", email);
        return res.status(401).send({
            status: "fail",
            data: "Authorization required",
        });
    }
    debug("Password for user %s was correct 🥳", email);
    // Attach User to Request 🤩
    req.user = user;
    // Nothing to see here, move along... ✅
    next();
});
exports.basic = basic;
