import React from 'react';
import Card from '../common/Card';
import { AcademicCapIcon } from '../icons';

interface Module {
    id: number;
    title: string;
    description: string;
    type: 'Video' | 'PDF' | 'Quiz';
    progress: number; // 0 to 100
}

const modules: Module[] = [
    { id: 1, title: 'New Agent Orientation', description: 'Everything you need to get started with Mount Moriah.', type: 'Video', progress: 100 },
    { id: 2, title: 'Sales Process SOP', description: 'Deep dive into our standard operating procedures for sales.', type: 'PDF', progress: 75 },
    { id: 3, title: 'RESA Compliance Quiz', description: 'Test your knowledge on the Real Estate Service Act.', type: 'Quiz', progress: 0 },
    { id: 4, title: 'Advanced Closing Techniques', description: 'Learn from our top brokers on how to close more deals.', type: 'Video', progress: 20 },
    { id: 5, title: 'Recruitment & Team Building', description: 'How to grow your team and earn overrides.', type: 'PDF', progress: 0 },
];

const ModuleCard: React.FC<{ module: Module }> = ({ module }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col">
        <span className={`text-xs font-semibold px-2 py-1 rounded-full self-start ${
            module.type === 'Video' ? 'bg-red-100 text-red-800' :
            module.type === 'PDF' ? 'bg-blue-100 text-blue-800' :
            'bg-yellow-100 text-yellow-800'
        }`}>
            {module.type}
        </span>
        <h4 className="text-lg font-bold text-gray-900 dark:text-white mt-3">{module.title}</h4>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 flex-grow">{module.description}</p>
        <div className="mt-4">
            <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{module.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div 
                    className="bg-moriah-green-600 h-2.5 rounded-full" 
                    style={{ width: `${module.progress}%` }}
                ></div>
            </div>
        </div>
        <button className={`mt-6 w-full py-2 px-4 rounded-lg font-semibold transition-colors ${module.progress === 100 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-moriah-green-600 text-white hover:bg-moriah-green-700'}`}>
            {module.progress === 0 ? 'Start Module' : module.progress === 100 ? 'Completed' : 'Continue'}
        </button>
    </div>
);


const LearningHubPage: React.FC = () => {
  return (
    <div>
      <div className="flex items-center mb-8">
        <AcademicCapIcon className="w-10 h-10 mr-4 text-moriah-green-600" />
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">Learning Hub</h2>
      </div>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map(module => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
    </div>
  );
};

export default LearningHubPage;
