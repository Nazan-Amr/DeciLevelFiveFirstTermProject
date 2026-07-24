"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const order_controller_1 = require("../controllers/order.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.post('/', order_controller_1.createOrder);
router.get('/', order_controller_1.getOrders);
router.get('/:id', order_controller_1.getOrder);
router.put('/:id/status', (0, auth_middleware_1.authorize)('ADMIN'), [
    (0, express_validator_1.body)('status').isIn(['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'])
], order_controller_1.updateStatus);
exports.default = router;
//# sourceMappingURL=order.routes.js.map