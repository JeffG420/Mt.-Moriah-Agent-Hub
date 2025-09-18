import { UserRole, Conversation, Message } from '../types';

export const promotionCriteria: Record<UserRole, any> = {
    'Agent': {}, // Base level
    'Manager': {
        minLots: 5,
        minRecruits: 10,
        minSQM: 1000,
        minTenureMonths: 6,
        minCommissionEarned: 150000,
    },
    'Admin': {
        minLots: 30,
        minRecruits: 20,
        minTenureMonths: 18,
    },
    'Superadmin': {
        minLots: 100,
        minRecruits: 50,
        minTenureMonths: 36,
    }
};

const initialMessages: Message[] = [
    { id: 'msg1', senderId: 'MG-001', text: 'Hi Angelyn, just checking in on your new leads. Let me know if you need help with closing.', timestamp: '10:30 AM', status: 'read' },
    { id: 'msg2', senderId: 'AG-001', text: "Hi Moises! Thanks for checking in. I have a promising client, Mr. Dela Cruz. We're scheduled for a site visit tomorrow.", timestamp: '10:32 AM', status: 'delivered' },
];

export const conversations: Conversation[] = [
    {
        id: 'conv1',
        participants: ['AG-001', 'MG-001'],
        messages: initialMessages
    },
    {
        id: 'conv2',
        participants: ['AG-001', 'AD-001'],
        messages: [
            { id: 'msg3', senderId: 'AD-001', text: 'Please submit your sales documents for Q3.', timestamp: 'Yesterday', status: 'read' }
        ]
    }
];

export const siteTrippingRequests = [
    { id: 'TRIP-001', agentId: 'AG-002', clientName: 'Juan Dela Cruz', status: 'Pending Admin Approval', requestedDate: '2025-08-20' },
    { id: 'TRIP-002', agentId: 'AG-003', clientName: 'Maria Santos', status: 'Pending Superadmin Finalization', requestedDate: '2025-08-21' },
    { id: 'TRIP-003', agentId: 'AG-001', clientName: 'Peter Jones', status: 'Approved', requestedDate: '2025-08-19' },
];

export const payments = [
    { id: 'PAY-001', agentId: 'AG-001', clientName: 'John Smith', amount: 20000, isValidated: false, date: '2025-08-18' },
    { id: 'PAY-002', agentId: 'AG-003', clientName: 'Jane Doe', amount: 25000, isValidated: false, date: '2025-08-17' },
];

export const promotionApplications = [
    { id: 'PROMO-001', agentId: 'AG-001', toRole: 'Manager', status: 'Pending Manager Endorsement', date: '2025-08-15' },
    { id: 'PROMO-002', agentId: 'MG-001', toRole: 'Admin', status: 'Pending Superadmin Approval', date: '2025-08-16' },
];

export const commissions = [
  { id: 1, date: '2025-08-15', clientName: 'Mr. & Mrs. Reyes', lotCode: 'PH1-B3-L5', amount: 25000.00, type: 'Direct' },
  { id: 2, date: '2025-08-10', clientName: 'Ms. Santos', lotCode: 'PH2A-B1-L2', amount: 18500.00, type: 'Direct' },
  { id: 3, date: '2025-07-28', clientName: 'Dela Cruz Family', lotCode: 'PH1-B5-L10', amount: 32000.00, type: 'Direct' },
  { id: 4, date: '2025-07-25', clientName: 'Recruit: A. Real', lotCode: 'N/A', amount: 5000.00, type: 'Override' },
  { id: 5, date: '2025-07-15', clientName: 'Mr. Garcia', lotCode: 'PH1-B2-L8', amount: 22500.00, type: 'Direct' },
];

export const handbookContent = [
    {
      title: 'Section 1: Code of Conduct',
      content: [
        'Always represent Mount Moriah professionally and ethically.',
        'Client confidentiality is paramount. Do not disclose client information without consent.',
        'Maintain a positive and collaborative relationship with fellow agents.',
      ],
    },
    {
      title: 'Section 2: RESA Compliance (RA 9646)',
      content: [
        'All marketing materials must be approved by the marketing department.',
        'You must clearly identify yourself as a "Marketing Associate" or "Salesperson" of Mount Moriah, not a licensed broker unless you are one.',
        'All transactions must be coursed through the official company channels.',
        'Price lists are confidential. Do not post them publicly on social media or other platforms.',
      ],
    },
    {
      title: 'Section 3: Sales Process',
      content: [
        'Client registration is mandatory upon first contact.',
        'Site trippings must be officially scheduled and logged in the Agent Hub.',
        'First agent to conduct a site tripping (with photo proof) gets client ownership.',
        'All payments must be made directly to Mount Moriah bank accounts. Agents are not authorized to receive payments.',
      ],
    },
];
