import express from 'express';
import meetingController from '../controllers/meetingController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate); // Protect all meeting routes

router.post('/', meetingController.createMeeting);
router.get('/:meetingId', meetingController.getMeeting);
router.post('/:meetingId/join', meetingController.joinMeeting);
router.post('/:meetingId/end', meetingController.endMeeting);

export default router;