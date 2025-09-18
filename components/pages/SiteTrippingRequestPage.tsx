import React, { useState } from 'react';
import Card from '../common/Card';
import { PaperAirplaneIcon } from '../icons';
import Input, { Select, FileInput } from '../common/Input';
import Button from '../common/Button';

const SiteTrippingRequestPage: React.FC = () => {
    const [clientPhoto, setClientPhoto] = useState<File | null>(null);
    const [supportingDocs, setSupportingDocs] = useState<File | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!clientPhoto) {
            alert("Error: Client Photo Proof is mandatory to lock ownership.");
            return;
        }
        alert("Site tripping request submitted successfully! It will be sent to an Admin for approval.");
    };

    return (
        <div>
            <div className="flex items-center mb-8">
                <PaperAirplaneIcon className="w-10 h-10 mr-4 text-moriah-green-600" />
                <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">Site Tripping Request</h2>
            </div>

            <Card
                title="New Tripping Request"
                description="Fill in the details below. Requests will be reviewed by an Admin."
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            id="client-ref"
                            label="Client Name or Reference ID"
                            type="text"
                            placeholder="e.g., Jeff Ryan Galera"
                            required
                        />
                        <Select id="project" label="Project" required>
                            <option value="">Select Project</option>
                            <option value="Project Abraham">Project Abraham</option>
                            <option value="Project Sarah">Project Sarah</option>
                            <option value="Project Isaac">Project Isaac</option>
                            <option value="Project Ismael">Project Ismael</option>
                        </Select>
                        <Input
                            id="preferred-date"
                            label="Preferred Date"
                            type="date"
                            min={new Date().toISOString().split("T")[0]}
                            required
                        />
                        <Input
                            id="passenger-count"
                            label="Passenger Count"
                            type="number"
                            min="1"
                            defaultValue="1"
                            required
                        />
                         <div className="md:col-span-2">
                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Vehicle Needed?</label>
                             <div className="mt-2 flex space-x-4">
                                <div className="flex items-center">
                                    <input id="vehicle-yes" name="vehicleNeeded" type="radio" className="focus:ring-moriah-green-500 h-4 w-4 text-moriah-green-600 border-gray-300" />
                                    <label htmlFor="vehicle-yes" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-200">Yes</label>
                                </div>
                                <div className="flex items-center">
                                    <input id="vehicle-no" name="vehicleNeeded" type="radio" defaultChecked className="focus:ring-moriah-green-500 h-4 w-4 text-moriah-green-600 border-gray-300" />
                                    <label htmlFor="vehicle-no" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-200">No</label>
                                </div>
                             </div>
                         </div>
                         <div className="md:col-span-2">
                            <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Purpose / Remarks</label>
                            <textarea id="purpose" name="purpose" rows={3} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-moriah-green-500 focus:border-moriah-green-500"></textarea>
                         </div>

                        <div className="md:col-span-2 p-4 border border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-700 rounded-md">
                             <h4 className="font-bold text-red-800 dark:text-red-300">Mandatory Proof of First Contact</h4>
                             <p className="text-sm text-red-700 dark:text-red-400 mb-4">
                               To lock ownership of a client, you must upload a photo with the client, ensuring the photo's timestamp is recent.
                             </p>
                            <FileInput
                                id="client-photo-proof"
                                label="Client Photo Proof (Required)"
                                onChange={(e) => setClientPhoto(e.target.files ? e.target.files[0] : null)}
                                helpText="Photo with client. EXIF timestamp will be checked."
                            />
                        </div>

                        <div className="md:col-span-2">
                             <FileInput
                                id="supporting-docs"
                                label="Other Supporting Documents (Optional)"
                                onChange={(e) => setSupportingDocs(e.target.files ? e.target.files[0] : null)}
                                helpText="e.g., Client Intake Form (PDF, PNG, JPG)"
                            />
                        </div>
                    </div>
                     <div className="pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                        <Button type="submit">
                           Submit for Admin Approval
                        </Button>
                     </div>
                </form>
            </Card>
        </div>
    );
};

export default SiteTrippingRequestPage;
