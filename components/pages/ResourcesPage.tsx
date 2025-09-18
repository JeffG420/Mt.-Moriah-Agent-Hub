import React, { useState } from 'react';
import { BookOpenIcon } from '../icons';

const TABS = ["Lot Plans", "Marketing Kits", "Video Tutorials", "Legal Docs"];

const ResourceItem = ({ name }: { name: string }) => (
    <div className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
        <p className="text-gray-800 dark:text-gray-300">{name}</p>
        <button className="text-sm font-medium text-moriah-green-600 hover:text-moriah-green-800 dark:text-moriah-green-400 dark:hover:text-moriah-green-200">
            Download
        </button>
    </div>
);

const ResourcesPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState(TABS[0]);

    const renderContent = () => {
        switch (activeTab) {
            case "Lot Plans":
                return <div className="space-y-3">
                    <ResourceItem name="Phase 1 - Updated Lot Plan.pdf" />
                    <ResourceItem name="Phase 2A - Commercial Area.pdf" />
                    <ResourceItem name="Complete Project Map.jpg" />
                </div>;
            case "Marketing Kits":
                 return <div className="space-y-3">
                    <ResourceItem name="Social Media Templates - August 2025.zip" />
                    <ResourceItem name="Official Company Tarpaulin Design.psd" />
                    <ResourceItem name="Agent Business Card Template.ai" />
                </div>;
            case "Video Tutorials":
                return <div className="space-y-3">
                    <ResourceItem name="How to Use the Agent Hub.mp4" />
                    <ResourceItem name="Sales Submission Guide.mp4" />
                </div>;
            case "Legal Docs":
                return <div className="space-y-3">
                    <ResourceItem name="Sample Contract to Sell.docx" />
                    <ResourceItem name="Reservation Agreement Form.pdf" />
                </div>;
            default:
                return null;
        }
    }

  return (
    <div>
        <div className="flex items-center mb-8">
            <BookOpenIcon className="w-10 h-10 mr-4 text-moriah-green-600" />
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">Agent Resources</h2>
        </div>
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Downloadable Materials</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Find all necessary documents, marketing materials, and tutorials here.
        </p>
         <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
             <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                 {TABS.map(tab => (
                     <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`${
                            activeTab === tab 
                                ? 'border-moriah-green-500 text-moriah-green-600' 
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
                     >
                        {tab}
                     </button>
                 ))}
             </nav>
         </div>

         <div className="mt-6">
             {renderContent()}
         </div>
      </div>
    </div>
  );
};

export default ResourcesPage;
