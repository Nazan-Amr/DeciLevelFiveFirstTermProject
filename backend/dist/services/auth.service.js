"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = exports.login = exports.register = void 0;
const database_1 = __importDefault(require("../config/database"));
const password_1 = require("../utils/password");
const jwt_1 = require("../utils/jwt");
const client_1 = require("@prisma/client");
const register = async (email, password, name) => {
    const existingUser = await database_1.default.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new Error('Email already registered');
    }
    const hashedPassword = await (0, password_1.hashPassword)(password);
    const user = await database_1.default.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
            role: client_1.Role.CUSTOMER
        }
    });
    const token = (0, jwt_1.generateToken)(user);
    return { user: { id: user.id, email: user.email, name: user.name, role: user.role }, token };
};
exports.register = register;
const login = async (email, password) => {
    const user = await database_1.default.user.findUnique({ where: { email } });
    if (!user || !user.password) {
        throw new Error('Invalid credentials');
    }
    const isValid = await (0, password_1.comparePassword)(password, user.password);
    if (!isValid) {
        throw new Error('Invalid credentials');
    }
    const token = (0, jwt_1.generateToken)(user);
    return { user: { id: user.id, email: user.email, name: user.name, role: user.role }, token };
};
exports.login = login;
const getCurrentUser = async (userId) => {
    const user = await database_1.default.user.findUnique({
        where: { id: userId },
        select: { id: true, email: true, name: true, role: true, createdAt: true }
    });
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};
exports.getCurrentUser = getCurrentUser;
//# sourceMappingURL=auth.service.js.map