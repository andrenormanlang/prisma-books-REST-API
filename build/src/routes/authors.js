"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Handles all `/authors` routes
 */
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const author_controller_1 = require("../controllers/author_controller");
const router = express_1.default.Router();
/**
 * GET /authors
 */
router.get('/', author_controller_1.index);
/**
 * GET /authors/:authorId
 */
router.get('/:authorId', author_controller_1.show);
/**
 * POST /authors
 */
router.post('/', [
    (0, express_validator_1.body)('name').optional().isString().withMessage('has to be a string').bail().isLength({ min: 3, max: 191 }).withMessage('has to be 3-191 chars long'),
], author_controller_1.store);
/**
 * POST /authors/:authorId/books
 */
router.post('/:authorId/books', author_controller_1.addBook);
/**
 * DELETE /authors/:authorId/books/:bookId
 */
router.delete('/:authorId/books/:bookId', author_controller_1.removeBook);
exports.default = router;
