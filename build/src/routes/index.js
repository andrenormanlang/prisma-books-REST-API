"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authors_1 = __importDefault(require("./authors"));
const books_1 = __importDefault(require("./books"));
const profile_1 = __importDefault(require("./profile"));
const publishers_1 = __importDefault(require("./publishers"));
const user_controller_1 = require("../controllers/user_controller");
const jwt_1 = require("../middlewares/auth/jwt");
const user_rules_1 = require("../validations/user_rules");
// instantiate a new router
const router = express_1.default.Router();
/**
 * GET /
 */
router.get('/', (req, res) => {
    res.send({
        message: "I AM API, BEEP BOOP",
    });
});
/**
 * /authors
 */
router.use('/authors', authors_1.default);
/**
 * /books
 */
router.use('/books', books_1.default);
/**
 * /profile
 */
router.use('/profile', jwt_1.validateToken, profile_1.default);
/**
 * /publishers
 */
router.use('/publishers', publishers_1.default);
/**
 * POST /login
 */
router.post('/login', user_controller_1.login);
/**
 * POST /refresh
 */
router.post('/refresh', user_controller_1.refresh);
/**
 * POST /register
 */
router.post('/register', user_rules_1.createUserRules, user_controller_1.register);
exports.default = router;
