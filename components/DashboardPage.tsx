import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import AgentDashboard from './pages/AgentDashboardPage';

const DashboardPage: React.FC = () => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Redirect users with administrative roles to their specific dashboard
    if (user.role === 'Admin' || user.role === 'Superadmin' || user.role === 'Manager') {
        return <Navigate to="/admin/dashboard" replace />;
    }

    // Standard agents see the Agent Dashboard
    return <AgentDashboard />;
};

export default DashboardPage;
