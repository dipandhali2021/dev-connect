import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Clock, Calendar, Video, MessageSquare, Shield, ChevronRight, Github, Linkedin } from 'lucide-react';

interface DeveloperProfileProps {
  developer: {
    id: number;
    name: string;
    role: string;
    rate: number;
    rating: number;
    skills: string[];
    image: string;
    available: boolean;
  };
  isOpen: boolean;
  onClose: () => void;
}

export const DeveloperProfile = ({ developer, isOpen, onClose }: DeveloperProfileProps) => {
  const reviews = [
    {
      id: 1,
      author: "Michael Scott",
      rating: 5,
      date: "2 days ago",
      comment: "Exceptional developer! Helped me solve complex React performance issues.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
    },
    {
      id: 2,
      author: "Lisa Chen",
      rating: 5,
      date: "1 week ago",
      comment: "Great communication and technical skills. Will definitely work with again!",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
    }
  ];

  const availability = [
    { day: "Mon", slots: ["9:00 AM", "2:00 PM", "4:00 PM"] },
    { day: "Tue", slots: ["10:00 AM", "3:00 PM"] },
    { day: "Wed", slots: ["9:00 AM", "1:00 PM", "5:00 PM"] },
    { day: "Thu", slots: ["11:00 AM", "4:00 PM"] },
    { day: "Fri", slots: ["9:00 AM", "2:00 PM"] }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative min-h-screen md:flex md:items-center md:justify-center p-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative max-w-5xl w-full bg-white dark:bg-dark-100 rounded-2xl shadow-xl overflow-hidden">
              {/* Header Section */}
              <div className="relative h-48 bg-gradient-to-r from-primary-600 to-primary-400">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="relative px-6 pb-6 md:px-8 md:pb-8">
                {/* Profile Info */}
                <div className="relative -mt-24 mb-8 flex flex-col md:flex-row gap-6 items-start">
                  <motion.img
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    src={developer.image}
                    alt={developer.name}
                    className="w-32 h-32 rounded-2xl object-cover ring-4 ring-white dark:ring-dark-100"
                  />
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{developer.name}</h2>
                        <p className="text-primary-600 dark:text-primary-400 font-medium">{developer.role}</p>
                      </div>
                      <div className="flex gap-3">
                        <button className="p-2 rounded-xl bg-primary-600/10 text-primary-600 dark:text-primary-400 hover:bg-primary-600/20 transition-colors">
                          <Github className="w-5 h-5" />
                        </button>
                        <button className="p-2 rounded-xl bg-primary-600/10 text-primary-600 dark:text-primary-400 hover:bg-primary-600/20 transition-colors">
                          <Linkedin className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      {developer.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-primary-600/10 text-primary-600 dark:text-primary-400 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-gray-50 dark:bg-dark-200 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 mb-1">
                      <Star className="w-5 h-5" />
                      <span className="font-medium">Rating</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{developer.rating}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-dark-200 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 mb-1">
                      <Clock className="w-5 h-5" />
                      <span className="font-medium">Rate</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">${developer.rate}/hr</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-dark-200 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 mb-1">
                      <Video className="w-5 h-5" />
                      <span className="font-medium">Sessions</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">124</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-dark-200 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 mb-1">
                      <MessageSquare className="w-5 h-5" />
                      <span className="font-medium">Reviews</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">48</p>
                  </div>
                </div>

                {/* About Section */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">About</h3>
                  <p className="text-gray-600 dark:text-primary-100 leading-relaxed">
                    Senior developer with 8+ years of experience in full-stack development. Specialized in building scalable web applications using modern technologies. Passionate about clean code, performance optimization, and mentoring junior developers. Regular contributor to open-source projects and speaker at tech conferences.
                  </p>
                </div>

                {/* Availability Calendar */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Availability</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {availability.map(({ day, slots }) => (
                      <div key={day} className="bg-gray-50 dark:bg-dark-200 p-4 rounded-xl">
                        <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">{day}</p>
                        <div className="space-y-2">
                          {slots.map((slot) => (
                            <button
                              key={slot}
                              className="w-full px-3 py-1 text-sm bg-white dark:bg-dark-100 text-gray-900 dark:text-white rounded-lg hover:bg-primary-600/10 dark:hover:bg-primary-600/20 transition-colors"
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reviews Section */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Reviews</h3>
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="bg-gray-50 dark:bg-dark-200 p-4 rounded-xl">
                        <div className="flex items-start gap-4">
                          <img
                            src={review.avatar}
                            alt={review.author}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-medium text-gray-900 dark:text-white">{review.author}</h4>
                              <span className="text-sm text-gray-500 dark:text-primary-100">{review.date}</span>
                            </div>
                            <div className="flex items-center gap-1 mb-2">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                              ))}
                            </div>
                            <p className="text-gray-600 dark:text-primary-100">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-xl hover:bg-primary-700 transition-colors flex items-center justify-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>Book a Session</span>
                  </button>
                  <button className="flex-1 border-2 border-primary-600 text-primary-600 dark:text-primary-400 px-6 py-3 rounded-xl hover:bg-primary-600/10 transition-colors flex items-center justify-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    <span>Send Message</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};