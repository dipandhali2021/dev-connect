import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertCircle, X } from 'lucide-react';
import { VideoCall } from './VideoCall';
import { useAuth } from '../contexts/AuthContext';

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
  onMeetingEnd,
}) => {
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [roomId, setRoomId] = useState<string>('');
  const { user } = useAuth();


  if (isLoading) {
    return (
      <div className="min-h-screen pt-16 bg-gray-50 dark:bg-dark-200 flex items-center justify-center">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600 dark:text-primary-100">
            Creating meeting room...
          </p>
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
          <div className="h-[calc(100vh-200px)]">
            <VideoCall
              roomId={roomId}
              userId={user?._id || ''}
              userName={user?.name || ''}
              onEnd={onMeetingEnd}
            />
          </div>

          {/* Security Notice */}
          <div className="p-4 bg-primary-600/10 flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            <p className="text-sm text-primary-600 dark:text-primary-400">
              This meeting is secure and encrypted. Only authorized participants
              can join.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};