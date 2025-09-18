import React from 'react';
import { ArrowUpTrayIcon } from '../icons';
import { useAuth } from '../../hooks/useAuth';
import { promotionCriteria } from '../../data/mockData';
import { UserRole } from '../../types';
import Card from '../common/Card';
import Button from '../common/Button';
import { FileInput } from '../common/Input';
import { Link } from 'react-router-dom';

const roleProgression: Record<string, UserRole | null> = {
    'Agent': 'Manager',
    'Manager': 'Admin',
    'Admin': 'Superadmin',
    'Superadmin': null,
};

const PromotionApplicationPage: React.FC = () => {
    const { user } = useAuth();
    
    if (!user) return null;

    const nextRole = roleProgression[user.role];
    const criteria = nextRole ? promotionCriteria[nextRole] : null;

    const isEligible = criteria ? 
        user.stats.lotsSold >= (criteria.minLots || 0) &&
        user.stats.recruits >= (criteria.minRecruits || 0) &&
        user.stats.sqmSold >= (criteria.minSQM || 0) &&
        user.stats.tenureMonths >= (criteria.minTenureMonths || 0) &&
        user.stats.commissionEarned >= (criteria.minCommissionEarned || 0)
        : false;
        
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Promotion application submitted for review!');
    };

    return (
        <div>
            <div className="flex items-center mb-8">
                <ArrowUpTrayIcon className="w-10 h-10 mr-4 text-moriah-green-600" />
                <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">Promotion Application</h2>
            </div>

            {nextRole && criteria ? (
                 <Card title={`Application for ${nextRole}`}>
                    {isEligible ? (
                        <div>
                            <p className="text-lg text-green-600 dark:text-green-400 mb-4 font-semibold">Congratulations! You are eligible to apply for this promotion.</p>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">Please attach any required supporting documents and submit your application. It will be sent to your manager for endorsement.</p>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <FileInput 
                                    id="supporting-docs"
                                    label="Supporting Documents"
                                    helpText="Upload performance reviews, certificates, etc. (PDF, PNG, JPG)"
                                    onChange={() => {}}
                                />
                                 <div className="pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                                     <Button type="submit">
                                        Submit Application
                                     </Button>
                                 </div>
                            </form>
                        </div>
                    ) : (
                        <div>
                            <p className="text-lg text-yellow-600 dark:text-yellow-400 mb-4 font-semibold">You are not yet eligible for this promotion.</p>
                            <p className="text-gray-600 dark:text-gray-400">
                                Please continue working towards the required milestones. You can track your progress on the 
                                <Link to="/progress" className="text-moriah-green-600 hover:underline"> Promotion Tracker page</Link>.
                            </p>
                        </div>
                    )}
                 </Card>
            ) : (
                <Card title="Top of the Ladder!">
                    <p className="text-gray-600 dark:text-gray-400">You have reached the highest available role. Congratulations on your success!</p>
                </Card>
            )}
        </div>
    );
};

export default PromotionApplicationPage;
