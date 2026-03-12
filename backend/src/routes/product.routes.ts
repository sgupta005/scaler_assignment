import { Router } from 'express';
import {
  getProductById,
  getProducts,
  searchProducts,
} from '../controllers/product.controller.js';

const router = Router();

router.get('/', getProducts);
router.get('/search', searchProducts);
router.get('/:id', getProductById);

export default router;

