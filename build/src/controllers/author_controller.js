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
exports.removeBook = exports.addBook = exports.destroy = exports.update = exports.store = exports.show = exports.index = void 0;
/**
 * Author Template
 */
const debug_1 = __importDefault(require("debug"));
const express_validator_1 = require("express-validator");
const author_service_1 = require("../services/author_service");
const prisma_1 = __importDefault(require("../prisma"));
// Create a new debug instance
const debug = (0, debug_1.default)('prisma-books:author_controller');
/**
 * Get all authors
 */
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authors = yield (0, author_service_1.getAuthors)();
        res.send({
            status: "success",
            data: authors,
        });
    }
    catch (err) {
        res.status(500).send({ status: "error", message: "Something went wrong" });
    }
});
exports.index = index;
/**
 * Get a single author
 */
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authorId = Number(req.params.authorId);
    try {
        const author = yield (0, author_service_1.getAuthor)(authorId);
        res.send({
            status: "success",
            data: author,
        });
    }
    catch (err) {
        debug("Error thrown when finding author with id %o: %o", req.params.authorId, err);
        return res.status(404).send({ status: "error", message: "Not found" });
    }
});
exports.show = show;
/**
 * Create a author
 */
const store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Check for any validation errors
    const validationErrors = (0, express_validator_1.validationResult)(req);
    if (!validationErrors.isEmpty()) {
        return res.status(400).send({
            status: "fail",
            data: validationErrors.array(),
        });
    }
    try {
        const author = yield (0, author_service_1.createAuthor)({
            name: req.body.name,
        });
        res.send({
            status: "success",
            data: author,
        });
    }
    catch (err) {
        res.status(500).send({ status: "error", message: "Something went wrong" });
    }
});
exports.store = store;
/**
 * Update a author
 */
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.update = update;
/**
 * Delete a author
 */
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.destroy = destroy;
/**
 * Link books to a author
 */
const addBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Books to connect: ", req.body.bookIds);
    const bookIds = req.body.bookIds.map((bookId) => {
        return {
            id: bookId,
        };
    }); // [ { id: 3 }, { id: 4 } ]
    console.log("Books after map: ", bookIds);
    try {
        const result = yield prisma_1.default.author.update({
            where: {
                id: Number(req.params.authorId),
            },
            data: {
                books: {
                    connect: bookIds,
                }
            },
            include: {
                books: true,
            }
        });
        res.status(201).send(result);
    }
    catch (err) {
        debug("Error thrown when adding book %o to a author %o: %o", bookIds, req.params.authorId, err);
        res.status(500).send({ message: "Something went wrong" });
    }
});
exports.addBook = addBook;
/**
 * Unlink book from author
 */
const removeBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_1.default.author.update({
            where: {
                id: Number(req.params.authorId),
            },
            data: {
                books: {
                    disconnect: {
                        id: Number(req.params.bookId),
                    }
                }
            }
        });
    }
    catch (err) {
        debug("Error thrown when removing book %o from author %o: %o", req.body.bookId, req.params.authorId, err);
        res.status(500).send({ message: "Something went wrong" });
    }
});
exports.removeBook = removeBook;
