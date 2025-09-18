import React from 'react';
import Card from '../common/Card';
import { ChartBarIcon } from '../icons';

const PerformanceReportsPage: React.FC = () => {
    return (
        <div>
            <div className="flex items-center mb-8">
                <ChartBarIcon className="w-10 h-10 mr-4 text-moriah-green-600" />
                <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">Performance Reports</h2>
            </div>
            <Card title="Analytics Dashboard" description="Visualize team and individual performance metrics.">
                <div className="h-96 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-md">
                    <p className="text-gray-500">Performance charts and data visualizations will be displayed here.</p>
                </div>
            </Card>
        </div>
    );
};

export default PerformanceReportsPage;
