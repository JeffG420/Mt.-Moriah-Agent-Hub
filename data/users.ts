import { User } from '../types';

export const users: User[] = [
  // Superadmin
  { 
    agentId: 'SA-001', 
    name: 'Jeff Ryan Galera', 
    location: 'Head Office', 
    contact: '0912-345-6789', 
    email: 'superadmin@mountmoriah.com', 
    role: 'Superadmin',
    password: 'password123',
    team: 'Management',
    joinDate: '2022-01-01',
    avatarUrl: `https://api.dicebear.com/8.x/initials/svg?seed=Jeff%20Ryan%20Galera`,
    stats: { lotsSold: 150, recruits: 50, sqmSold: 30000, tenureMonths: 36, commissionEarned: 10000000 },
  },
  // Admin
  { 
    agentId: 'AD-001', 
    name: 'Admin Angela', 
    location: 'Head Office', 
    contact: '0912-345-6780', 
    email: 'admin@mountmoriah.com', 
    role: 'Admin',
    password: 'password123',
    team: 'Operations',
    joinDate: '2023-01-01',
    avatarUrl: `https://api.dicebear.com/8.x/initials/svg?seed=Admin%20Angela`,
    stats: { lotsSold: 0, recruits: 0, sqmSold: 0, tenureMonths: 24, commissionEarned: 0 },
  },
   // Manager
  { 
    agentId: 'MG-001', 
    name: 'Moises Buyagawan', 
    location: 'Bonfal Proper, Bayombong, Nueva Vizcaya', 
    contact: '0948-856-6681', 
    email: 'moisesr7lite@gmail.com',
    role: 'Manager',
    password: 'password123',
    team: 'Team Alpha',
    joinDate: '2023-06-10',
    avatarUrl: `https://api.dicebear.com/8.x/initials/svg?seed=Moises%20Buyagawan`,
    stats: { lotsSold: 25, recruits: 15, sqmSold: 5000, tenureMonths: 14, commissionEarned: 950000 },
   },
  // Agent
  { 
    agentId: 'AG-001', 
    name: 'Angelyn Real', 
    location: 'Solano, Nueva Vizcaya', 
    contact: '0917-123-4567', 
    email: 'angelyn@mountmoriah.com',
    role: 'Agent',
    password: 'password123',
    team: 'Team Alpha',
    joinDate: '2025-01-15',
    avatarUrl: `https://api.dicebear.com/8.x/initials/svg?seed=Angelyn%20Real`,
    stats: { lotsSold: 4, recruits: 8, sqmSold: 800, tenureMonths: 7, commissionEarned: 140000 },
  },
  { agentId: 'AG-002', name: 'Maricel Gargasin', location: '-', contact: '-', email: 'maricel@mountmoriah.com', role: 'Agent', password: 'password123', team: 'Team Bravo', joinDate: '2025-02-20', avatarUrl: `https://api.dicebear.com/8.x/initials/svg?seed=Maricel%20Gargasin`, stats: { lotsSold: 2, recruits: 1, sqmSold: 300, tenureMonths: 6, commissionEarned: 60000 } },
  { agentId: 'AG-003', name: 'Ma. Cristina Perez', location: 'Solano, Nueva Vizcaya', contact: '-', email: 'cristina@mountmoriah.com', role: 'Agent', password: 'password123', team: 'Team Charlie', joinDate: '2025-03-01', avatarUrl: `https://api.dicebear.com/8.x/initials/svg?seed=Ma%20Cristina%20Perez`, stats: { lotsSold: 5, recruits: 3, sqmSold: 950, tenureMonths: 5, commissionEarned: 180000 } },
];