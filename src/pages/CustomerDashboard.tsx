import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Video,
  Clock,
  DollarSign,
  Calendar,
  Star,
  Bell,
  MessageSquare,
  ArrowUpRight,
  Timer,
  Shield,
  Users,
  Filter,
  ChevronRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const CustomerDashboard = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');

  const upcomingSessions = [
    {
      id: 1,
      developer: {
        name: "Sarah Chen",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
        rating: 4.9
      },
      date: "2024-03-15",
      time: "10:00 AM",
      duration: 2,
      rate: 120,
      topic: "React Performance Optimization",
      meetingLink: "https://meet.devconnect.com/session-123",
      timeToSession: "2 days 4 hours",
      status: "confirmed",
      preparationChecklist: [
        { id: 1, task: "Share codebase access", completed: true },
        { id: 2, task: "List specific performance issues", completed: false },
        { id: 3, task: "Prepare test environment", completed: false }
      ]
    }
  ];

  const pastSessions = [
    {
      id: 1,
      developer: {
        name: "Alex Rodriguez",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        rating: 4.8
      },
      date: "2024-03-10",
      duration: 1,
      rate: 150,
      topic: "API Architecture Review",
      status: "completed",
      feedback: {
        rating: 5,
        comment: "Alex provided excellent insights on optimizing our API structure. Very knowledgeable!"
      }
    },
    {
      id: 2,
      developer: {
        name: "Emily Johnson",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
        rating: 4.7
      },
      date: "2024-03-08",
      duration: 2,
      rate: 100,
      topic: "UI/UX Implementation",
      status: "completed",
      feedback: null
    }
  ];

  const notifications = [
    {
      id: 1,
      type: "reminder",
      message: "Upcoming session with Sarah Chen in 2 days",
      time: "1 hour ago"
    },
    {
      id: 2,
      type: "system",
      message: "Your last session recording is now available",
      time: "3 hours ago"
    }
  ];

  const stats = {
    totalSpent: 650,
    totalHours: 5,
    averageRating: 4.8,
    completedSessions: 8
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-dark-200">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-6 md:p-8 mb-8 text-white"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back!</h1>
              <p className="text-primary-100">Your next session is scheduled in 2 days</p>
            </div>
            <div className="flex gap-4">
              <button className="px-4 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors flex items-center gap-2">
                <Video className="w-5 h-5" />
                <span>Quick Session</span>
              </button>
              <button className="px-4 py-2 bg-white text-primary-600 rounded-xl hover:bg-white/90 transition-colors flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>Find Developer</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {[
            {
              icon: Video,
              label: "Upcoming Sessions",
              value: "1",
              trend: "Next: In 2 days",
              color: "blue"
            },
            {
              icon: Clock,
              label: "Total Hours",
              value: stats.totalHours.toString(),
              trend: "+2 this month",
              color: "green"
            },
            {
              icon: DollarSign,
              label: "Total Spent",
              value: `$${stats.totalSpent}`,
              trend: "Under budget",
              color: "purple"
            },
            {
              icon: Star,
              label: "Avg. Session Rating",
              value: stats.averageRating.toString(),
              trend: "Excellent",
              color: "yellow"
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-dark-100 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-primary-600/20 hover:border-primary-600/50 dark:hover:border-primary-600/50 transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`bg-${stat.color}-500/10 p-3 rounded-lg`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}-500`} />
                  </div>
                  <span className="text-xs font-medium text-gray-500 dark:text-primary-100/70">
                    {stat.trend}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </h3>
                <p className="text-sm text-gray-600 dark:text-primary-100">
                  {stat.label}
                </p>
              </div>
              <div className={`h-1 bg-${stat.color}-500 w-full`} />
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Sessions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-dark-100 rounded-xl shadow-sm border border-gray-200 dark:border-primary-600/20"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Upcoming Sessions
                  </h2>
                  <div className="flex items-center gap-2">
                    <button className="p-2 bg-gray-100 dark:bg-dark-200 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-300 transition-colors">
                      <Filter className="w-5 h-5 text-gray-600 dark:text-primary-100" />
                    </button>
                    <button className="p-2 bg-gray-100 dark:bg-dark-200 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-300 transition-colors relative">
                      <Bell className="w-5 h-5 text-gray-600 dark:text-primary-100" />
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        2
                      </span>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div
                      key={session.id}
                      className="bg-gray-50 dark:bg-dark-200 rounded-xl p-4 border border-gray-200 dark:border-primary-600/20"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={session.developer.image}
                            alt={session.developer.name}
                            className="w-12 h-12 rounded-xl object-cover"
                          />
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              {session.developer.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-primary-100">
                              {session.topic}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-medium text-gray-900 dark:text-white">
                            {session.developer.rating}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-primary-100">
                          <Calendar className="w-4 h-4" />
                          <span>{session.date}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-primary-100">
                          <Clock className="w-4 h-4" />
                          <span>{session.time}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-primary-100">
                          <Timer className="w-4 h-4" />
                          <span>In {session.timeToSession}</span>
                        </div>
                      </div>

                      {/* Preparation Checklist */}
                      <div className="bg-white dark:bg-dark-100 rounded-lg p-4 mb-4">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                          Session Preparation
                        </h4>
                        <div className="space-y-2">
                          {session.preparationChecklist.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-2 text-sm"
                            >
                              <div
                                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                                  item.completed
                                    ? 'bg-green-500/10 text-green-500'
                                    : 'bg-gray-100 dark:bg-dark-200 text-gray-400'
                                }`}
                              >
                                <CheckCircle2 className="w-4 h-4" />
                              </div>
                              <span
                                className={`${
                                  item.completed
                                    ? 'text-gray-600 dark:text-primary-100 line-through'
                                    : 'text-gray-900 dark:text-white'
                                }`}
                              >
                                {item.task}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                          ${session.rate * session.duration}
                        </span>
                        <div className="flex gap-2">
                          <button className="px-4 py-2 bg-gray-100 dark:bg-dark-100 text-gray-700 dark:text-primary-100 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-dark-200 transition-colors">
                            Reschedule
                          </button>
                          <a
                            href={session.meetingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors flex items-center gap-1"
                          >
                            Join Meeting
                            <ArrowUpRight className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Past Sessions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-dark-100 rounded-xl shadow-sm border border-gray-200 dark:border-primary-600/20"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Past Sessions
                </h2>
                <div className="space-y-4">
                  {pastSessions.map((session) => (
                    <div
                      key={session.id}
                      className="bg-gray-50 dark:bg-dark-200 rounded-xl p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={session.developer.image}
                            alt={session.developer.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              {session.developer.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-primary-100">
                              {session.topic}
                            </p>
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-sm font-medium">
                          Completed
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-primary-100">
                          <Calendar className="w-4 h-4" />
                          <span>{session.date}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-primary-100">
                          <Clock className="w-4 h-4" />
                          <span>{session.duration}hr</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-primary-100">
                          <DollarSign className="w-4 h-4" />
                          <span>${session.rate * session.duration}</span>
                        </div>
                      </div>
                      {session.feedback ? (
                        <div className="bg-white dark:bg-dark-100 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="font-medium text-gray-900 dark:text-white">
                              {session.feedback.rating}/5
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-primary-100">
                            {session.feedback.comment}
                          </p>
                        </div>
                      ) : (
                        <button className="text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline">
                          Leave Feedback
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* Session Summary Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl shadow-lg p-6 text-white"
            >
              <h3 className="text-lg font-semibold mb-4">Session Summary</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-primary-100">Total Sessions</span>
                  <span className="font-semibold">{stats.completedSessions}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-primary-100">Hours Spent</span>
                  <span className="font-semibold">{stats.totalHours}h</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-primary-100">Avg. Rating Given</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-semibold">{stats.averageRating}</span>
                  </div>
                </div>
                <div className="h-[1px] bg-white/20" />
                <div className="flex items-center justify-between">
                  <span className="text-primary-100">Total Investment</span>
                  <span className="font-semibold">${stats.totalSpent}</span>
                </div>
              </div>
            </motion.div>

            {/* Notifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-dark-100 rounded-xl shadow-sm border border-gray-200 dark:border-primary-600/20"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Notifications
                  </h2>
                  <div className="relative">
                    <button
                      onClick={() => setShowNotifications(!showNotifications)}
                      className="p-2 bg-gray-100 dark:bg-dark-200 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-300 transition-colors relative"
                    >
                      <Bell className="w-5 h-5 text-gray-600 dark:text-primary-100" />
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        2
                      </span>
                    </button>
                  </div>
                </div>
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-3"
                    >
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="bg-gray-50 dark:bg-dark-200 p-3 rounded-lg"
                        >
                          <p className="text-sm text-gray-900 dark:text-white mb-1">
                            {notification.message}
                          </p>
                          <span className="text-xs text-gray-500 dark:text-primary-100/70">
                            {notification.time}
                          </span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-dark-100 rounded-xl shadow-sm border border-gray-200 dark:border-primary-600/20"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Quick Actions
                </h2>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-200 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-300 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary-600/10 rounded-lg flex items-center justify-center">
                        <Users className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        Browse Developers
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-200 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-300 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary-600/10 rounded-lg flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        Support Chat
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-200 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-300 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary-600/10 rounded-lg flex items-center justify-center">
                        <Shield className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        Security Settings
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};