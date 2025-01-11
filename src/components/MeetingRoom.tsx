import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Video, Mic, MicOff, VideoOff, PhoneOff, Shield, AlertCircle } from 'lucide-react';
import Cookies from 'js-cookie';

interface MeetingRoomProps {
  bookingId: string;
  duration: number;
  startTime: Date;
  onMeetingEnd?: () => void;
}

export const MeetingRoom: React.FC<MeetingRoomProps> = ({
  bookingId,
  duration,
  startTime,
  onMeetingEnd
}) => {
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [meetingUrl, setMeetingUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const createMeeting = async () => {
      try {
        const token = Cookies.get('token'); 
        console.log('All cookies:', document.cookie); // Log all cookies
      console.log('Token from cookie:', token);
        const response = await fetch('http://localhost:5000/api/meetings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            bookingId,
            startTime,
            duration
          })
        });
        if (!response.ok) {
          throw new Error('Failed to create meeting');
        }

        const data = await response.json();
        setMeetingUrl(data.data.meetingUrl);
      } catch (err) {
        setError('Failed to create meeting room. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    createMeeting();
  }, [bookingId, startTime, duration]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const endTime = new Date(startTime).getTime() + duration * 60 * 60 * 1000;
      const now = new Date().getTime();
      const difference = endTime - now;

      if (difference <= 0) {
        onMeetingEnd?.();
        return '00:00:00';
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime, duration, onMeetingEnd]);

  const handleEndMeeting = async () => {
    try {
      await fetch(`/api/meetings/${bookingId}/end`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      onMeetingEnd?.();
    } catch (err) {
      console.error('Failed to end meeting:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16 bg-gray-50 dark:bg-dark-200 flex items-center justify-center">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600 dark:text-primary-100">Creating meeting room...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-16 bg-gray-50 dark:bg-dark-200 flex items-center justify-center">
        <div className="bg-red-500/10 p-4 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400">
          <AlertCircle className="w-5 h-5" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-dark-200">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-dark-100 rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Meeting Header */}
          <div className="p-4 bg-primary-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Video className="w-6 h-6" />
              <div>
                <h2 className="text-lg font-semibold">Active Session</h2>
                <p className="text-primary-100">Meeting in progress</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <Clock className="w-5 h-5" />
                <span className="font-mono">{timeLeft}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <Users className="w-5 h-5" />
                <span>2 Participants</span>
              </div>
            </div>
          </div>

          {/* Meeting Content */}
          <div className="relative">
            {meetingUrl && (
              <iframe
                src={meetingUrl}
                className="w-full h-[calc(100vh-300px)]"
                allow="camera;microphone;fullscreen;display-capture"
                title="Meeting Room"
              />
            )}

            {/* Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-4 rounded-full ${
                    isMuted ? 'bg-red-500' : 'bg-white'
                  } transition-colors`}
                >
                  {isMuted ? (
                    <MicOff className="w-6 h-6 text-white" />
                  ) : (
                    <Mic className="w-6 h-6 text-gray-900" />
                  )}
                </button>
                <button
                  onClick={() => setIsVideoOff(!isVideoOff)}
                  className={`p-4 rounded-full ${
                    isVideoOff ? 'bg-red-500' : 'bg-white'
                  } transition-colors`}
                >
                  {isVideoOff ? (
                    <VideoOff className="w-6 h-6 text-white" />
                  ) : (
                    <Video className="w-6 h-6 text-gray-900" />
                  )}
                </button>
                <button
                  onClick={handleEndMeeting}
                  className="p-4 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
                >
                  <PhoneOff className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="p-4 bg-primary-600/10 flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            <p className="text-sm text-primary-600 dark:text-primary-400">
              This meeting is secure and encrypted. Only authorized participants can join.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};