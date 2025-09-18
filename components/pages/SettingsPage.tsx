import React, { useState } from 'react';
import Card from '../common/Card';
import { Cog6ToothIcon } from '../icons';
import Input from '../common/Input';
import Button from '../common/Button';

// Default settings, in a real app this would be fetched from a DB.
const initialSettings = {
    baseCommissionAgent: 4,
    commissionIncrementRMA: 0.5,
    commissionIncrementUMM: 0.5,
    commissionIncrementSMM: 0.5,
    commissionIncrementSMD: 0.5,
    commissionIncrementBMM: 0.5,
    commissionBroker: 7,
    transportSharePct: 0.3, // Flagged from spec: 0.3% vs 0.003%. Defaulting to 0.3
};

const SettingsPage: React.FC = () => {
    const [settings, setSettings] = useState(initialSettings);
    const [isLoading, setIsLoading] = useState(false);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    }
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        console.log("Saving settings:", settings);
        setTimeout(() => {
            alert("Settings saved successfully!");
            setIsLoading(false);
        }, 1000);
    }

    return (
        <div>
            <div className="flex items-center mb-8">
                <Cog6ToothIcon className="w-10 h-10 mr-4 text-moriah-green-600" />
                <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">Application Settings</h2>
            </div>
            
            <Card title="System Configuration" description="Manage global parameters for the Agent Hub. Changes here affect all users.">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="p-4 border border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-700 rounded-md">
                        <h4 className="font-bold text-yellow-800 dark:text-yellow-300">Inconsistency Noted in Handbook</h4>
                        <p className="text-sm text-yellow-700 dark:text-yellow-400">
                           The provided handbook shows two different values for Transport Share (0.3% and 0.003%). 
                           This setting allows you to clarify and set the correct system-wide value. The current value is set to <strong>{settings.transportSharePct}%</strong>.
                        </p>
                    </div>

                    <Input 
                        id="transportSharePct"
                        label="Transport Share Percentage (%)"
                        type="number"
                        value={settings.transportSharePct}
                        onChange={handleChange}
                        step="0.001"
                    />

                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white pt-4 border-t border-gray-200 dark:border-gray-700">Commission Rates</h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <Input 
                            id="baseCommissionAgent"
                            label="Sales Agent Base (%)"
                            type="number"
                            value={settings.baseCommissionAgent}
                            onChange={handleChange}
                            step="0.1"
                        />
                         <Input 
                            id="commissionIncrementRMA"
                            label="RMA Increment (%)"
                            type="number"
                            value={settings.commissionIncrementRMA}
                            onChange={handleChange}
                            step="0.1"
                        />
                         <Input 
                            id="commissionIncrementUMM"
                            label="UMM Increment (%)"
                            type="number"
                            value={settings.commissionIncrementUMM}
                            onChange={handleChange}
                            step="0.1"
                        />
                         <Input 
                            id="commissionIncrementSMM"
                            label="SMM Increment (%)"
                            type="number"
                            value={settings.commissionIncrementSMM}
                            onChange={handleChange}
                            step="0.1"
                        />
                        <Input 
                            id="commissionBroker"
                            label="Broker/Owner Rate (%)"
                            type="number"
                            value={settings.commissionBroker}
                            onChange={handleChange}
                            step="0.1"
                        />
                    </div>
                    
                    <div className="flex justify-end pt-4">
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Saving...' : 'Save Settings'}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default SettingsPage;
