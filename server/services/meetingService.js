import Meeting from '../models/Meeting.js';
import GoogleMeetConfig from '../config/googleMeet.js';
import { ApiError } from '../utils/ApiError.js';

class MeetingService {
  async createMeeting(meetingData) {
    try {
      // Create Google Meet meeting
      const { meetingUrl, meetingId } = await GoogleMeetConfig.createMeeting({
        audio: true,
        video: true,
        chat: true
      });

      console.log(meetingUrl);

      // Calculate end time based on duration
      const startTime = new Date(meetingData.startTime);
      const endTime = new Date(startTime.getTime() + meetingData.duration * 60 * 60 * 1000);

      // Create meeting in database
      const meeting = await Meeting.create({
        ...meetingData,
        meetingUrl,
        meetingId,
        endTime,
        participants: [
          {
            userId: meetingData.createdBy,
            role: 'developer',
          }
        ]
      }); 
      console.log(meeting);

      return meeting;
    } catch (error) {
      console.error('Error in meeting service:', error);
      throw new ApiError(500, 'Failed to create meeting');
    }
  }

  async getMeetingById(meetingId) {
    try {
      const meeting = await Meeting.findById(meetingId)
        .populate('participants.userId', 'name email')
        .populate('createdBy', 'name email');

      if (!meeting) {
        throw new ApiError(404, 'Meeting not found');
      }

      return meeting;
    } catch (error) {
      console.error('Error getting meeting:', error);
      throw new ApiError(500, 'Failed to get meeting details');
    }
  }

  async endMeeting(meetingId) {
    try {
      const meeting = await Meeting.findByIdAndUpdate(
        meetingId,
        {
          status: 'completed',
          updatedAt: new Date()
        },
        { new: true }
      );

      if (!meeting) {
        throw new ApiError(404, 'Meeting not found');
      }

      return meeting;
    } catch (error) {
      console.error('Error ending meeting:', error);
      throw new ApiError(500, 'Failed to end meeting');
    }
  }

  async joinMeeting(meetingId, userId) {
    try {
      const meeting = await Meeting.findById(meetingId);

      if (!meeting) {
        throw new ApiError(404, 'Meeting not found');
      }

      if (meeting.status !== 'scheduled' && meeting.status !== 'ongoing') {
        throw new ApiError(400, 'Meeting is not active');
      }

      const participant = meeting.participants.find(
        p => p.userId.toString() === userId.toString()
      );

      if (!participant) {
        meeting.participants.push({
          userId,
          role: 'customer',
          joinedAt: new Date()
        });
      } else {
        participant.joinedAt = new Date();
      }

      if (meeting.status === 'scheduled') {
        meeting.status = 'ongoing';
      }

      await meeting.save();
      return meeting;
    } catch (error) {
      console.error('Error joining meeting:', error);
      throw new ApiError(500, 'Failed to join meeting');
    }
  }
}

export default new MeetingService();