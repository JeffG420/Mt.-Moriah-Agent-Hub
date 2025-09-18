import React from 'react';
import Card from '../common/Card';
import { BanknotesIcon, ChartBarIcon } from '../icons';
import { commissions } from '../../data/mockData';

const CommissionDashboardPage: React.FC = () => {
  const totalCommission = commissions.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div>
      <div className="flex items-center mb-8">
        <BanknotesIcon className="w-10 h-10 mr-4 text-moriah-green-600" />
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">Commission Dashboard</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <Card title="Recent Commissions" description="Your latest validated commission entries.">
                 <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Client</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Lot Code</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount (PHP)</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                           {commissions.map((c) => (
                               <tr key={c.id}>
                                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{new Date(c.date).toLocaleDateString()}</td>
                                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{c.clientName}</td>
                                   <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">{c.lotCode}</td>
                                   <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-moriah-green-600 dark:text-moriah-green-400 font-semibold">
                                       {c.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                   </td>
                                   <td className="px-6 py-4 whitespace-nowrap text-center">
                                       <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${c.type === 'Direct' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                           {c.type}
                                       </span>
                                   </td>
                               </tr>
                           ))}
                        </tbody>
                    </table>
                 </div>
            </Card>
        </div>
        <div className="lg:col-span-1 space-y-8">
            <Card title="Total Earnings (YTD)">
                <p className="text-4xl font-bold text-moriah-green-600 dark:text-moriah-green-400">
                   ₱{totalCommission.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
                 <p className="text-gray-500 dark:text-gray-400">
                    Total commissions earned this year.
                </p>
            </Card>
             <Card title="Earnings Chart" icon={<ChartBarIcon />}>
                <div className="h-48 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-md">
                    <p className="text-gray-500">Chart coming soon</p>
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default CommissionDashboardPage;
