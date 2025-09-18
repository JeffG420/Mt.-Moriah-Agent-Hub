import React, { useState, useMemo } from 'react';
import { ShieldCheckIcon } from '../icons';
import { handbookContent } from '../../data/mockData';

interface AccordionItemProps {
  title: string;
  content: string[];
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <h2>
        <button
          type="button"
          className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={onClick}
          aria-expanded={isOpen}
        >
          <span>{title}</span>
          <svg
            className={`w-6 h-6 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </h2>
      <div className={`${isOpen ? 'block' : 'hidden'} p-5 border-t-0 border-gray-200 dark:border-gray-700`}>
        <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          {content.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      </div>
    </div>
  );
};


const HandbookPage: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [searchTerm, setSearchTerm] = useState('');

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    
    const filteredContent = useMemo(() => {
      if (!searchTerm) {
          return handbookContent;
      }
      const lowercasedFilter = searchTerm.toLowerCase();
      return handbookContent.filter(section => 
          section.title.toLowerCase().includes(lowercasedFilter) ||
          section.content.some(item => item.toLowerCase().includes(lowercasedFilter))
      );
  }, [searchTerm]);

  return (
    <div>
        <div className="flex items-center mb-8">
            <ShieldCheckIcon className="w-10 h-10 mr-4 text-moriah-green-600" />
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">Agent Handbook</h2>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="mb-6">
                <input 
                    type="text"
                    placeholder="Search handbook..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-moriah-green-500"
                />
            </div>

            <div id="accordion-flush" data-accordion="collapse">
                {filteredContent.length > 0 ? filteredContent.map((section, index) => (
                    <AccordionItem
                        key={index}
                        title={section.title}
                        content={section.content}
                        isOpen={openIndex === index}
                        onClick={() => handleToggle(index)}
                    />
                )) : (
                    <p className="text-center text-gray-500 dark:text-gray-400 py-8">No results found for "{searchTerm}".</p>
                )}
            </div>
        </div>
    </div>
  );
};

export default HandbookPage;
