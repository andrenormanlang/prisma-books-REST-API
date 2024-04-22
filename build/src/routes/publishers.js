"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const publisher_controller_1 = require("../controllers/publisher_controller");
const router = express_1.default.Router();
/**
 * GET /publishers
 */
router.get('/', publisher_controller_1.index);
/**
 * GET /publishers/:publisherId
 */
router.get('/:publisherId', publisher_controller_1.show);
/**
 * POST /publishers
 */
router.post('/', publisher_controller_1.store);
/**
 * PATCH /publishers/:publisherId
 */
router.patch('/:publisherId', publisher_controller_1.update);
/**
 * DELETE /publishers/:publisherId
 */
router.delete('/:publisherId', publisher_controller_1.destroy);
exports.default = router;
