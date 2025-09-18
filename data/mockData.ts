import { UserRole, Conversation } from '../types';

export const promotionCriteria: Record<UserRole, any> = {
  Agent: {}, // Base role
  Manager: {
    minLots: 10,
    minRecruits: 5,
    minSQM: 2000,
    minTenureMonths: 12,
    minCommissionEarned: 500000,
  },
  Admin: {
    minLots: 50, // Team sales
    minRecruits: 20, // Team recruits
    minTenureMonths: 24,
  },
  Superadmin: {
      minTenureMonths: 36,
  }
};

export const commissions = [
    { id: 1, date: '2025-07-25', clientName: 'Juan Dela Cruz', lotCode: 'PH1-B3-L5', amount: 20000.00, type: 'Direct' },
    { id: 2, date: '2025-07-20', clientName: 'Maria Santos', lotCode: 'PH1-B3-L6', amount: 20000.00, type: 'Direct' },
    { id: 3, date: '2025-07-15', clientName: 'John Doe (from Recruit)', lotCode: 'PH2A-B1-L2', amount: 5000.00, type: 'Override' },
    { id: 4, date: '2025-06-30', clientName: 'Jane Smith', lotCode: 'PH1-B2-L1', amount: 35000.00, type: 'Direct' },
];

export const siteTrippingRequests = [
    { id: 1, agentId: 'AG-001', clientName: 'Mr. Reyes', date: '2025-08-12', status: 'Approved' },
    { id: 2, agentId: 'AG-002', clientName: 'Ms. Santos', date: '2025-08-10', status: 'Pending Admin Approval' },
    { id: 3, agentId: 'AG-003', clientName: 'Dela Cruz Family', date: '2025-07-18', status: 'Completed' },
    { id: 4, agentId: 'AG-001', clientName: 'Mr. Garcia', date: '2025-06-02', status: 'Pending Superadmin Finalization' },
];

export const payments = [
    { id: 1, agentId: 'AG-001', clientName: 'Juan Dela Cruz', amount: 10000, isValidated: true },
    { id: 2, agentId: 'AG-002', clientName: 'Maria Santos', amount: 10000, isValidated: false },
    { id: 3, agentId: 'AG-001', clientName: 'John Doe', amount: 15000, isValidated: false },
];

export const promotionApplications = [
    { id: 1, agentId: 'AG-001', toRole: 'Manager', status: 'Pending Manager Endorsement' },
    { id: 2, agentId: 'AG-003', toRole: 'Manager', status: 'Pending Superadmin Approval' },
];

export const handbookContent = [
    {
      title: "1. Code of Conduct",
      content: [
        "Maintain professionalism at all times when dealing with clients and colleagues.",
        "Uphold the company's reputation through ethical practices.",
        "Respect client confidentiality and data privacy.",
      ],
    },
    {
      title: "2. RESA Compliance (Real Estate Service Act)",
      content: [
        "All agents must operate under a licensed real estate broker designated by the company.",
        "Do not mislead clients or make false promises about properties.",
        "Ensure all legal documents are properly filled out and explained to the client.",
      ],
    },
    {
      title: "3. Marketing & Publishing Guidelines",
      content: [
        "Do not post specific lot plans or detailed pricing on public social media.",
        "All marketing materials must use company-approved templates.",
        "Every online post must include the disclaimer: 'I am a Marketing Associate of Mount Moriah, not yet a licensed broker.'",
      ],
    },
     {
      title: "4. Client Ownership & Tripping",
      content: [
        "The first agent to conduct a site tripping with a client gains ownership. This must be documented with a photo of the agent and client at the site.",
        "All leads, inquiries, and trippings must be logged in the Agent Hub.",
        "Client ownership disputes will be settled by management based on system logs.",
      ],
    },
     {
      title: "5. Sales & Commission",
      content: [
        "Agents do not collect payments directly. All payments must be made to the company's official bank accounts.",
        "Submit proof of payment through the 'Log a Sale' module for validation.",
        "Commissions are released based on the company's official payout schedule, after validation.",
      ],
    },
];


export const conversations: Conversation[] = [
    {
        id: 'CONV-001',
        participants: ['AG-001', 'MG-001'],
        messages: [
            { id: 'msg-1', senderId: 'MG-001', text: 'Hi Angelyn, can you send over the latest lot plan for Phase 2A?', timestamp: '10:30 AM', status: 'read' },
            { id: 'msg-2', senderId: 'AG-001', text: 'Of course, here it is.', timestamp: '10:31 AM', status: 'read' },
            { id: 'msg-3', senderId: 'AG-001', attachment: { type: 'pdf', url: '#', name: 'Phase 2A - Lot Plan.pdf' }, timestamp: '10:31 AM', status: 'read' },
            { id: 'msg-4', senderId: 'MG-001', text: 'Thanks! Also, please check out this marketing image. Let me know what you think.', timestamp: '10:32 AM', status: 'delivered' },
            { id: 'msg-5', senderId: 'MG-001', attachment: { type: 'image', url: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=2070&auto=format&fit=crop', name: 'marketing-image.jpg'}, timestamp: '10:32 AM', status: 'delivered' }
        ]
    },
    {
        id: 'CONV-002',
        participants: ['AG-001', 'AD-001'],
        messages: [
            { id: 'msg-6', senderId: 'AD-001', text: 'Hello, your commission for the Dela Cruz sale has been processed.', timestamp: 'Yesterday', status: 'read' },
            { id: 'msg-7', senderId: 'AG-001', text: 'Great, thank you for the update!', timestamp: 'Yesterday', status: 'read' },
        ]
    },
    {
        id: 'CONV-003',
        participants: ['AG-001', 'SA-001'],
        messages: [
            { id: 'msg-8', senderId: 'SA-001', text: 'Good morning. Reminder about the mandatory RESA training this Friday.', timestamp: 'Yesterday', status: 'sent' }
        ]
    },
    {
        id: 'CONV-004',
        participants: ['AG-001', 'AG-002'],
        messages: [
            { id: 'msg-9', senderId: 'AG-002', text: 'Hey, are you free for a tripping this weekend?', timestamp: '9:00 AM', status: 'read' },
        ]
    },
    {
        id: 'CONV-005',
        participants: ['AG-001', 'AG-003'],
        messages: [
            { id: 'msg-10', senderId: 'AG-003', text: 'Can you help me with a client inquiry?', timestamp: '8:45 AM', status: 'read' },
        ]
    }
];
