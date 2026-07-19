import express from 'express';
import { updateUserProfile, getUserPoints, getSustainabilityRecord } from '../controllers/userController.js';
import { getUserProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.get('/points', protect, getUserPoints);
router.get('/sustainability', protect, getSustainabilityRecord);

export default router;
