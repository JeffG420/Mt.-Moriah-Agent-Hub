import React from 'react';
import { ChartBarIcon } from '../icons';
import { useAuth } from '../../hooks/useAuth';
import { promotionCriteria } from '../../data/mockData';
import { UserRole } from '../../types';

const roleProgression: Record<string, UserRole | null> = {
    'Agent': 'Manager',
    'Manager': 'Admin', // Example progression
    'Admin': 'Superadmin',
    'Superadmin': null
}

const ProgressBar: React.FC<{ value: number; max: number; label: string }> = ({ value, max, label }) => {
    const percentage = max > 0 ? Math.min((value / max) * 100, 100) : 0;
    return (
        <div>
            <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{value} / {max}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div 
                    className="bg-moriah-green-600 h-2.5 rounded-full" 
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};

const ProgressPage: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <div>Loading user data...</div>;
  }
  
  const nextRole = roleProgression[user.role];
  const criteria = nextRole ? promotionCriteria[nextRole] : null;

  return (
    <div>
        <div className="flex items-center mb-8">
            <ChartBarIcon className="w-10 h-10 mr-4 text-moriah-green-600" />
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">Promotion Tracker</h2>
        </div>
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <div className="flex justify-between items-start">
            <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Your Career Path</h3>
                <p className="text-gray-600 dark:text-gray-400">
                    Track your performance against the requirements for your next promotion.
                </p>
            </div>
            <div className="text-right">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Current Level</p>
                <p className="text-lg font-semibold text-moriah-green-600 dark:text-moriah-green-400">{user.role}</p>
            </div>
        </div>
       
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
            {nextRole && criteria ? (
                <>
                    <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-6">
                        Requirements for <span className="text-yellow-500">{nextRole}</span>
                    </h4>
                    <div className="space-y-6">
                        {criteria.minLots && <ProgressBar label="Lots Sold" value={user.stats.lotsSold} max={criteria.minLots} />}
                        {criteria.minRecruits && <ProgressBar label="Recruits" value={user.stats.recruits} max={criteria.minRecruits} />}
                        {criteria.minSQM && <ProgressBar label="Total SQM Sold" value={user.stats.sqmSold} max={criteria.minSQM} />}
                        {criteria.minTenureMonths && <ProgressBar label="Tenure (Months)" value={user.stats.tenureMonths} max={criteria.minTenureMonths} />}
                        {criteria.minCommissionEarned && <ProgressBar label="Commission Earned (PHP)" value={user.stats.commissionEarned} max={criteria.minCommissionEarned} />}
                    </div>
                </>
            ) : (
                 <p className="text-lg font-semibold text-center text-gray-700 dark:text-gray-300">
                    You have reached the highest level in the career path!
                </p>
            )}
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
