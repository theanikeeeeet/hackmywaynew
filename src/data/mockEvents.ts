// Mock data for hackathon events
export interface HackathonEvent {
  id: string;
  title: string;
  organizer: string;
  platform: 'Devpost' | 'Devfolio' | 'MLH' | 'DoraHacks' | 'Unstop' | 'Corporate' | 'Web3';
  start_time: string;
  end_time: string;
  registration_deadline: string;
  tags: string[];
  mode: 'Online' | 'Offline' | 'Hybrid';
  region: string;
  prize_info?: string;
  verified: boolean;
  skill_level: 'Beginner' | 'Intermediate' | 'Advanced';
  team_size: 'Solo' | '2-3' | '4+';
  description?: string;
}

export const mockEvents: HackathonEvent[] = [
  {
    id: '1',
    title: 'AI for Good Hackathon 2025',
    organizer: 'TechForGood Foundation',
    platform: 'Devpost',
    start_time: '2025-11-15T09:00:00Z',
    end_time: '2025-11-17T18:00:00Z',
    registration_deadline: '2025-11-10T23:59:59Z',
    tags: ['AI', 'Machine Learning', 'Social Impact', 'Beginner-Friendly'],
    mode: 'Online',
    region: 'Global',
    prize_info: '$50,000 in prizes',
    verified: true,
    skill_level: 'Beginner',
    team_size: '2-3',
    description: 'Build AI solutions that make a positive impact on society'
  },
  {
    id: '2',
    title: 'Web3 DeFi Summit Hackathon',
    organizer: 'Blockchain Innovators',
    platform: 'DoraHacks',
    start_time: '2025-11-20T10:00:00Z',
    end_time: '2025-11-22T20:00:00Z',
    registration_deadline: '2025-11-18T23:59:59Z',
    tags: ['Web3', 'DeFi', 'Blockchain', 'Smart Contracts'],
    mode: 'Hybrid',
    region: 'San Francisco, CA',
    prize_info: '$100,000 + NFTs',
    verified: true,
    skill_level: 'Advanced',
    team_size: '4+',
    description: 'Push the boundaries of decentralized finance'
  },
  {
    id: '3',
    title: 'Fintech Innovation Challenge',
    organizer: 'Global Bank Corp',
    platform: 'Corporate',
    start_time: '2025-11-25T08:00:00Z',
    end_time: '2025-11-27T17:00:00Z',
    registration_deadline: '2025-11-22T23:59:59Z',
    tags: ['Fintech', 'Banking', 'APIs', 'Security'],
    mode: 'Offline',
    region: 'New York, NY',
    prize_info: '$75,000 + Internship',
    verified: true,
    skill_level: 'Intermediate',
    team_size: '2-3',
    description: 'Transform the future of digital banking'
  },
  {
    id: '4',
    title: 'Campus Hack 2025',
    organizer: 'MLH',
    platform: 'MLH',
    start_time: '2025-11-12T09:00:00Z',
    end_time: '2025-11-13T21:00:00Z',
    registration_deadline: '2025-11-08T23:59:59Z',
    tags: ['Student', 'Beginner-Friendly', 'Mobile', 'Web Development'],
    mode: 'Hybrid',
    region: 'Boston, MA',
    prize_info: '$10,000 + Swag',
    verified: true,
    skill_level: 'Beginner',
    team_size: '2-3',
    description: 'Students building the next generation of tech'
  },
  {
    id: '5',
    title: 'Healthcare Innovation Sprint',
    organizer: 'MedTech Ventures',
    platform: 'Devfolio',
    start_time: '2025-12-01T09:00:00Z',
    end_time: '2025-12-03T18:00:00Z',
    registration_deadline: '2025-11-28T23:59:59Z',
    tags: ['Healthcare', 'AI', 'Data Science', 'Mobile'],
    mode: 'Online',
    region: 'Global',
    prize_info: '$30,000 + Mentorship',
    verified: true,
    skill_level: 'Intermediate',
    team_size: '4+',
    description: 'Revolutionize healthcare with technology'
  },
  {
    id: '6',
    title: 'Game Dev Jam 48hr',
    organizer: 'Indie Game Studio',
    platform: 'Unstop',
    start_time: '2025-11-18T18:00:00Z',
    end_time: '2025-11-20T18:00:00Z',
    registration_deadline: '2025-11-17T23:59:59Z',
    tags: ['Gaming', 'Unity', 'Unreal Engine', 'Beginner-Friendly'],
    mode: 'Online',
    region: 'Global',
    prize_info: '$5,000 + Game Keys',
    verified: false,
    skill_level: 'Beginner',
    team_size: 'Solo',
    description: 'Create an amazing game in just 48 hours'
  },
  {
    id: '7',
    title: 'Smart Cities Hackathon',
    organizer: 'Urban Tech Alliance',
    platform: 'Corporate',
    start_time: '2025-12-05T08:00:00Z',
    end_time: '2025-12-07T20:00:00Z',
    registration_deadline: '2025-12-01T23:59:59Z',
    tags: ['IoT', 'Smart Cities', 'Sustainability', 'Data'],
    mode: 'Offline',
    region: 'Singapore',
    prize_info: '$80,000 + Trip',
    verified: true,
    skill_level: 'Advanced',
    team_size: '4+',
    description: 'Build the infrastructure of tomorrow'
  },
  {
    id: '8',
    title: 'EdTech Revolution',
    organizer: 'Learning Labs Inc',
    platform: 'Devpost',
    start_time: '2025-11-22T10:00:00Z',
    end_time: '2025-11-24T16:00:00Z',
    registration_deadline: '2025-11-20T23:59:59Z',
    tags: ['EdTech', 'AI', 'Gamification', 'Beginner-Friendly'],
    mode: 'Online',
    region: 'Global',
    prize_info: '$25,000 + Licenses',
    verified: true,
    skill_level: 'Beginner',
    team_size: '2-3',
    description: 'Transform education through technology'
  }
];
