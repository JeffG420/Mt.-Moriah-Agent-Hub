import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../types';
import { 
  HomeIcon,
  UsersIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
  BookOpenIcon,
  TrophyIcon,
  MegaphoneIcon,
  UserCircleIcon,
  ShieldCheckIcon,
  Logo,
  ChatBubbleLeftRightIcon,
  AcademicCapIcon,
  PaperAirplaneIcon,
  BanknotesIcon,
  ArrowUpTrayIcon,
  Cog6ToothIcon,
  XMarkIcon,
  ChartBarIcon,
  SparklesIcon,
} from './icons';

interface NavItem {
  to: string;
  icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  text: string;
  roles: UserRole[];
  hasNotification?: boolean;
}

const navigationLinks: NavItem[] = [
  { to: '/dashboard', icon: <HomeIcon />, text: 'Dashboard', roles: ['Agent', 'Manager', 'Admin', 'Superadmin'] },
  { to: '/admin/dashboard', icon: <HomeIcon />, text: 'Admin Dashboard', roles: ['Manager', 'Admin', 'Superadmin'] },
  { to: '/agent-moriah', icon: <SparklesIcon />, text: 'Agent Moriah (AI)', roles: ['Agent', 'Manager', 'Admin', 'Superadmin'] },
  { to: '/messaging', icon: <ChatBubbleLeftRightIcon />, text: 'Messaging', roles: ['Agent', 'Manager', 'Admin', 'Superadmin'] },
  { to: '/announcements', icon: <MegaphoneIcon />, text: 'Announcements', roles: ['Agent', 'Manager', 'Admin', 'Superadmin'], hasNotification: true },
  { to: '/team', icon: <UsersIcon />, text: 'Team Directory', roles: ['Manager', 'Admin', 'Superadmin'] },
  { to: '/leaderboard', icon: <TrophyIcon />, text: 'Leaderboard', roles: ['Agent', 'Manager', 'Admin', 'Superadmin'] },
  { to: '/request-tripping', icon: <PaperAirplaneIcon />, text: 'Request Tripping', roles: ['Agent', 'Manager'] },
  { to: '/sales', icon: <CurrencyDollarIcon />, text: 'Log a Sale', roles: ['Agent', 'Manager'] },
  { to: '/commissions', icon: <BanknotesIcon />, text: 'My Commissions', roles: ['Agent', 'Manager'] },
  { to: '/progress', icon: <ChartBarIcon />, text: 'My Progress', roles: ['Agent', 'Manager'] },
  { to: '/promotions', icon: <ArrowUpTrayIcon />, text: 'Apply for Promotion', roles: ['Agent', 'Manager'] },
  { to: '/learning', icon: <AcademicCapIcon />, text: 'Learning Hub', roles: ['Agent', 'Manager', 'Admin', 'Superadmin'] },
  { to: '/resources', icon: <BookOpenIcon />, text: 'Resources', roles: ['Agent', 'Manager', 'Admin', 'Superadmin'] },
  { to: '/handbook', icon: <ShieldCheckIcon />, text: 'Handbook', roles: ['Agent', 'Manager', 'Admin', 'Superadmin'] },
  { to: '/settings', icon: <Cog6ToothIcon />, text: 'Settings', roles: ['Superadmin'] },
  { to: '/profile', icon: <UserCircleIcon />, text: 'My Profile', roles: ['Agent', 'Manager', 'Admin', 'Superadmin'] },
];

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const SidebarContent: React.FC = () => {
    const { user } = useAuth();
    const hasNewAnnouncements = true; // This would be dynamic in a real app

    const navLinkClasses = 'flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 rounded-lg transition-colors duration-200 text-sm';
    const activeClasses = 'bg-moriah-green-100 dark:bg-moriah-green-900/50 text-moriah-green-700 dark:text-moriah-green-200 font-semibold';
    const inactiveClasses = 'hover:bg-gray-200 dark:hover:bg-gray-700';

    if (!user) return null;

    const visibleLinks = navigationLinks.filter(link => link.roles.includes(user.role));

    return (
        <div className="flex flex-col flex-1">
            <div className="flex items-center justify-center h-20 shadow-md p-4 bg-white dark:bg-gray-800">
                <Logo className="h-full w-auto" />
            </div>
            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                {visibleLinks.map(link => (
                <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) => `${navLinkClasses} ${isActive ? activeClasses : inactiveClasses}`}
                >
                    {React.cloneElement(link.icon, { className: 'h-6 w-6 mr-3 flex-shrink-0' })}
                    <span className="flex-grow">{link.text}</span>
                    {link.text === 'Announcements' && hasNewAnnouncements && (
                    <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-pulse"></span>
                    )}
                </NavLink>
                ))}
            </nav>
        </div>
    );
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <>
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 flex z-40 md:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        {/* Overlay */}
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
        
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-gray-800">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
            </div>
            <SidebarContent />
        </div>
        <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <aside className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 bg-white dark:bg-gray-800 shadow-xl">
            <SidebarContent />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;