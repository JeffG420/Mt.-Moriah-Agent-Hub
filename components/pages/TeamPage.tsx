import React, { useState, useMemo } from 'react';
import { UsersIcon } from '../icons';
import { users as allUsers } from '../../data/users';
import { User } from '../../types';

const TeamPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = useMemo(() => {
        if (!searchTerm) {
            return allUsers;
        }
        return allUsers.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.agentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

  return (
    <div>
        <div className="flex items-center mb-8">
            <UsersIcon className="w-10 h-10 mr-4 text-moriah-green-600" />
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">Team & Agent Directory</h2>
        </div>
      <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Agent Directory</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Showing {filteredUsers.length} of {allUsers.length} users.
            </p>
          </div>
          <div className="relative">
            <input 
                type="text"
                placeholder="Search by name, ID, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-72 pl-4 pr-10 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-moriah-green-500"
            />
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
        </div>
        
         <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Agent ID</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Location</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Contact</th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredUsers.map((user) => (
                        <tr key={user.agentId} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500 dark:text-gray-400">{user.agentId}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                        <img className="h-10 w-10 rounded-full" src={user.avatarUrl} alt="" />
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{user.role}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{user.location}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{user.contact}</td>
                        </tr>
                    ))}
                     {filteredUsers.length === 0 && (
                        <tr>
                            <td colSpan={5} className="text-center py-10 text-gray-500 dark:text-gray-400">
                                No users found matching "{searchTerm}".
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

export default TeamPage;
