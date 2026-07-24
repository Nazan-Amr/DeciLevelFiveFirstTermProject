"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategory = exports.getCategories = void 0;
const database_1 = __importDefault(require("../config/database"));
const getCategories = async (req, res, next) => {
    try {
        const categories = await database_1.default.category.findMany({
            include: {
                _count: { select: { products: true } }
            }
        });
        res.json({ success: true, data: categories });
    }
    catch (error) {
        next(error);
    }
};
exports.getCategories = getCategories;
const createCategory = async (req, res, next) => {
    try {
        const { name, slug } = req.body;
        const category = await database_1.default.category.create({
            data: { name, slug }
        });
        res.status(201).json({ success: true, data: category });
    }
    catch (error) {
        next(error);
    }
};
exports.createCategory = createCategory;
//# sourceMappingURL=category.controller.js.map