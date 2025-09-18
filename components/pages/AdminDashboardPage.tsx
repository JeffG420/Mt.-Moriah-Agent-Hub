import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { User } from '../../types';
import Card from '../common/Card';
import Button from '../common/Button';
import PresenceDot from '../common/PresenceDot';
import { users } from '../../data/users'; // for online users demo
import { siteTrippingRequests, payments, promotionApplications } from '../../data/mockData';
import { ChartBarIcon, UsersIcon, CurrencyDollarIcon, PaperAirplaneIcon, ArrowUpTrayIcon, BanknotesIcon } from '../icons';

const onlineUsers = users.slice(0, 8).map((user, index) => ({...user, status: index % 3 === 0 ? 'Online' : index % 3 === 1 ? 'Away' : 'Offline'}));

const AdminDashboardPage: React.FC = () => {
    const { user } = useAuth();
    
    const pendingTrippings = siteTrippingRequests.filter(r => (r.status === 'Pending Admin Approval' || r.status === 'Pending Superadmin Finalization'));
    const pendingPayments = payments.filter(p => !p.isValidated);
    const pendingPromotions = promotionApplications.filter(p => p.status === 'Pending Manager Endorsement' || p.status === 'Pending Superadmin Approval');


    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {user?.role} Dashboard
            </h1>
            <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
                Welcome, {user?.name}! Here's an overview of the platform's activity.
            </p>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="!p-0">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 bg-moriah-green-100 rounded-md p-3">
                                <UsersIcon className="h-6 w-6 text-moriah-green-600" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Total Agents</dt>
                                    <dd className="text-3xl font-bold text-gray-900 dark:text-white">37</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </Card>
                 <Card className="!p-0">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                                <BanknotesIcon className="h-6 w-6 text-yellow-600" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Commission Payout (MTD)</dt>
                                    <dd className="text-3xl font-bold text-gray-900 dark:text-white">₱1.2M</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </Card>
                 <Card className="!p-0">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                                <ChartBarIcon className="h-6 w-6 text-blue-600" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Lots Sold (MTD)</dt>
                                    <dd className="text-3xl font-bold text-gray-900 dark:text-white">28</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </Card>
                 <Card className="!p-0">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
                               <PaperAirplaneIcon className="h-6 w-6 text-red-600" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Pending Trippings</dt>
                                    <dd className="text-3xl font-bold text-gray-900 dark:text-white">{pendingTrippings.length}</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
            
            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Approval Queues */}
                <div className="lg:col-span-2 space-y-8">
                    <Card title="Approval Queues" description="Items requiring your attention." icon={<UsersIcon />}>
                        <div className="space-y-4">
                            {/* Tripping Requests */}
                            {(user?.role === 'Admin' || user?.role === 'Superadmin') && (
                                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                    <div className="flex items-center">
                                        <PaperAirplaneIcon className="w-5 h-5 mr-3 text-purple-500"/>
                                        <span className="font-medium text-gray-800 dark:text-gray-200">Site Tripping Requests</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className="text-lg font-bold text-purple-600 dark:text-purple-400">{pendingTrippings.length}</span>
                                        {user?.role === 'Admin' && <Button size="sm" variant="secondary">Review</Button>}
                                        {user?.role === 'Superadmin' && <Button size="sm" variant="secondary">Finalize</Button>}
                                    </div>
                                </div>
                            )}
                            {/* Payment Validations */}
                            {(user?.role === 'Admin' || user?.role === 'Superadmin') && (
                                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                    <div className="flex items-center">
                                        <CurrencyDollarIcon className="w-5 h-5 mr-3 text-blue-500"/>
                                        <span className="font-medium text-gray-800 dark:text-gray-200">Payment Validations</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{pendingPayments.length}</span>
                                        <Button size="sm" variant="secondary">Validate</Button>
                                    </div>
                                </div>
                            )}
                            {/* Promotion Applications */}
                            {(user?.role === 'Manager' || user?.role === 'Superadmin') && (
                                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                    <div className="flex items-center">
                                        <ArrowUpTrayIcon className="w-5 h-5 mr-3 text-yellow-500"/>
                                        <span className="font-medium text-gray-800 dark:text-gray-200">Promotion Applications</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className="text-lg font-bold text-yellow-600 dark:text-yellow-400">{pendingPromotions.length}</span>
                                        {user?.role === 'Manager' && <Button size="sm" variant="secondary">Endorse</Button>}
                                        {user?.role === 'Superadmin' && <>
                                            <Button size="sm" variant="primary">Approve</Button>
                                            <Button size="sm" variant="danger">Reject</Button>
                                        </>}
                                    </div>
                                </div>
                            )}
                        </div>
                    </Card>
                </div>

                {/* Right Column: Who's Online */}
                <div className="lg:col-span-1">
                    <Card title="Who's Online?" icon={<UsersIcon />}>
                         <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                             {onlineUsers.map((person: any) => (
                                <li key={person.agentId} className="py-3 sm:py-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            <img className="w-8 h-8 rounded-full" src={person.avatarUrl} alt={`${person.name} avatar`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                {person.name}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                {person.role}
                                            </p>
                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            <PresenceDot status={person.status} />
                                        </div>
                                    </div>
                                </li>
                             ))}
                         </ul>
                    </Card>
                </div>
            </div>
        </div>
    )
};

export default AdminDashboardPage;