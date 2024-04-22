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
exports.createAuthor = exports.getAuthor = exports.getAuthors = void 0;
/**
 * Author Service
 */
const prisma_1 = __importDefault(require("../prisma"));
/**
 * Get all authors
 */
const getAuthors = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.author.findMany();
});
exports.getAuthors = getAuthors;
/**
 * Get a single author
 *
 * @param authorId The id of the author to get
 */
const getAuthor = (authorId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.author.findUniqueOrThrow({
        where: {
            id: authorId,
        },
        include: {
            books: true,
        }
    });
});
exports.getAuthor = getAuthor;
/**
 * Create a author
 *
 * @param data Author Details
 */
const createAuthor = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.author.create({
        data: {
            name: data.name,
        }
    });
});
exports.createAuthor = createAuthor;
