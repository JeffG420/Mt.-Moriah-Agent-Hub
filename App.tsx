import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import MainLayout from './components/MainLayout';
import LoginPage from './components/LoginPage';
import { UserRole } from './types';

// Lazy load pages for better performance
const DashboardPage = lazy(() => import('./components/pages/DashboardPage'));
const AdminDashboardPage = lazy(() => import('./components/pages/AdminDashboardPage'));
const ResourcesPage = lazy(() => import('./components/pages/ResourcesPage'));
const TeamPage = lazy(() => import('./components/pages/TeamPage'));
const LogsPage = lazy(() => import('./components/pages/LogsPage'));
const SalesPage = lazy(() => import('./components/pages/SalesPage'));
const ProgressPage = lazy(() => import('./components/pages/ProgressPage'));
const LeaderboardPage = lazy(() => import('./components/pages/LeaderboardPage'));
const AnnouncementsPage = lazy(() => import('./components/pages/AnnouncementsPage'));
const ProfilePage = lazy(() => import('./components/pages/ProfilePage'));
const CompliancePage = lazy(() => import('./components/pages/CompliancePage'));
const MessagingPage = lazy(() => import('./components/pages/MessagingPage'));
const LearningHubPage = lazy(() => import('./components/pages/LearningHubPage'));
const SiteTrippingRequestPage = lazy(() => import('./components/pages/SiteTrippingRequestPage'));
const CommissionDashboardPage = lazy(() => import('./components/pages/CommissionDashboardPage'));
const HandbookPage = lazy(() => import('./components/pages/HandbookPage'));
const SettingsPage = lazy(() => import('./components/pages/SettingsPage'));
const PromotionApplicationPage = lazy(() => import('./components/pages/PromotionApplicationPage'));
const AgentMoriahPage = lazy(() => import('./components/pages/AgentMoriahPage'));


const LoadingFallback: React.FC = () => (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-xl font-semibold text-gray-700 dark:text-gray-300">Loading Mount Moriah Agent Hub...</div>
    </div>
);

// Wrapper for routes that require authentication
const PrivateRoutes: React.FC = () => {
    const { user, loading } = useAuth();
    if (loading) return <LoadingFallback />;
    if (!user) return <Navigate to="/login" replace />;

    return (
        <MainLayout>
            <Suspense fallback={<div className="p-6 text-center text-gray-500">Loading page...</div>}>
                <Outlet />
            </Suspense>
        </MainLayout>
    );
};

// Wrapper for routes that require Admin, Manager or Superadmin role
const AdminRoutes: React.FC<{ allowedRoles: UserRole[] }> = ({ allowedRoles }) => {
    const { user, loading } = useAuth();
    if (loading) return <LoadingFallback />;
    if (!user || !allowedRoles.includes(user.role)) {
        return <Navigate to="/dashboard" replace />;
    }
    return <Outlet />;
};

// Wrapper for routes that require Superadmin role
const SuperAdminRoutes: React.FC = () => {
    const { user, loading } = useAuth();
    if (loading) return <LoadingFallback />;
    if (!user || user.role !== 'Superadmin') {
        return <Navigate to="/dashboard" replace />;
    }
    return <Outlet />;
};

const AppRoutes: React.FC = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <LoadingFallback />;
    }

    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />

            {/* Authenticated routes */}
            <Route element={<PrivateRoutes />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/resources" element={<ResourcesPage />} />
                <Route path="/team" element={<TeamPage />} />
                <Route path="/logs" element={<LogsPage />} />
                <Route path="/sales" element={<SalesPage />} />
                <Route path="/progress" element={<ProgressPage />} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />
                <Route path="/announcements" element={<AnnouncementsPage />} />
                <Route path="/compliance" element={<CompliancePage />} />
                <Route path="/messaging" element={<MessagingPage />} />
                <Route path="/learning" element={<LearningHubPage />} />
                <Route path="/request-tripping" element={<SiteTrippingRequestPage />} />
                <Route path="/commissions" element={<CommissionDashboardPage />} />
                <Route path="/handbook" element={<HandbookPage />} />
                <Route path="/promotions" element={<PromotionApplicationPage />} />
                <Route path="/agent-moriah" element={<AgentMoriahPage />} />
                
                {/* Admin, Manager & SuperAdmin Routes */}
                <Route element={<AdminRoutes allowedRoles={['Manager', 'Admin', 'Superadmin']} />}>
                    <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                </Route>

                {/* SuperAdmin Only Routes */}
                <Route element={<SuperAdminRoutes />}>
                    <Route path="/settings" element={<SettingsPage />} />
                </Route>
                
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Route>

            <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
        </Routes>
    );
};


const App: React.FC = () => {
    return (
        <AuthProvider>
            <Suspense fallback={<LoadingFallback />}>
                <AppRoutes />
            </Suspense>
        </AuthProvider>
    );
};


export default App;