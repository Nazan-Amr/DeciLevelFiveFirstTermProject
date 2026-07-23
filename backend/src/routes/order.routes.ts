import { Router } from 'express';
import { body } from 'express-validator';
import { createOrder, getOrders, getOrder, updateStatus } from '../controllers/order.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.post('/', createOrder);
router.get('/', getOrders);
router.get('/:id', getOrder);
router.put('/:id/status', authorize('ADMIN'), [
  body('status').isIn(['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'])
], updateStatus);

export default router;