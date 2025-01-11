import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Wallet, User, Code2, ChevronRight, Loader2 } from 'lucide-react';
import { useWeb3 } from '../contexts/Web3Context';
import { useAuth } from '../contexts/AuthContext';

type UserRole = 'developer' | 'customer';

export const Auth = () => {
  const navigate = useNavigate();
  const { connectWallet, account, isConnecting } = useWeb3();
  const { user, setUser, isAuthenticated } = useAuth();
  const [role, setRole] = useState<UserRole | null>(null);
  const [age, setAge] = useState<string>('');
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(user?.role === 'developer' ? '/developer/dashboard' : '/customer/dashboard');
    }
  }, [isAuthenticated, user, navigate]);

  const handleConnect = async () => {
    await connectWallet();
    if (account) {
      setStep(2);
    }
  };

  const handleSubmit = () => {
    if (role && age && account) {
      setUser({
        address: account,
        role: role,
        age: parseInt(age, 10)
      });
      navigate(role === 'developer' ? '/developer/dashboard' : '/customer/dashboard');
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-dark-200">
      <div className="max-w-md mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-dark-100 rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-6 md:p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {step === 1 ? 'Connect Your Wallet' : 'Complete Your Profile'}
              </h2>
              <p className="text-gray-600 dark:text-primary-100">
                {step === 1
                  ? 'Connect with MetaMask to continue'
                  : 'Choose your role and enter your age'}
              </p>
            </div>

            {step === 1 ? (
              <button
                onClick={handleConnect}
                disabled={isConnecting}
                className="w-full bg-primary-600 text-white py-4 rounded-xl hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
              >
                {isConnecting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Wallet className="w-5 h-5" />
                )}
                <span>{isConnecting ? 'Connecting...' : 'Connect MetaMask'}</span>
              </button>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-primary-100 mb-2">
                    Select Role
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setRole('developer')}
                      className={`p-4 rounded-xl border-2 transition-colors ${
                        role === 'developer'
                          ? 'border-primary-600 bg-primary-600/10'
                          : 'border-gray-200 dark:border-primary-600/20'
                      }`}
                    >
                      <Code2 className="w-6 h-6 mx-auto mb-2 text-primary-600 dark:text-primary-400" />
                      <span className="block text-sm font-medium text-gray-900 dark:text-white">
                        Developer
                      </span>
                    </button>
                    <button
                      onClick={() => setRole('customer')}
                      className={`p-4 rounded-xl border-2 transition-colors ${
                        role === 'customer'
                          ? 'border-primary-600 bg-primary-600/10'
                          : 'border-gray-200 dark:border-primary-600/20'
                      }`}
                    >
                      <User className="w-6 h-6 mx-auto mb-2 text-primary-600 dark:text-primary-400" />
                      <span className="block text-sm font-medium text-gray-900 dark:text-white">
                        Customer
                      </span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-primary-100 mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    min="18"
                    max="100"
                    className="w-full bg-gray-50 dark:bg-dark-200 border border-gray-300 dark:border-primary-600/30 text-gray-900 dark:text-white px-4 py-3 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                    placeholder="Enter your age"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!role || !age}
                  className="w-full bg-primary-600 text-white py-4 rounded-xl hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};