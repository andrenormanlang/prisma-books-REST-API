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
const prisma_1 = __importDefault(require("../prisma"));
/**
 * Get all publishers
 */
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const publishers = yield prisma_1.default.publisher.findMany();
        res.send(publishers);
    }
    catch (err) {
        res.status(500).send({ message: "Something went wrong" });
    }
});
exports.index = index;
/**
 * Get a single publisher
 */
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const publisherId = Number(req.params.publisherId);
    try {
        const publisher = yield prisma_1.default.publisher.findUniqueOrThrow({
            where: {
                id: publisherId,
            },
            include: {
                books: true,
            }
        });
        return res.send(publisher);
    }
    catch (err) {
        return res.status(404).send({ message: "Not found" });
    }
});
exports.show = show;
/**
 * Create a publisher
 */
const store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const publisher = yield prisma_1.default.publisher.create({
            data: {
                name: req.body.name,
            }
        });
        return res.send(publisher);
    }
    catch (err) {
        return res.status(500).send({ message: "Something went wrong" });
    }
});
exports.store = store;
/**
 * Update a publisher
 */
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const publisherId = Number(req.params.publisherId);
    try {
        const publisher = yield prisma_1.default.publisher.update({
            where: {
                id: publisherId,
            },
            data: req.body,
        });
        return res.send(publisher);
    }
    catch (err) {
        return res.status(500).send({ message: "Something went wrong" });
    }
});
exports.update = update;
/**
 * Delete a publisher
 */
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const publisherId = Number(req.params.publisherId);
    // verify that the publisher doesn't have any associated books
    try {
        const publisher = yield prisma_1.default.publisher.findUniqueOrThrow({
            where: {
                id: publisherId,
            },
            include: {
                _count: {
                    select: {
                        books: true,
                    },
                },
            },
        });
        if (publisher._count.books) {
            return res.status(400).send({ message: "Publisher has linked books" });
        }
    }
    catch (err) {
        return res.status(404).send({ message: "Not found" });
    }
    // delete the publisher
    try {
        const publisher = yield prisma_1.default.publisher.delete({
            where: {
                id: publisherId,
            },
        });
        return res.send(publisher);
    }
    catch (err) {
        return res.status(500).send({ message: "Something went wrong when deleting the resource" });
    }
});
exports.destroy = destroy;
