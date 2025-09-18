import React from 'react';
import { MegaphoneIcon } from '../icons';

const AnnouncementCard = ({ title, date, children }: { title: string, date: string, children: React.ReactNode }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center mb-4">
            <MegaphoneIcon className="w-6 h-6 mr-3 text-moriah-green-500" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{date}</p>
        <div className="text-gray-700 dark:text-gray-300 space-y-2">
            {children}
        </div>
    </div>
)

const AnnouncementsPage: React.FC = () => {
  return (
    <div>
      <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-8">Announcements & Memos</h2>
      
      <AnnouncementCard title="Q3 Promotion Cycle Now Open" date="August 1, 2025">
        <p>Agents who have met the criteria for promotion can now submit their applications. Please coordinate with your BMM for verification.</p>
      </AnnouncementCard>
      
      <AnnouncementCard title="New Marketing Materials Available" date="July 28, 2025">
        <p>We've uploaded new video tutorials and social media templates to the Agent Resources module. Please check them out to boost your marketing efforts!</p>
      </AnnouncementCard>
      
      <AnnouncementCard title="Mandatory RESA Compliance Training" date="July 15, 2025">
        <p>All agents are required to attend the upcoming RESA Compliance seminar on August 15. Attendance will be logged.</p>
      </AnnouncementCard>
    </div>
  );
};

export default AnnouncementsPage;
