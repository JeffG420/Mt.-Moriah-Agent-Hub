import React from 'react';
import { UserCircleIcon } from '../icons';
import { useAuth } from '../../hooks/useAuth';

const ProfilePage: React.FC = () => {
  const { user: agentProfile } = useAuth();

  if (!agentProfile) {
    return <div>Loading profile...</div>;
  }

  return (
    <div>
      <div className="flex items-center mb-8">
        <UserCircleIcon className="w-10 h-10 mr-4 text-moriah-green-600" />
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">My Profile</h2>
      </div>
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <div className="flex flex-col md:flex-row items-center md:space-x-8">
            <div className="flex-shrink-0 mb-6 md:mb-0">
                <img 
                    className="h-32 w-32 rounded-full ring-4 ring-moriah-green-500 object-cover bg-gray-200" 
                    src={agentProfile.avatarUrl} 
                    alt="Agent Profile"
                />
            </div>
            <div className="flex-grow text-center md:text-left">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{agentProfile.name}</h3>
                <p className="text-yellow-500 dark:text-yellow-400 font-semibold">{agentProfile.role}</p>
                <p className="text-sm font-mono text-gray-500 dark:text-gray-400">{agentProfile.agentId}</p>
            </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
                <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Email address</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">{agentProfile.email}</dd>
                </div>
                <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Contact Number</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">{agentProfile.contact}</dd>
                </div>
                <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Assigned Team</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">{agentProfile.team}</dd>
                </div>
                 <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Date Joined</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">{agentProfile.joinDate}</dd>
                </div>
            </dl>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
