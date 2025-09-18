import React, { useState } from 'react';
import { Logo } from './icons';
import { useAuth } from '../hooks/useAuth';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [agentId, setAgentId] = useState('AG-001');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(agentId, password);
      if (!success) {
        setError('Invalid Agent ID or password. Please try again.');
      }
    } catch (e) {
        setError('An unexpected error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg dark:bg-gray-800">
        <div className="text-center">
          <Logo className="w-64 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Agent Hub Portal</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="p-3 text-sm text-red-800 bg-red-100 border border-red-300 rounded-lg dark:bg-red-900/20 dark:text-red-300 dark:border-red-600">
                {error}
            </div>
          )}
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="agent-id" className="sr-only">
                Agent ID
              </label>
              <input
                id="agent-id"
                name="agent-id"
                type="text"
                autoComplete="username"
                required
                value={agentId}
                onChange={(e) => setAgentId(e.target.value)}
                className="relative block w-full px-3 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-moriah-green-500 focus:border-moriah-green-500 focus:z-10 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Agent ID"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="relative block w-full px-3 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-moriah-green-500 focus:border-moriah-green-500 focus:z-10 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="relative flex justify-center w-full px-4 py-3 text-sm font-medium text-white border border-transparent rounded-md group bg-moriah-green-600 hover:bg-moriah-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-moriah-green-500 transition-colors duration-300 disabled:bg-moriah-green-400 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;