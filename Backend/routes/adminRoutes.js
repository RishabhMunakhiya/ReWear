import express from 'express';
import { getUsers, getItems, getExchanges, approveItem, rejectItem } from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/users').get(protect, admin, getUsers);
router.route('/items').get(protect, admin, getItems);
router.route('/exchanges').get(protect, admin, getExchanges);

router.route('/approve-item/:id').put(protect, admin, approveItem);
router.route('/reject-item/:id').put(protect, admin, rejectItem);

export default router;
