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
exports.destroy = exports.update = exports.store = exports.show = exports.index = void 0;
const debug_1 = __importDefault(require("debug"));
const prisma_1 = __importDefault(require("../prisma"));
// Create a new debug instance
const debug = (0, debug_1.default)('prisma-books:book_controller');
/**
 * Get all books
 */
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield prisma_1.default.book.findMany();
        res.send({
            status: "success",
            data: books,
        });
    }
    catch (err) {
        debug("Error thrown when finding books", err);
        res.status(500).send({ status: "error", message: "Something went wrong" });
    }
});
exports.index = index;
/**
 * Get a single book
 */
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = Number(req.params.bookId);
    try {
        const book = yield prisma_1.default.book.findUniqueOrThrow({
            where: {
                id: bookId,
            },
            include: {
                authors: true,
                publisher: true,
            }
        });
        res.send({
            status: "success",
            data: book,
        });
    }
    catch (err) {
        debug("Error thrown when finding book with id %o: %o", req.params.bookId, err);
        return res.status(404).send({ status: "error", message: "Not found" });
    }
});
exports.show = show;
/**
 * Create a book
 */
const store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield prisma_1.default.book.create({
            data: {
                title: req.body.title,
                pages: req.body.pages,
                isbn: req.body.isbn,
                publisherId: req.body.publisherId,
                cover: req.body.cover,
            }
        });
        res.send({
            status: "success",
            data: book,
        });
    }
    catch (err) {
        debug("Error thrown when creating a book %o: %o", req.body, err);
        res.status(500).send({ status: "error", message: "Something went wrong" });
    }
});
exports.store = store;
/**
 * Update a book
 */
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.update = update;
/**
 * Delete a book
 */
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.destroy = destroy;
