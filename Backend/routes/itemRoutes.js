import express from 'express';
import { uploadItem, getItems, getItemById, deleteItem } from '../controllers/itemController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getItems)
  .post(protect, upload.single('image'), uploadItem);

router.route('/:id')
  .get(getItemById)
  .delete(protect, deleteItem);

export default router;
