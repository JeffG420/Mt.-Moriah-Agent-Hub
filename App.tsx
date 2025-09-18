import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import MainLayout from './components/MainLayout';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
// Agent Pages
import AgentDashboardPage from './components/pages/AgentDashboardPage';
import AnnouncementsPage from './components/pages/AnnouncementsPage';
import CommissionDashboardPage from './components/pages/CommissionDashboardPage';
import CompliancePage from './components/pages/CompliancePage';
import HandbookPage from './components/pages/HandbookPage';
import LeaderboardPage from './components/pages/LeaderboardPage';
import LearningHubPage from './components/pages/LearningHubPage';
import LogsPage from './components/pages/LogsPage';
import MessagingPage from './components/pages/MessagingPage';
import ProfilePage from './components/pages/ProfilePage';
import ProgressPage from './components/pages/ProgressPage';
import PromotionApplicationPage from './components/pages/PromotionApplicationPage';
import ResourcesPage from './components/pages/ResourcesPage';
import SalesPage from './components/pages/SalesPage';
import SiteTrippingRequestPage from './components/pages/SiteTrippingRequestPage';
import TeamPage from './components/pages/TeamPage';
import AgentMoriahPage from './components/pages/AgentMoriahPage';

// Admin Pages
import AdminDashboardPage from './components/pages/AdminDashboardPage';
import SettingsPage from './components/pages/SettingsPage';
import PerformanceReportsPage from './components/pages/PerformanceReportsPage';
import { UserRole } from './types';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) {
        return <div className="flex items-center justify-center h-screen"><div>Loading...</div></div>;
    }
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
};

const RoleBasedRoute: React.FC<{ children: React.ReactNode; roles: UserRole[] }> = ({ children, roles }) => {
    const { user } = useAuth();
    if (!user || !roles.includes(user.role)) {
        return <Navigate to="/dashboard" replace />;
    }
    return <>{children}</>;
};


const AppRoutes: React.FC = () => (
    <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        
        {/* Agent Routes */}
        <Route path="/agent-dashboard" element={<AgentDashboardPage />} />
        <Route path="/announcements" element={<AnnouncementsPage />} />
        <Route path="/commissions" element={<CommissionDashboardPage />} />
        <Route path="/compliance" element={<CompliancePage />} />
        <Route path="/handbook" element={<HandbookPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/learning" element={<LearningHubPage />} />
        <Route path="/logs" element={<LogsPage />} />
        <Route path="/messaging" element={<MessagingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/promotions" element={<PromotionApplicationPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/sales" element={<SalesPage />} />
        <Route path="/request-tripping" element={<SiteTrippingRequestPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/ai-assistant" element={<AgentMoriahPage />} />

        {/* Admin & Manager Routes */}
        <Route path="/admin/dashboard" element={<RoleBasedRoute roles={['Manager', 'Admin', 'Superadmin']}><AdminDashboardPage /></RoleBasedRoute>} />
        <Route path="/admin/reports" element={<RoleBasedRoute roles={['Admin', 'Superadmin']}><PerformanceReportsPage /></RoleBasedRoute>} />
        <Route path="/admin/settings" element={<RoleBasedRoute roles={['Superadmin']}><SettingsPage /></RoleBasedRoute>} />

        {/* Catch-all for protected routes */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
);


const App: React.FC = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route
                    path="/*"
                    element={
                        <ProtectedRoute>
                            <MainLayout>
                                <AppRoutes />
                            </MainLayout>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </AuthProvider>
    );
};

export default App;
