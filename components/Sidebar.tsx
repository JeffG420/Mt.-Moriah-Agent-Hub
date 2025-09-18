import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Dialog, Transition } from '@headlessui/react';
import {
  XMarkIcon,
  HomeIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  UsersIcon,
  TrophyIcon,
  BookOpenIcon,
  MegaphoneIcon,
  ShieldCheckIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  SparklesIcon,
  DocumentDuplicateIcon,
  ChatBubbleLeftRightIcon
} from './icons';
import { Logo } from './icons';
import { UserRole } from '../types';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

// FIX: Define a type for navigation items to include optional roles.
interface NavigationItem {
    name: string;
    href: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    roles?: UserRole[];
}

const agentNavigation: NavigationItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'My Profile', href: '/profile', icon: UserCircleIcon },
  { name: 'Messaging', href: '/messaging', icon: ChatBubbleLeftRightIcon },
  { name: 'Agent Moriah (AI)', href: '/ai-assistant', icon: SparklesIcon },
  { name: 'Sales & Commissions', href: '/sales', icon: CurrencyDollarIcon },
  { name: 'Promotion Tracker', href: '/progress', icon: ChartBarIcon },
  { name: 'My Team', href: '/team', icon: UsersIcon },
  { name: 'Leaderboard', href: '/leaderboard', icon: TrophyIcon },
  { name: 'Resources', href: '/resources', icon: BookOpenIcon },
  { name: 'Announcements', href: '/announcements', icon: MegaphoneIcon },
  { name: 'Handbook', href: '/handbook', icon: ShieldCheckIcon },
];

const adminNavigation: NavigationItem[] = [
    { name: 'Admin Dashboard', href: '/admin/dashboard', icon: HomeIcon },
    { name: 'Team Directory', href: '/team', icon: UsersIcon },
    { name: 'Performance Reports', href: '/admin/reports', icon: DocumentDuplicateIcon },
    { name: 'Application Settings', href: '/admin/settings', icon: Cog6ToothIcon, roles: ['Superadmin'] },
];

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
    const { user } = useAuth();
    
    const navigation = user?.role === 'Agent' ? agentNavigation : adminNavigation;

    const navLinkClasses = ({ isActive }: { isActive: boolean; }) => 
        `group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
            isActive
                ? 'bg-moriah-green-600 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
        }`;

    const navIconClasses = ({ isActive }: { isActive: boolean; }) => 
        `mr-3 flex-shrink-0 h-6 w-6 transition-colors ${
            isActive 
                ? 'text-white' 
                : 'text-gray-400 dark:text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'
        }`;


    const sidebarContent = (
        <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
                <Logo className="h-8 w-auto text-moriah-green-700 dark:text-moriah-green-400" />
            </div>
            <div className="mt-5 flex flex-grow flex-col">
                <nav className="flex-1 space-y-1 px-2">
                    {navigation.map((item) => {
                        if (item.roles && user && !item.roles.includes(user.role)) {
                            return null;
                        }
                        return (
                            <NavLink
                                key={item.name}
                                to={item.href}
                                className={navLinkClasses}
                                onClick={() => setSidebarOpen(false)}
                            >
                                {({ isActive }) => (
                                    <>
                                        <item.icon
                                            className={navIconClasses({isActive})}
                                            aria-hidden="true"
                                        />
                                        {item.name}
                                    </>
                                )}
                            </NavLink>
                        )
                    })}
                </nav>
            </div>
        </div>
    );

  return (
    <>
        {/* Mobile sidebar */}
        <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                </Transition.Child>

                <div className="fixed inset-0 z-40 flex">
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white dark:bg-gray-800">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-in-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in-out duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="absolute top-0 right-0 -mr-12 pt-2">
                                    <button
                                        type="button"
                                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <span className="sr-only">Close sidebar</span>
                                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                    </button>
                                </div>
                            </Transition.Child>
                            {sidebarContent}
                        </Dialog.Panel>
                    </Transition.Child>
                    <div className="w-14 flex-shrink-0" aria-hidden="true">
                        {/* Dummy element to force sidebar to shrink to fit close icon */}
                    </div>
                </div>
            </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
            {sidebarContent}
        </div>
        <div className="md:pl-64">
            {/* This empty div is a spacer for the fixed sidebar */}
        </div>
    </>
  );
};

export default Sidebar;