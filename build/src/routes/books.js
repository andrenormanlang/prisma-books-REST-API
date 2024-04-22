"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("../controllers/book_controller");
const router = express_1.default.Router();
/**
 * GET /books
 */
router.get('/', book_controller_1.index);
/**
 * GET /books/:bookId
 */
router.get('/:bookId', book_controller_1.show);
/**
 * POST /books
 */
router.post('/', book_controller_1.store);
/**
 * POST /books/bulk
 */
// Route for bulk creating books
router.post('/bulk', book_controller_1.storeBulkBooks);
/**
 * PUT /books/:bookId
 */
router.put('/books/:bookId', book_controller_1.update);
/**
 * DELETE /books/:bookId
 */
router.delete('/books/:bookId', book_controller_1.destroy);
exports.default = router;
