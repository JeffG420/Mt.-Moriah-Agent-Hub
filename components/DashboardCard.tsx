import React from 'react';

interface DashboardCardProps {
  icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 ease-in-out flex flex-col h-full p-6 cursor-pointer border border-transparent hover:border-moriah-green-500">
      <div className="flex items-center space-x-4 mb-3">
        <div className="flex-shrink-0 bg-moriah-green-100 dark:bg-moriah-green-900/50 text-moriah-green-600 dark:text-moriah-green-300 rounded-lg p-3">
          {React.cloneElement(icon, { className: "h-6 w-6" })}
        </div>
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex-grow">{title}</h4>
      </div>
      <p className="text-gray-600 dark:text-gray-400 text-sm flex-grow">
        {description}
      </p>
    </div>
  );
};

export default DashboardCard;
