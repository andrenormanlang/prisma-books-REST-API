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
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroy = exports.update = exports.store = exports.show = exports.index = void 0;
/**
 * Get all resources
 */
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.index = index;
/**
 * Get a single resource
 */
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.show = show;
/**
 * Create a resource
 */
const store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.store = store;
/**
 * Update a resource
 */
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.update = update;
/**
 * Delete a resource
 */
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.destroy = destroy;
