import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  Github,
  Linkedin,
  Globe,
  Edit2,
  Plus,
  Trash2,
  Save,
  X,
  Calendar,
  DollarSign,
  Star,
  Clock,
  Shield,
  Upload,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Profile = () => {
  const { user, getProfile, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    skills: [] as string[],
    hourlyRate: 0,
    githubUrl: '',
    linkedinUrl: '',
    websiteUrl: '',
    availability: {
      monday: [] as string[],
      tuesday: [] as string[],
      wednesday: [] as string[],
      thursday: [] as string[],
      friday: [] as string[],
    },
  });
  console.log(profileData);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        console.log(data);
        setProfileData({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          bio: data.bio || '',
          skills: data.skills || [],
          hourlyRate: data.hourlyRate || 0,
          githubUrl: data.githubUrl || '',
          linkedinUrl: data.linkedinUrl || '',
          websiteUrl: data.websiteUrl || '',
          availability: data.availability || {
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
          },
        });
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user, getProfile]);

  const handleSave = async () => {
    try {
      await updateProfile(profileData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save profile:', error);
    }
  };

  const handleAddSkill = () => {
    const skill = prompt('Enter new skill:');
    if (skill) {
      setProfileData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setProfileData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16 bg-gray-50 dark:bg-dark-200 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-dark-200">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Profile Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-dark-100 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-primary-600/20"
            >
              <div className="h-32 bg-gradient-to-r from-primary-600 to-primary-800" />
              <div className="px-6 pb-6">
                <div className="relative flex items-end -mt-16 mb-4">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-xl bg-white dark:bg-dark-100 p-2">
                      <div className="w-full h-full bg-gray-100 dark:bg-dark-200 rounded-lg flex items-center justify-center">
                        <User className="w-12 h-12 text-gray-400 dark:text-primary-100/50" />
                      </div>
                    </div>
                    <button className="absolute bottom-2 right-2 p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                      <Upload className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex-1 ml-6 flex justify-between items-center">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {profileData.name}
                      </h1>
                      <p className="text-gray-600 dark:text-primary-100">
                        {user?.role.charAt(0).toUpperCase() +
                          user?.role.slice(1)}
                      </p>
                    </div>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
                    >
                      {isEditing ? (
                        <>
                          <Save className="w-4 h-4" />
                          <span>Save Changes</span>
                        </>
                      ) : (
                        <>
                          <Edit2 className="w-4 h-4" />
                          <span>Edit Profile</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-primary-100">
                      <Mail className="w-4 h-4" />
                      <span>{profileData.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-primary-100">
                      <Phone className="w-4 h-4" />
                      <span>{profileData.phone}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <a
                      href={profileData.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 dark:bg-dark-200 text-gray-600 dark:text-primary-100 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-300 transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href={profileData.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 dark:bg-dark-200 text-gray-600 dark:text-primary-100 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-300 transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href={profileData.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 dark:bg-dark-200 text-gray-600 dark:text-primary-100 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-300 transition-colors"
                    >
                      <Globe className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Bio */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    About
                  </h2>
                  {isEditing ? (
                    <textarea
                      value={profileData.bio}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          bio: e.target.value,
                        }))
                      }
                      className="w-full h-32 bg-gray-50 dark:bg-dark-200 border border-gray-300 dark:border-primary-600/30 rounded-lg p-3 text-gray-900 dark:text-white focus:outline-none focus:border-primary-600 transition-colors"
                    />
                  ) : (
                    <p className="text-gray-600 dark:text-primary-100">
                      {profileData.bio}
                    </p>
                  )}
                </div>

                {/* Skills */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Skills & Expertise
                    </h2>
                    {isEditing && (
                      <button
                        onClick={handleAddSkill}
                        className="p-2 bg-primary-600/10 text-primary-600 dark:text-primary-400 rounded-lg hover:bg-primary-600/20 transition-colors"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.map((skill) => (
                      <div
                        key={skill}
                        className="px-3 py-1 bg-primary-600/10 text-primary-600 dark:text-primary-400 rounded-full text-sm flex items-center gap-2"
                      >
                        <span>{skill}</span>
                        {isEditing && (
                          <button
                            onClick={() => handleRemoveSkill(skill)}
                            className="hover:text-red-500 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Availability Calendar */}
            {user?.role === 'developer' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-dark-100 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-primary-600/20"
              >
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Availability
                  </h2>
                  <div className="grid grid-cols-5 gap-4">
                    {Object.entries(profileData.availability).map(
                      ([day, slots]) =>
                        // Check if the 'day' is not '_id'
                        day !== '_id' && (
                          <div
                            key={day}
                            className="bg-gray-50 dark:bg-dark-200 p-4 rounded-xl"
                          >
                            <p className="text-primary-600 dark:text-primary-400 font-medium mb-2 capitalize">
                              {day}
                            </p>
                            <div className="space-y-2">
                              {/* Ensure slots is an array before mapping */}
                              {Array.isArray(slots) &&
                                slots.map((slot) => (
                                  <div
                                    key={slot}
                                    className="px-3 py-1 text-sm bg-white dark:bg-dark-100 text-gray-900 dark:text-white rounded-lg"
                                  >
                                    {slot}
                                  </div>
                                ))}
                            </div>
                          </div>
                        )
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-dark-100 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-primary-600/20"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Statistics
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      icon: Star,
                      label: 'Rating',
                      value: '4.9',
                      color: 'yellow',
                    },
                    {
                      icon: Clock,
                      label: 'Hours',
                      value: '24',
                      color: 'green',
                    },
                    {
                      icon: Calendar,
                      label: 'Sessions',
                      value: '12',
                      color: 'blue',
                    },
                    {
                      icon: DollarSign,
                      label: 'Earnings',
                      value: '$2,880',
                      color: 'purple',
                    },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 bg-${stat.color}-500/10 rounded-lg flex items-center justify-center`}
                        >
                          <stat.icon
                            className={`w-5 h-5 text-${stat.color}-500`}
                          />
                        </div>
                        <span className="text-gray-600 dark:text-primary-100">
                          {stat.label}
                        </span>
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Security Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-dark-100 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-primary-600/20"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Security
                  </h2>
                  <Shield className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="space-y-4">
                  <button className="w-full text-left px-4 py-3 bg-gray-50 dark:bg-dark-200 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-300 transition-colors">
                    <p className="font-medium text-gray-900 dark:text-white mb-1">
                      Change Password
                    </p>
                    <p className="text-sm text-gray-600 dark:text-primary-100">
                      Update your account password
                    </p>
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-gray-50 dark:bg-dark-200 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-300 transition-colors">
                    <p className="font-medium text-gray-900 dark:text-white mb-1">
                      Two-Factor Auth
                    </p>
                    <p className="text-sm text-gray-600 dark:text-primary-100">
                      Add an extra layer of security
                    </p>
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
