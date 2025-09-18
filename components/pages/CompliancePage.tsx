import React, { useState } from 'react';
import { DocumentDuplicateIcon, ShieldCheckIcon } from '../icons';

const CompliancePage: React.FC = () => {
    const [agreed, setAgreed] = useState(false);
    
  return (
    <div>
        <div className="flex items-center mb-8">
            <ShieldCheckIcon className="w-10 h-10 mr-4 text-moriah-green-600" />
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">Handbook & Compliance</h2>
        </div>
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Real Estate Service Act (RESA) Compliance</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          All agents must adhere to the rules and regulations outlined in the handbook and by RESA. Key points are summarized below. For the full document, please visit the Handbook page.
        </p>
        
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p><strong>1. Publishing Rules:</strong> Do not post lot plans or specific pricing publicly. All marketing materials must use approved templates and include the official disclaimer.</p>
            <p><strong>2. Disclaimer:</strong> All posts must include the text: "I am a Marketing Associate of Mount Moriah, not yet a licensed broker."</p>
            <p><strong>3. Client Ownership:</strong> First agent to secure a site tripping with photo proof of client intake and departure gains ownership. All leads must be logged.</p>
        </div>
        
         <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="flex items-start">
                <div className="flex items-center h-5">
                    <input
                        id="compliance-agree"
                        name="compliance-agree"
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="focus:ring-moriah-green-500 h-4 w-4 text-moriah-green-600 border-gray-300 rounded"
                    />
                </div>
                <div className="ml-3 text-sm">
                    <label htmlFor="compliance-agree" className="font-medium text-gray-700 dark:text-gray-200">
                        I have read and agree to the Mount Moriah Code of Conduct and Compliance Rules.
                    </label>
                    <p className="text-gray-500 dark:text-gray-400">Last acknowledged: Never (This will be timestamped upon check)</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CompliancePage;
