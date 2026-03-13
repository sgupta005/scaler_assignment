import { Router } from 'express';
import { placeOrder, getOrder, getOrderHistory } from '../controllers/order.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(protect);
router.post('/', placeOrder);
router.get('/', getOrderHistory);
router.get('/:orderId', getOrder);

export default router;
