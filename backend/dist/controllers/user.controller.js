"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserStats = exports.getUsers = void 0;
const database_1 = __importDefault(require("../config/database"));
const getUsers = async (req, res, next) => {
    try {
        const users = await database_1.default.user.findMany({
            select: { id: true, email: true, name: true, role: true, createdAt: true }
        });
        res.json({ success: true, data: users });
    }
    catch (error) {
        next(error);
    }
};
exports.getUsers = getUsers;
const getUserStats = async (req, res, next) => {
    try {
        const [totalUsers, totalCustomers, totalAdmins, totalOrders] = await Promise.all([
            database_1.default.user.count(),
            database_1.default.user.count({ where: { role: 'CUSTOMER' } }),
            database_1.default.user.count({ where: { role: 'ADMIN' } }),
            database_1.default.order.count()
        ]);
        res.json({
            success: true,
            data: { totalUsers, totalCustomers, totalAdmins, totalOrders }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getUserStats = getUserStats;
//# sourceMappingURL=user.controller.js.map