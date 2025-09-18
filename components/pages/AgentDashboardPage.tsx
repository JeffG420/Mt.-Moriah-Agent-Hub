import React from 'react';
import { Link } from 'react-router-dom';
import DashboardCard from '../DashboardCard';
import { useAuth } from '../../hooks/useAuth';
import { 
  BookOpenIcon,
  UsersIcon, 
  ChartBarIcon,
  TrophyIcon,
  MegaphoneIcon,
  ShieldCheckIcon,
  ChatBubbleLeftRightIcon,
  AcademicCapIcon,
  PaperAirplaneIcon,
  BanknotesIcon,
  ArrowUpTrayIcon,
  CurrencyDollarIcon,
} from '../icons';

const agentModules = [
  { icon: <ChatBubbleLeftRightIcon />, title: "Messaging", description: "Chat with your team, manager, and admins.", link: "/messaging" },
  { icon: <PaperAirplaneIcon />, title: "Request Site Tripping", description: "Submit a new request for a client site visit.", link: "/request-tripping" },
  { icon: <CurrencyDollarIcon />, title: "Log a Sale", description: "Submit new client payments for validation.", link: "/sales" },
  { icon: <BanknotesIcon />, title: "My Commissions", description: "View your commission statements and history.", link: "/commissions" },
  { icon: <ChartBarIcon />, title: "Promotion Tracker", description: "Monitor your progress towards your next career level.", link: "/progress" },
  { icon: <ArrowUpTrayIcon />, title: "Apply for Promotion", description: "Submit your application for the next level.", link: "/promotions" },
  { icon: <UsersIcon />, title: "My Team", description: "View your team and track recruit performance.", link: "/team" },
  { icon: <TrophyIcon />, title: "Leaderboard", description: "See the top performing agents and teams.", link: "/leaderboard" },
  { icon: <AcademicCapIcon />, title: "Learning Hub", description: "Access training modules, videos, and quizzes.", link: "/learning" },
  { icon: <BookOpenIcon />, title: "Agent Resources", description: "Download lot plans and marketing materials.", link: "/resources" },
  { icon: <MegaphoneIcon />, title: "Announcements", description: "Read important updates, memos, and news.", link: "/announcements" },
  { icon: <ShieldCheckIcon />, title: "Handbook & Compliance", description: "Review handbook, Do's & Don'ts, and RESA rules.", link: "/handbook" },
];

const AgentDashboardPage: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Welcome, {user?.name.split(' ')[0]}!
      </h1>
      <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
        This is your central hub. Access all your tools and modules from here.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {agentModules.map((item) => (
          <Link to={item.link} key={item.title} className="block group">
            <DashboardCard
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AgentDashboardPage;
