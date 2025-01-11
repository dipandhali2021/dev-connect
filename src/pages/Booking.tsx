import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  DollarSign,
  Video,
  Shield,
  ChevronRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BookingProps {
  developer?: {
    id: number;
    name: string;
    rate: number;
    image: string;
  };
}

export const Booking = ({
  developer = {
    id: 1,
    name: 'Sarah Chen',
    rate: 120,
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  },
}: BookingProps) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [duration, setDuration] = useState(1);
  const [step, setStep] = useState(1);

  const totalCost = developer.rate * duration;

  const handleConfirmBooking = () => {
    setStep(2);
    // In a real app, we would make an API call here
    setTimeout(() => {
      setStep(3);
    }, 2000);
  };

  const timeSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
  ];

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-dark-200">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="booking-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white dark:bg-dark-100 rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-4 mb-8">
                  <img
                    src={developer.image}
                    alt={developer.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Book a Session with {developer.name}
                    </h2>
                    <p className="text-gray-600 dark:text-primary-100">
                      ${developer.rate}/hour
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Date Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-primary-100 mb-2">
                      Select Date
                    </label>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                      {[...Array(6)].map((_, i) => {
                        const date = new Date();
                        date.setDate(date.getDate() + i);
                        return (
                          <button
                            key={i}
                            onClick={() => setSelectedDate(date)}
                            className={`p-3 rounded-xl text-center transition-colors ${
                              selectedDate.toDateString() ===
                              date.toDateString()
                                ? 'bg-primary-600 text-white'
                                : 'bg-gray-50 dark:bg-dark-200 text-gray-900 dark:text-white hover:bg-primary-600/10'
                            }`}
                          >
                            <div className="text-sm font-medium">
                              {date.toLocaleDateString('en-US', {
                                weekday: 'short',
                              })}
                            </div>
                            <div className="text-lg font-semibold">
                              {date.getDate()}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-primary-100 mb-2">
                      Select Time
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          className="p-3 rounded-xl text-center bg-gray-50 dark:bg-dark-200 text-gray-900 dark:text-white hover:bg-primary-600/10 transition-colors"
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Duration Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-primary-100 mb-2">
                      Session Duration
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setDuration(Math.max(1, duration - 1))}
                        className="p-2 rounded-lg bg-gray-50 dark:bg-dark-200 text-gray-900 dark:text-white hover:bg-primary-600/10 transition-colors"
                      >
                        -
                      </button>
                      <span className="text-xl font-semibold text-gray-900 dark:text-white">
                        {duration} hour{duration > 1 ? 's' : ''}
                      </span>
                      <button
                        onClick={() => setDuration(Math.min(4, duration + 1))}
                        className="p-2 rounded-lg bg-gray-50 dark:bg-dark-200 text-gray-900 dark:text-white hover:bg-primary-600/10 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Cost Summary */}
                  <div className="bg-gray-50 dark:bg-dark-200 p-6 rounded-xl">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-600 dark:text-primary-100">
                        Hourly Rate
                      </span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        ${developer.rate}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-600 dark:text-primary-100">
                        Duration
                      </span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {duration} hours
                      </span>
                    </div>
                    <div className="border-t border-gray-200 dark:border-primary-600/20 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">
                          Total Cost
                        </span>
                        <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                          ${totalCost}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Disclaimer */}
                  <div className="bg-primary-600/10 p-4 rounded-xl flex items-start gap-3">
                    <Shield className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-primary-600 dark:text-primary-400">
                      Your payment will be held securely in escrow until the
                      session is complete. You'll receive a full refund if the
                      developer doesn't show up or if technical issues prevent
                      the session.
                    </p>
                  </div>

                  <button
                    onClick={handleConfirmBooking}
                    className="w-full bg-primary-600 text-white py-4 rounded-xl hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Confirm Booking</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-dark-100 p-8 rounded-2xl shadow-xl text-center"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Processing Payment
                </h2>
                <p className="text-gray-600 dark:text-primary-100">
                  Please wait while we secure your booking...
                </p>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-dark-100 p-8 rounded-2xl shadow-xl"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video className="w-8 h-8 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Booking Confirmed!
                </h2>
                <p className="text-gray-600 dark:text-primary-100">
                  Your session has been scheduled successfully.
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-dark-200 p-6 rounded-xl space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-primary-100">
                        Date & Time
                      </p>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {selectedDate.toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-primary-100">
                        Duration
                      </p>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {duration} hour{duration > 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-primary-100">
                        Total Cost
                      </p>
                      <p className="text-gray-900 dark:text-white font-medium">
                        ${totalCost}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-primary-600/10 p-4 rounded-xl">
                  <p className="text-sm text-primary-600 dark:text-primary-400">
                    <span className="font-medium">Meeting Link:</span>{' '}
                    <a
                      href="https://meet.devconnect.com/sarah-chen-123"
                      className="underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://meet.devconnect.com/sarah-chen-123
                    </a>
                  </p>
                </div>

                <button
                  onClick={() => navigate('/customer/dashboard')}
                  className="w-full bg-primary-600 text-white py-4 rounded-xl hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
                >
                  <span>Go to Dashboard</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
