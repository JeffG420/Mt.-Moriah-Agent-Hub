import React, 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
}

const baseInputClasses = "mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-moriah-green-500 focus:border-moriah-green-500";
const errorInputClasses = "border-red-500 focus:ring-red-500 focus:border-red-500";


const Input: React.FC<InputProps> = ({ label, id, error, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <input
        id={id}
        name={id}
        className={`${baseInputClasses} ${error ? errorInputClasses : ''}`}
        {...props}
      />
      {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
};


interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({ label, id, error, children, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <select
        id={id}
        name={id}
        className={`${baseInputClasses} ${error ? errorInputClasses : ''}`}
        {...props}
      >
        {children}
      </select>
      {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  )
}

interface FileInputProps {
    id: string;
    label: string;
    helpText?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FileInput: React.FC<FileInputProps> = ({ id, label, helpText, onChange }) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
            </label>
            <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600 dark:text-gray-400">
                        <label htmlFor={id} className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-moriah-green-600 hover:text-moriah-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 dark:focus-within:ring-offset-gray-800 focus-within:ring-moriah-green-500">
                            <span>Upload a file</span>
                            <input id={id} name={id} type="file" className="sr-only" onChange={onChange}/>
                        </label>
                        <p className="pl-1">or drag and drop</p>
                    </div>
                    {helpText && <p className="text-xs text-gray-500 dark:text-gray-500">{helpText}</p>}
                </div>
            </div>
        </div>
    )
}


export default Input;
