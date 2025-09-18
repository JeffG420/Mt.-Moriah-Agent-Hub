import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import AgentDashboard from './AgentDashboardPage';

const DashboardPage: React.FC = () => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Redirect users with administrative roles to their specific dashboard
    if (user.role === 'Manager' || user.role === 'Admin' || user.role === 'Superadmin') {
        return <Navigate to="/admin/dashboard" replace />;
    }

    // Standard agents see the Agent Dashboard
    return <AgentDashboard />;
};

export default DashboardPage;
