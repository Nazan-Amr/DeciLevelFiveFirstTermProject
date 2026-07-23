import { Router } from 'express';
import { body } from 'express-validator';
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { upload } from '../middleware/upload.middleware';
import { validate } from '../middleware/validate.middleware';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', authenticate, authorize('ADMIN'), upload.single('image'), [
  body('name').trim().notEmpty(),
  body('description').trim().notEmpty(),
  body('price').isFloat({ min: 0 }),
  body('stock').isInt({ min: 0 }),
  body('categoryId').notEmpty(),
  validate
], createProduct);
router.put('/:id', authenticate, authorize('ADMIN'), upload.single('image'), updateProduct);
router.delete('/:id', authenticate, authorize('ADMIN'), deleteProduct);

export default router;