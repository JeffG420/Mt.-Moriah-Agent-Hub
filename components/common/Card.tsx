import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  // FIX: Update icon type to be more specific for React.cloneElement compatibility.
  icon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  actions?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, className, title, description, icon, actions }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg ${className}`}>
        {(title || icon) && (
             <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-start">
                <div className="flex items-center">
                    {icon && (
                         <div className="flex-shrink-0 bg-moriah-green-100 dark:bg-moriah-green-900/50 text-moriah-green-600 dark:text-moriah-green-300 rounded-lg p-3 mr-4">
                            {React.cloneElement(icon, { className: "h-6 w-6" })}
                        </div>
                    )}
                    <div>
                        {title && <h3 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h3>}
                        {description && <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{description}</p>}
                    </div>
                </div>
                {actions && <div className="flex-shrink-0">{actions}</div>}
             </div>
        )}
        <div className="p-6">
            {children}
        </div>
    </div>
  );
};

export default Card;