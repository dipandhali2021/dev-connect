import { asyncHandler } from '../middleware/asyncHandler.js';
import MeetingService from '../services/meetingService.js';
import { ApiError } from '../utils/ApiError.js';

class MeetingController {
  createMeeting = asyncHandler(async (req, res) => {
    const { bookingId, startTime, duration } = req.body;
    
    if (!bookingId || !startTime || !duration) {
      throw new ApiError(400, 'Missing required fields');
    }

    const meeting = await MeetingService.createMeeting({
      bookingId,
      startTime,
      duration,
      createdBy: req.user._id
    });

    res.status(201).json({
      success: true,
      data: meeting
    });
  });

  getMeeting = asyncHandler(async (req, res) => {
    const { meetingId } = req.params;
    const meeting = await MeetingService.getMeetingById(meetingId);
    
    if (!meeting) {
      throw new ApiError(404, 'Meeting not found');
    }

    res.json({
      success: true,
      data: meeting
    });
  });

  endMeeting = asyncHandler(async (req, res) => {
    const { meetingId } = req.params;
    const meeting = await MeetingService.endMeeting(meetingId);

    res.json({
      success: true,
      data: meeting
    });
  });

  joinMeeting = asyncHandler(async (req, res) => {
    const { meetingId } = req.params;
    const meeting = await MeetingService.joinMeeting(meetingId, req.user._id);

    res.json({
      success: true,
      data: meeting
    });
  });
}

export default new MeetingController();