import React from 'react';
import { TrophyIcon } from '../icons';

interface LeaderboardItemProps {
  rank: number;
  name: string;
  team: string;
  sales: number;
  color: string;
}

const LeaderboardItem: React.FC<LeaderboardItemProps> = ({ rank, name, team, sales, color }) => (
  <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-3">
    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${color} text-white font-bold text-lg mr-4`}>
        {rank}
    </div>
    <div className="flex-grow">
        <p className="font-semibold text-gray-900 dark:text-white">{name}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{team}</p>
    </div>
    <div className="text-right">
        <p className="font-bold text-lg text-moriah-green-600 dark:text-moriah-green-400">{sales}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">Lots Sold</p>
    </div>
  </div>
);

const LeaderboardPage: React.FC = () => {
  const leaders = [
    { rank: 1, name: 'Moises Buyagawan', team: 'Team Alpha', sales: 12, color: 'bg-yellow-500' },
    { rank: 2, name: 'Jeff Ryan Galera', team: 'Team Bravo', sales: 10, color: 'bg-gray-400' },
    { rank: 3, name: 'Angelyn Real', team: 'Team Charlie', sales: 9, color: 'bg-yellow-700' },
    { rank: 4, name: 'Aldrick Sagyawan', team: 'Team Alpha', sales: 7, color: 'bg-moriah-green-600' },
    { rank: 5, name: 'Aldrin Lozano', team: 'Team Bravo', sales: 5, color: 'bg-moriah-green-600' },
  ];

  return (
    <div>
        <div className="flex items-center mb-8">
            <TrophyIcon className="w-10 h-10 mr-4 text-yellow-500" />
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">Agent Leaderboard</h2>
        </div>
        
        <div className="bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-moriah-green-800 dark:text-moriah-green-400 mb-2">Top Agents of the Month</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Based on total lots sold. Rankings are updated at the end of each month.</p>
            <div>
            {leaders.map(leader => <LeaderboardItem key={leader.rank} {...leader} />)}
            </div>
        </div>
    </div>
  );
};

export default LeaderboardPage;
