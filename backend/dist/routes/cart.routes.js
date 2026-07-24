"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const cart_controller_1 = require("../controllers/cart.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.get('/', cart_controller_1.getCart);
router.post('/', [
    (0, express_validator_1.body)('productId').notEmpty(),
    (0, express_validator_1.body)('quantity').optional().isInt({ min: 1 })
], cart_controller_1.addToCart);
router.put('/:id', [
    (0, express_validator_1.body)('quantity').isInt({ min: 0 })
], cart_controller_1.updateCartItem);
router.delete('/:id', cart_controller_1.removeFromCart);
exports.default = router;
//# sourceMappingURL=cart.routes.js.map