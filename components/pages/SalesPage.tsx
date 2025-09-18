import React from 'react';
import { CurrencyDollarIcon } from '../icons';

const SalesPage: React.FC = () => {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const clientName = formData.get('client-name');
    const refId = `MM-PAY-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    alert(`Payment / Reservation created for ${clientName}!\nReference ID: ${refId}\n\nThis will now appear in the Admin dashboard for validation.`);
    event.currentTarget.reset();
  };

  return (
    <div>
        <div className="flex items-center mb-8">
            <CurrencyDollarIcon className="w-10 h-10 mr-4 text-moriah-green-600" />
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">Log a Sale / Payment</h2>
        </div>
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Create New Payment Record</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Fill out this form to log a new client reservation or payment. This will be sent to an Admin for validation before it reflects on your commissions.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="client-id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Client Reference ID</label>
              <input type="text" name="client-id" id="client-id" required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-moriah-green-500 focus:border-moriah-green-500" placeholder="e.g., CL-101" />
            </div>
            <div>
              <label htmlFor="lot-code" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Property Chosen (Lot Code)</label>
              <input type="text" name="lot-code" id="lot-code" required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-moriah-green-500 focus:border-moriah-green-500" placeholder="e.g., PH1-B3-L5" />
            </div>
            <div>
              <label htmlFor="payment-amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Payment Amount (PHP)</label>
              <input type="number" name="payment-amount" id="payment-amount" required min="0" step="1000" className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-moriah-green-500 focus:border-moriah-green-500" />
            </div>
            <div>
              <label htmlFor="payment-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Payment Date</label>
              <input type="date" name="payment-date" id="payment-date" required defaultValue={new Date().toISOString().substring(0, 10)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-moriah-green-500 focus:border-moriah-green-500" />
            </div>
            <div className="md:col-span-2">
                <label htmlFor="payment-proof" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Proof of Payment
                </label>
                <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="flex text-sm text-gray-600 dark:text-gray-400">
                            <label htmlFor="payment-proof" className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-moriah-green-600 hover:text-moriah-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 dark:focus-within:ring-offset-gray-800 focus-within:ring-moriah-green-500">
                                <span>Upload a file</span>
                                <input id="payment-proof" name="payment-proof" type="file" className="sr-only" />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-500">PNG, JPG, PDF up to 10MB</p>
                    </div>
                </div>
                <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                    Important: Agents do not collect payments directly. Please upload the client's deposit slip or proof of online transfer here.
                </p>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
             <button
              type="submit"
              className="px-8 py-3 text-white font-semibold bg-moriah-green-600 hover:bg-moriah-green-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-moriah-green-500 dark:focus:ring-offset-gray-800 transition-all duration-300"
            >
              Submit for Validation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SalesPage;
