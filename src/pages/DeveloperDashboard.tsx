import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Video,
  Clock,
  DollarSign,
  Calendar,
  Star,
  Wallet,
  TrendingUp,
  Users,
  MessageSquare,
  Bell,
  ChevronRight,
  ArrowUpRight,
  CheckCircle2,
  Timer,
  Shield,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const DeveloperDashboard = () => {
  const [activeNotifications, setActiveNotifications] = useState(3);
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');
  const [upcomingSessions, setUpcomingSessions] = useState([]);

  const { getProfile } = useAuth();

  useEffect(() => {
    const fetchUpcomingSessions = async () => {
      try {
        const data = await getProfile();

        const response = await fetch(
          `http://localhost:5000/api/meetings/${data._id}/upcoming`
        );

        if (response.ok) {
          const data = await response.json();
          setUpcomingSessions(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch upcoming sessions:', error);
      }
    };

    fetchUpcomingSessions();
  }, []);

  console.log(upcomingSessions);  

  const recentReviews = [
    {
      id: 1,
      customer: 'Michael Scott',
      rating: 5,
      comment: 'Excellent session! Very helpful and knowledgeable.',
      date: '2024-03-10',
      skills: ['React', 'Performance'],
      reply:
        'Thank you for the kind words! Looking forward to our next session.',
    },
    {
      id: 2,
      customer: 'Lisa Chen',
      rating: 4,
      comment: 'Great communication and problem-solving skills.',
      date: '2024-03-08',
      skills: ['Node.js', 'API Design'],
      reply: null,
    },
  ];

  const earnings = {
    total: 2880,
    pending: 450,
    monthly: 1200,
    trend: '+15%',
    transactions: [
      {
        id: 1,
        amount: 240,
        status: 'completed',
        date: '2024-03-10',
        customer: 'John Doe',
      },
      {
        id: 2,
        amount: 120,
        status: 'pending',
        date: '2024-03-09',
        customer: 'Alice Smith',
      },
    ],
  };

  const skillStats = [
    { name: 'React', sessions: 15, rating: 4.9 },
    { name: 'Node.js', sessions: 12, rating: 4.8 },
    { name: 'TypeScript', sessions: 8, rating: 4.7 },
  ];

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-dark-200">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              icon: Video,
              label: 'Upcoming Sessions',
              value: '3',
              trend: '+2 this week',
              color: 'blue',
            },
            {
              icon: Clock,
              label: 'Hours Completed',
              value: '24',
              trend: '85% completion rate',
              color: 'green',
            },
            {
              icon: DollarSign,
              label: 'Total Earnings',
              value: '$2,880',
              trend: earnings.trend,
              color: 'purple',
            },
            {
              icon: Star,
              label: 'Average Rating',
              value: '4.9',
              trend: 'Top 5% of developers',
              color: 'yellow',
            },
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
            {/* Earnings Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-dark-100 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-primary-600/20"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Earnings Overview
                </h2>
                <div className="flex gap-2">
                  {['week', 'month', 'year'].map((timeframe) => (
                    <button
                      key={timeframe}
                      onClick={() => setSelectedTimeframe(timeframe)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        selectedTimeframe === timeframe
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 dark:bg-dark-200 text-gray-600 dark:text-primary-100 hover:bg-primary-600/10'
                      }`}
                    >
                      {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="h-64 bg-gray-50 dark:bg-dark-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 dark:text-primary-100">
                  Earnings chart will be displayed here
                </p>
              </div>
            </motion.div>

            {/* Upcoming Sessions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-dark-100 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-primary-600/20"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Upcoming Sessions
                  </h2>
                  <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 text-sm font-medium">
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div
                      key={session._id}
                      className="bg-gray-50 dark:bg-dark-200 rounded-xl p-4 border border-gray-200 dark:border-primary-600/20"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary-600/10 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              {session.bookingId.customer.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-primary-100">
                              {session.bookingId.topic}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            session.status === 'scheduled'
                              ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                              : 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400'
                          }`}
                        >
                          {session.status.charAt(0).toUpperCase() +
                            session.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-primary-100">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(session.startTime).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-primary-100">
                          <Clock className="w-4 h-4" />
                          <span>
                            {new Date(session.startTime).toLocaleTimeString(
                              [],
                              {
                                hour: '2-digit',
                                minute: '2-digit',
                              }
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-primary-100">
                          <Timer className="w-4 h-4" />
                          <span>{session.duration} hour(s)</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                          ${session.bookingId.totalAmount}
                        </span>
                        <div className="flex gap-2">
                          <button className="px-4 py-2 bg-gray-100 dark:bg-dark-100 text-gray-700 dark:text-primary-100 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-dark-200 transition-colors">
                            View Details
                          </button>
                          {new Date(session.startTime).getTime() -
                            new Date().getTime() <=
                            300000 && (
                            <a
                              href={`/meeting/${session._id}`}
                              className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors flex items-center gap-1"
                            >
                              Join Meeting
                              <ArrowUpRight className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* Wallet Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl shadow-lg p-6 text-white"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Wallet className="w-6 h-6" />
                  <h3 className="text-lg font-semibold">Wallet Balance</h3>
                </div>
                <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </div>
              <p className="text-3xl font-bold mb-2">${earnings.total}</p>
              <div className="flex items-center gap-2 text-primary-100">
                <span className="text-sm">Pending: ${earnings.pending}</span>
                <span className="text-sm">•</span>
                <span className="text-sm">
                  Available: ${earnings.total - earnings.pending}
                </span>
              </div>
              <button className="w-full mt-4 py-2 bg-white text-primary-600 rounded-lg font-medium hover:bg-white/90 transition-colors">
                Withdraw Funds
              </button>
            </motion.div>

            {/* Recent Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-dark-100 rounded-xl shadow-sm border border-gray-200 dark:border-primary-600/20"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Recent Reviews
                  </h2>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="font-medium">4.9</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {recentReviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-gray-50 dark:bg-dark-200 rounded-xl p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-primary-600/10 rounded-full flex items-center justify-center">
                            <Users className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                          </div>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {review.customer}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-medium text-gray-900 dark:text-white">
                            {review.rating}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-primary-100 text-sm mb-2">
                        {review.comment}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {review.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-primary-600/10 text-primary-600 dark:text-primary-400 rounded-lg text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      {review.reply ? (
                        <div className="bg-white dark:bg-dark-100 rounded-lg p-3 mt-2 text-sm">
                          <p className="text-gray-600 dark:text-primary-100">
                            {review.reply}
                          </p>
                        </div>
                      ) : (
                        <button className="text-primary-600 dark:text-primary-400 text-sm font-medium hover:text-primary-700 transition-colors">
                          Reply to review
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Skill Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-dark-100 rounded-xl shadow-sm border border-gray-200 dark:border-primary-600/20"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Skill Performance
                </h2>
                <div className="space-y-4">
                  {skillStats.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {skill.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600 dark:text-primary-100">
                            {skill.sessions} sessions
                          </span>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {skill.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-100 dark:bg-dark-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary-600 rounded-full"
                          style={{ width: `${(skill.sessions / 15) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
