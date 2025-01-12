import MeetingService from '../services/meetingService.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import Meeting from '../models/Meeting.js';
import Booking from '../models/Booking.js';

class MeetingController {
  createMeeting = asyncHandler(async (req, res) => {
    const { bookingId, startTime, duration, createdBy, meetingUrl, participants } = req.body;
    

    const existingMeeting = await Meeting.findOne({ bookingId });
    if (existingMeeting) {
      return res.status(200).json({
        success: true,
        data: existingMeeting
      });
    }

    const meeting = await Meeting.create({
      bookingId,
      startTime,
      duration,
      createdBy,
      meetingUrl,
      participants,
      status: 'scheduled'
    });
  
    // Set up WebSocket connection for the meeting
    const wsServer = req.app.get('wsServer');
    if (wsServer) {
      wsServer.handleNewMeeting(meeting._id);
    } else {
      console.error('WebSocket server not found');
    }
    wsServer.handleNewMeeting(meeting._id);
  
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
    const meetings = await MeetingService.getUpcomingMeetings(userId);
    

    
     
    res.json({
      success: true,
      data: meetings,
    });
  });
}

export default new MeetingController();
