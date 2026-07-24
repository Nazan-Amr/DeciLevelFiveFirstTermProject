"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const product_controller_1 = require("../controllers/product.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const upload_middleware_1 = require("../middleware/upload.middleware");
const validate_middleware_1 = require("../middleware/validate.middleware");
const router = (0, express_1.Router)();
router.get('/', product_controller_1.getProducts);
router.get('/:id', product_controller_1.getProduct);
router.post('/', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('ADMIN'), upload_middleware_1.upload.single('image'), [
    (0, express_validator_1.body)('name').trim().notEmpty(),
    (0, express_validator_1.body)('description').trim().notEmpty(),
    (0, express_validator_1.body)('price').isFloat({ min: 0 }),
    (0, express_validator_1.body)('stock').isInt({ min: 0 }),
    (0, express_validator_1.body)('categoryId').notEmpty(),
    validate_middleware_1.validate
], product_controller_1.createProduct);
router.put('/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('ADMIN'), upload_middleware_1.upload.single('image'), product_controller_1.updateProduct);
router.delete('/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('ADMIN'), product_controller_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=product.routes.js.map