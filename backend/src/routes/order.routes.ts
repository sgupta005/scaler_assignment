import { Router } from 'express';
import { placeOrder, getOrder } from '../controllers/order.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(protect);
router.post('/', placeOrder);
router.get('/:orderId', getOrder);

export default router;
