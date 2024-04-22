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
const prisma_1 = __importDefault(require("../src/prisma"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        /**
         * Publishers
         */
        const hutchinson = yield prisma_1.default.publisher.upsert({
            where: { id: 1 },
            update: {},
            create: { id: 1, name: "Hutchinson" }
        });
        const gnome = yield prisma_1.default.publisher.upsert({
            where: { id: 2 },
            update: {},
            create: { name: "Gnome Press" }
        });
        const podium = yield prisma_1.default.publisher.upsert({
            where: { id: 3 },
            update: {},
            create: { name: "Podium Audio" }
        });
        /**
         * Authors
         */
        const clarke = yield prisma_1.default.author.upsert({
            where: { id: 1 },
            update: {},
            create: { name: "Sir Arthur C. Clarke" }
        });
        const asimow = yield prisma_1.default.author.upsert({
            where: { id: 2 },
            update: {},
            create: { name: "Isaac Asimov" }
        });
        const anspach = yield prisma_1.default.author.upsert({
            where: { id: 3 },
            update: {},
            create: { name: "Jason Anspach" }
        });
        const cole = yield prisma_1.default.author.upsert({
            where: { id: 4 },
            update: {},
            create: { name: "Nick Cole" }
        });
        /**
         * Books
         */
        const odessey = yield prisma_1.default.book.upsert({
            where: { id: 1 },
            update: {},
            create: {
                title: "2001: A Space Odessey",
                pages: 224,
                publisherId: hutchinson.id,
                authors: {
                    connect: [
                        { id: clarke.id },
                    ],
                }
            }
        });
        const odessey_two = yield prisma_1.default.book.upsert({
            where: { id: 2 },
            update: {},
            create: {
                title: "2010: Odessey Two",
                pages: 291,
                publisherId: hutchinson.id,
                authors: {
                    connect: [
                        { id: clarke.id },
                    ],
                }
            }
        });
        const foundation = yield prisma_1.default.book.upsert({
            where: { id: 3 },
            update: {},
            create: {
                title: "Foundation",
                pages: 542,
                publisherId: gnome.id,
                authors: {
                    connect: [
                        { id: asimow.id },
                    ],
                }
            }
        });
        const galaxys_edge = yield prisma_1.default.book.upsert({
            where: { id: 4 },
            update: {},
            create: {
                title: "Galaxy's Edge: Book 1-2",
                pages: 0,
                publisherId: podium.id,
                authors: {
                    connect: [
                        { id: anspach.id },
                        { id: cole.id },
                    ],
                }
            }
        });
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma_1.default.$disconnect();
    process.exit(1);
}));
