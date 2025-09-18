import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../types';
import { ArrowRightOnRectangleIcon, Bars3Icon } from './icons';

interface HeaderProps {
    onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
    const { user, logout, login } = useAuth();

    const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedRole = event.target.value as UserRole;
        // In a real app, this would be more complex. Here we find the first user with that role.
        // FIX: The login function requires a password. Added 'password123' for the demo role switcher.
        if (selectedRole === 'Agent') login('AG-001', 'password123');
        if (selectedRole === 'Manager') login('MG-001', 'password123');
        if (selectedRole === 'Admin') login('AD-001', 'password123');
        if (selectedRole === 'Superadmin') login('SA-001', 'password123');
    }

    return (
        <header className="relative bg-white dark:bg-gray-800 shadow-md z-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="h-16 flex items-center justify-between">
                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={onMenuClick}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-moriah-green-500"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>

                    {/* Placeholder for left items on desktop */}
                    <div className="hidden md:flex"></div>

                    <div className="flex items-center space-x-4">
                        {/* DEMO ONLY: Role Switcher */}
                        <div className="relative">
                             <select
                                id="role-switcher"
                                value={user?.role}
                                onChange={handleRoleChange}
                                className="text-xs appearance-none bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-md pl-2 pr-6 py-1 focus:outline-none focus:ring-moriah-green-500 focus:border-moriah-green-500"
                             >
                                <option value="Agent">Agent</option>
                                <option value="Manager">Manager</option>
                                <option value="Admin">Admin</option>
                                <option value="Superadmin">Superadmin</option>
                             </select>
                             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-gray-700 dark:text-gray-300">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                             </div>
                        </div>

                        <span className="hidden sm:inline text-gray-800 dark:text-gray-200 text-sm">Welcome, {user?.name.split(' ')[0]}</span>
                        <button
                            onClick={logout}
                            className="flex items-center px-3 py-2 text-sm font-medium text-white bg-moriah-green-600 rounded-lg hover:bg-moriah-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-moriah-green-500 dark:focus:ring-offset-gray-800 transition-colors duration-300"
                            aria-label="Logout"
                        >
                            <ArrowRightOnRectangleIcon className="w-5 h-5 md:mr-2" />
                            <span className="hidden md:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
