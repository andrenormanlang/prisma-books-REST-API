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
exports.updateUserRules = exports.createUserRules = void 0;
/**
 * Validation Rules for User resource
 */
const express_validator_1 = require("express-validator");
const user_service_1 = require("../services/user_service");
exports.createUserRules = [
    (0, express_validator_1.body)('name').isString().bail().isLength({ min: 3 }),
    (0, express_validator_1.body)('email').isEmail().custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        // check if a User with that email already exists
        const user = yield (0, user_service_1.getUserByEmail)(value);
        if (user) {
            // user already exists, throw a hissy-fit
            return Promise.reject("Email already exists");
        }
    })),
    (0, express_validator_1.body)('password').isString().bail().isLength({ min: 6 }),
];
exports.updateUserRules = [
    (0, express_validator_1.body)('name').optional().isString().bail().isLength({ min: 3 }),
    (0, express_validator_1.body)('email').optional().isEmail().custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        // check if a User with that email already exists
        const user = yield (0, user_service_1.getUserByEmail)(value);
        if (user) {
            // user already exists, throw a hissy-fit
            return Promise.reject("Email already exists");
        }
    })),
    (0, express_validator_1.body)('password').optional().isString().bail().isLength({ min: 6 }),
];
