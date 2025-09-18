import React, { useState, useMemo } from 'react';
import { CalendarDaysIcon, UsersIcon, MapPinIcon } from '../icons';

type ActivityType = 'All' | 'Orientation' | 'Tripping';

interface LogEntry {
  id: number;
  type: 'Orientation' | 'Tripping';
  date: string; // ISO date string
  description: string;
}

// Mock data for demonstration purposes
const mockLogs: LogEntry[] = [
  { id: 1, type: 'Orientation', date: '2025-08-15', description: 'Attended Q3 RESA Compliance Training.' },
  { id: 2, type: 'Tripping', date: '2025-08-12', description: 'Site tripping with client Mr. Reyes (Phase 1, Block 3, Lot 5).' },
  { id: 3, type: 'Tripping', date: '2025-08-10', description: 'Site tripping with client Ms. Santos (Phase 2A).' },
  { id: 4, type: 'Orientation', date: '2025-07-20', description: 'Attended New Agent Onboarding session.' },
  { id: 5, type: 'Tripping', date: '2025-07-18', description: 'Initial site visit with the Dela Cruz family.' },
  { id: 6, type: 'Orientation', date: '2025-06-05', description: 'Advanced Sales Strategy Workshop.' },
  { id: 7, type: 'Tripping', date: '2025-06-02', description: 'Follow-up tripping with Mr. Garcia.' },
];

const LogItem: React.FC<{ log: LogEntry }> = ({ log }) => {
    const isOrientation = log.type === 'Orientation';
    const Icon = isOrientation ? UsersIcon : MapPinIcon;
    const iconBgColor = isOrientation ? 'bg-blue-100 dark:bg-blue-900/50' : 'bg-purple-100 dark:bg-purple-900/50';
    const iconTextColor = isOrientation ? 'text-blue-600 dark:text-blue-300' : 'text-purple-600 dark:text-purple-300';
    
    return (
        <div className="flex items-start p-4 bg-white dark:bg-gray-800/50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className={`flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full ${iconBgColor} mr-4`}>
                <Icon className={`w-6 h-6 ${iconTextColor}`} />
            </div>
            <div className="flex-grow">
                <p className="font-semibold text-gray-900 dark:text-white">{log.description}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(log.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 ${isOrientation ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'}`}>
                    {isOrientation ? 'Orientation Attendance' : 'Client Site Tripping'}
                </span>
            </div>
        </div>
    );
};


const LogsPage: React.FC = () => {
  const [activityType, setActivityType] = useState<ActivityType>('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredLogs = useMemo(() => {
    return mockLogs.filter(log => {
      const logDate = new Date(log.date);
      
      const typeMatch = activityType === 'All' || log.type === activityType;
      
      const startDateMatch = !startDate || logDate >= new Date(startDate);
      
      const endDateMatch = !endDate || logDate <= new Date(endDate);

      return typeMatch && startDateMatch && endDateMatch;
    });
  }, [activityType, startDate, endDate]);

  return (
    <div>
      <div className="flex items-center mb-8">
        <CalendarDaysIcon className="w-10 h-10 mr-4 text-moriah-green-600" />
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">Attendance & Trippings Log</h2>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-8">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Filter Logs</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label htmlFor="activityType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Activity Type</label>
            <select
              id="activityType"
              value={activityType}
              onChange={(e) => setActivityType(e.target.value as ActivityType)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-moriah-green-500 focus:border-moriah-green-500 sm:text-sm rounded-md"
            >
              <option value="All">All Activities</option>
              <option value="Orientation">Orientation Attendance</option>
              <option value="Tripping">Client Site Tripping</option>
            </select>
          </div>
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Start Date</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-moriah-green-500 focus:border-moriah-green-500"
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">End Date</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-moriah-green-500 focus:border-moriah-green-500"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {`Showing ${filteredLogs.length} Log(s)`}
        </h3>
        {filteredLogs.length > 0 ? (
          <div className="space-y-4">
            {filteredLogs.map(log => <LogItem key={log.id} log={log} />)}
          </div>
        ) : (
          <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <p className="text-gray-500 dark:text-gray-400">No logs found for the selected filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogsPage;
