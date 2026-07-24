"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatus = exports.getOrder = exports.getOrders = exports.createOrder = void 0;
const orderService = __importStar(require("../services/order.service"));
const createOrder = async (req, res, next) => {
    try {
        const order = await orderService.createOrder(req.user.id);
        res.status(201).json({ success: true, data: order });
    }
    catch (error) {
        next(error);
    }
};
exports.createOrder = createOrder;
const getOrders = async (req, res, next) => {
    try {
        const userId = req.user.role === 'ADMIN' ? undefined : req.user.id;
        const orders = await orderService.getOrders(userId);
        res.json({ success: true, data: orders });
    }
    catch (error) {
        next(error);
    }
};
exports.getOrders = getOrders;
const getOrder = async (req, res, next) => {
    try {
        const order = await orderService.getOrderById(req.params.id);
        res.json({ success: true, data: order });
    }
    catch (error) {
        next(error);
    }
};
exports.getOrder = getOrder;
const updateStatus = async (req, res, next) => {
    try {
        const order = await orderService.updateOrderStatus(req.params.id, req.body.status);
        res.json({ success: true, data: order });
    }
    catch (error) {
        next(error);
    }
};
exports.updateStatus = updateStatus;
//# sourceMappingURL=order.controller.js.map