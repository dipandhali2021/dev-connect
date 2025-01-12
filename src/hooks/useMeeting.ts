import { useState, useEffect } from 'react';

interface MeetingState {
  isLoading: boolean;
  error: string | null;
  meetingUrl: string | null;
}

export const useMeeting = (bookingId: string) => {
  const [state, setState] = useState<MeetingState>({
    isLoading: true,
    error: null,
    meetingUrl: null
  });

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/meetings/${bookingId}`, {
          
        });

        if (!response.ok) {
          throw new Error('Failed to fetch meeting details');
        }

        const data = await response.json();
        setState({
          isLoading: false,
          error: null,
          meetingUrl: data.data.meetingUrl
        });
      } catch (err) {
        setState({
          isLoading: false,
          error: 'Failed to load meeting details',
          meetingUrl: null
        });
      }
    };

    if (bookingId) {
      fetchMeeting();
    }
  }, [bookingId]);

  const joinMeeting = async () => {
    try {
      await fetch(`http://localhost:5000/api/meetings/${bookingId}/join`, {
        method: 'POST',
        
      });
    } catch (err) {
      console.error('Failed to join meeting:', err);
    }
  };

  const endMeeting = async () => {
    try {
      await fetch(`http://localhost:5000/api/meetings/${bookingId}/end`, {
        method: 'POST',
        
      });
    } catch (err) {
      console.error('Failed to end meeting:', err);
    }
  };

  return {
    ...state,
    joinMeeting,
    endMeeting
  };
};
