import express from 'express';
import userController from '../controllers/userController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate); // Protect all user routes

router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);

export default router;