import MeetingService from '../services/meetingService.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import Meeting from '../models/Meeting.js';
import Booking from '../models/Booking.js';

class MeetingController {
  createMeeting = asyncHandler(async (req, res) => {
    const { bookingId, startTime, duration, createdBy, meetingUrl, participants } = req.body;
    
    // Check if meeting already exists for this booking
    let meeting = await Meeting.findOne({ bookingId });
    
    if (meeting) {
      return res.status(200).json({
        success: true,
        data: meeting
      });
    }

    // Create new meeting with provided data
    meeting = await Meeting.create({
      bookingId,
      startTime,
      duration,
      createdBy,
      meetingUrl,
      participants,
      status: 'scheduled'
    });

  

    res.status(201).json({
      success: true,
      data: meeting
    });
  });

  updateMeetingStatus = asyncHandler(async (req, res) => {
    const { meetingId } = req.params;
    const { status } = req.body;

    const meeting = await MeetingService.updateMeetingStatus(meetingId, status);

    res.json({
      success: true,
      data: meeting,
    });
  });

  joinMeeting = asyncHandler(async (req, res) => {
    const { meetingId } = req.params;
    const { userId } = req.body;

    const meeting = await MeetingService.recordParticipantJoin(
      meetingId,
      userId
    );

    res.json({
      success: true,
      data: meeting,
    });
  });

  leaveMeeting = asyncHandler(async (req, res) => {
    const { meetingId } = req.params;
    const { userId } = req.body;

    const meeting = await MeetingService.recordParticipantLeave(
      meetingId,
      userId
    );

    res.json({
      success: true,
      data: meeting,
    });
  });

  //http://localhost:5000/api/meetings/booking/${bookingId}
  getMeetingByBookingId = asyncHandler(async (req, res) => {
    const { bookingId } = req.params;

    const meeting = await MeetingService.getMeetingByBookingId(bookingId);

    res.json({
      success: true,
      data: meeting,
    });
  });

  getMeetingDetails = asyncHandler(async (req, res) => {
    const { meetingId } = req.params;

    const meeting = await MeetingService.getMeetingDetails(meetingId);

    res.json({
      success: true,
      data: meeting,
    });
  });

  getUpcomingMeetings = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    
    // Get all meetings
    let meetings = await MeetingService.getUpcomingMeetings(userId);
    
    // Filter and delete expired meetings
    const currentTime = new Date();
    const validMeetings = [];
    
    for (const meeting of meetings) {
      const meetingStartTime = new Date(meeting.startTime);
      const meetingEndTime = new Date(meetingStartTime.getTime() + meeting.duration * 60 * 1000); // Convert duration to milliseconds
      
      if (currentTime > meetingEndTime) {
        // Meeting has expired, delete it
        await Meeting.findByIdAndDelete(meeting._id);
      } else {
        validMeetings.push(meeting);
      }
    }
    
    res.json({
      success: true,
      data: validMeetings,
    });
  });
}

export default new MeetingController();
