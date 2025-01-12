import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  MessageSquare,
  Monitor,
  Users,
  X,
  Send,
} from 'lucide-react';
import { webRTCService } from '../services/webRTCService';
import { ChatMessage, Participant } from '../types/webrtc';

interface VideoCallProps {
  roomId: string;
  userId: string;
  userName: string;
}

export const VideoCall: React.FC<VideoCallProps> = ({
  roomId,
  userId,
  userName,
}) => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeCall = async () => {
      try {
        const stream = await webRTCService.initialize(roomId, userId);
        if (localVideoRef.current && stream) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Failed to initialize call:', error);
      }
    };

    initializeCall();

    return () => {
      webRTCService.disconnect();
    };
  }, [roomId, userId]);

  const handleToggleAudio = async () => {
    try {
      await webRTCService.toggleAudio(!isAudioEnabled);
      setIsAudioEnabled(!isAudioEnabled);
    } catch (error) {
      console.error('Failed to toggle audio:', error);
    }
  };

  const handleToggleVideo = async () => {
    try {
      await webRTCService.toggleVideo(!isVideoEnabled);
      setIsVideoEnabled(!isVideoEnabled);
    } catch (error) {
      console.error('Failed to toggle video:', error);
    }
  };

  const handleToggleScreenShare = async () => {
    try {
      if (isScreenSharing) {
        await webRTCService.stopScreenShare();
      } else {
        await webRTCService.startScreenShare();
      }
      setIsScreenSharing(!isScreenSharing);
    } catch (error) {
      console.error('Failed to toggle screen share:', error);
    }
  };

  const handleEndCall = () => {
    webRTCService.disconnect();
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        sender: userName,
        content: newMessage.trim(),
        timestamp: Date.now(),
      };
      setChatMessages((prev) => [...prev, message]);
      setNewMessage('');

      // Scroll to bottom of chat
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }
  };

  return (
    <div className="relative h-full bg-gray-900">
      {/* Video Grid */}
      <div className="grid grid-cols-2 gap-4 p-4 h-[calc(100%-80px)]">
        <div className="relative bg-gray-800 rounded-xl overflow-hidden">
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 bg-gray-900/50 px-3 py-1 rounded-lg text-white text-sm">
            You
          </div>
        </div>
        {/* Add remote video elements here as participants join */}
      </div>

      {/* Controls Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gray-800 flex items-center justify-center gap-4">
        <button
          onClick={handleToggleAudio}
          className={`p-4 rounded-full ${
            isAudioEnabled ? 'bg-gray-700' : 'bg-red-500'
          } hover:bg-opacity-80 transition-colors`}
        >
          {isAudioEnabled ? (
            <Mic className="w-6 h-6 text-white" />
          ) : (
            <MicOff className="w-6 h-6 text-white" />
          )}
        </button>
        <button
          onClick={handleToggleVideo}
          className={`p-4 rounded-full ${
            isVideoEnabled ? 'bg-gray-700' : 'bg-red-500'
          } hover:bg-opacity-80 transition-colors`}
        >
          {isVideoEnabled ? (
            <Video className="w-6 h-6 text-white" />
          ) : (
            <VideoOff className="w-6 h-6 text-white" />
          )}
        </button>
        <button
          onClick={handleToggleScreenShare}
          className={`p-4 rounded-full ${
            isScreenSharing ? 'bg-primary-600' : 'bg-gray-700'
          } hover:bg-opacity-80 transition-colors`}
        >
          <Monitor className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`p-4 rounded-full ${
            isChatOpen ? 'bg-primary-600' : 'bg-gray-700'
          } hover:bg-opacity-80 transition-colors`}
        >
          <MessageSquare className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={handleEndCall}
          className="p-4 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
        >
          <PhoneOff className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Chat Sidebar */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="absolute top-0 right-0 bottom-0 w-80 bg-gray-800 border-l border-gray-700"
          >
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <h3 className="text-white font-medium">Chat</h3>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div
              ref={chatContainerRef}
              className="p-4 h-[calc(100%-144px)] overflow-y-auto space-y-4"
            >
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex flex-col ${
                    message.sender === userName ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.sender === userName
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-700 text-white'
                    }`}
                  >
                    <p className="text-sm font-medium mb-1">{message.sender}</p>
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-800 border-t border-gray-700">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};