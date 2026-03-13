import { Router } from 'express';
import { getAddresses, addAddress } from '../controllers/address.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(protect);
router.get('/', getAddresses);
router.post('/', addAddress);

export default router;
