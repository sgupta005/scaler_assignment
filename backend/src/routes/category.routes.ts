import { Router } from 'express';
import {
  getAllCategories,
  getCategorySections,
  getCategoryTree,
} from '../controllers/category.controller.js';

const router = Router();

router.get('/sections', getCategorySections);
router.get('/tree', getCategoryTree);
router.get('/', getAllCategories);

export default router;

