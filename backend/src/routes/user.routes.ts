import { Router } from 'express';
import { getUsers, getUserStats } from '../controllers/user.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate, authorize('ADMIN'));

router.get('/', getUsers);
router.get('/stats', getUserStats);

export default router;