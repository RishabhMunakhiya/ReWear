import express from 'express';
import { requestExchange, acceptExchange, rejectExchange, completeExchange, getMyExchanges } from '../controllers/exchangeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getMyExchanges);
router.post('/request', protect, requestExchange);
router.post('/accept', protect, acceptExchange);
router.post('/reject', protect, rejectExchange);
router.post('/complete', protect, completeExchange);

export default router;
