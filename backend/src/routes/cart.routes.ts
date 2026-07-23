import { Router } from 'express';
import { body } from 'express-validator';
import { getCart, addToCart, updateCartItem, removeFromCart } from '../controllers/cart.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/', getCart);
router.post('/', [
  body('productId').notEmpty(),
  body('quantity').optional().isInt({ min: 1 })
], addToCart);
router.put('/:id', [
  body('quantity').isInt({ min: 0 })
], updateCartItem);
router.delete('/:id', removeFromCart);

export default router;