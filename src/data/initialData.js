export const PIPELINE_STAGES = [
  { id: 'applied', label: 'Applied', color: '#60A5FA' },
  { id: 'screening', label: 'Screening', color: '#FBBF24' },
  { id: '1st_interview', label: '1st Interview', color: '#FF9800' },
  { id: 'technical', label: 'Technical', color: '#A78BFA' },
  { id: 'managerial', label: 'Managerial', color: '#F472B6' },
  { id: 'offer', label: 'Offer Extended', color: '#38BDF8' },
  { id: 'hired', label: 'Hired', color: '#34D399' },
  { id: 'rejected', label: 'Rejected', color: '#F87171' }
];

export const SOURCES = [
  'Indeed',
  'LinkedIn',
  'Referral',
  'Career Page',
  'Agency',
  'Direct Application'
];

export const FEEDBACK_STATUSES = [
  'Pending Feedback',
  'Passed',
  'Scheduled',
  'Needs Review',
  'Under Review',
  'Rejected'
];

export const INITIAL_CANDIDATES = [
  {
    id: 'cand-1',
    name: 'Unnamed Candidate',
    email: 'candidate1@example.com',
    phone: '+1 (555) 234-5678',
    role: 'Full Stack Developer',
    department: 'Engineering',
    stage: '1st_interview',
    source: 'Indeed',
    status: 'Pending Feedback',
    interviewDate: '2026-08-26',
    interviewTime: '10:00 AM',
    interviewer: 'Mr Tarun',
    rating: 4,
    experience: '4+ Years',
    salaryExpectation: '$120,000 / yr',
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
    notes: 'Strong knowledge of modern front-end frameworks and REST API design. Waiting for technical round confirmation.',
    scorecard: {
      technical: 4,
      communication: 4,
      problemSolving: 5,
      cultureFit: 4
    },
    appliedDate: '2026-08-20'
  },
  {
    id: 'cand-2',
    name: 'Unnamed Candidate',
    email: 'candidate2@example.com',
    phone: '+1 (555) 876-5432',
    role: 'Full Stack Developer',
    department: 'Engineering',
    stage: '1st_interview',
    source: 'LinkedIn',
    status: 'Pending Feedback',
    interviewDate: '2026-08-26',
    interviewTime: '02:00 PM',
    interviewer: 'Mr Tarun',
    rating: 5,
    experience: '6+ Years',
    salaryExpectation: '$135,000 / yr',
    skills: ['React', 'Python', 'AWS', 'Docker'],
    notes: 'Exceeded expectations on system design questions.',
    scorecard: {
      technical: 5,
      communication: 4,
      problemSolving: 5,
      cultureFit: 5
    },
    appliedDate: '2026-08-21'
  },
  {
    id: 'cand-3',
    name: 'Unnamed Candidate',
    email: 'candidate3@example.com',
    phone: '+1 (555) 345-6789',
    role: 'Full Stack Developer',
    department: 'Engineering',
    stage: '1st_interview',
    source: 'Referral',
    status: 'Pending Feedback',
    interviewDate: '2026-08-27',
    interviewTime: '11:30 AM',
    interviewer: 'Mr Tarun',
    rating: 4,
    experience: '3 Years',
    salaryExpectation: '$110,000 / yr',
    skills: ['Vue.js', 'Django', 'PostgreSQL'],
    notes: 'Referred by internal senior engineer.',
    scorecard: {
      technical: 4,
      communication: 5,
      problemSolving: 4,
      cultureFit: 4
    },
    appliedDate: '2026-08-22'
  },
  {
    id: 'cand-4',
    name: 'Unnamed Candidate',
    email: 'candidate4@example.com',
    phone: '+1 (555) 987-6543',
    role: 'Full Stack Developer',
    department: 'Engineering',
    stage: '1st_interview',
    source: 'Indeed',
    status: 'Pending Feedback',
    interviewDate: '2026-08-28',
    interviewTime: '04:00 PM',
    interviewer: 'Mr Tarun',
    rating: 3,
    experience: '5 Years',
    salaryExpectation: '$125,000 / yr',
    skills: ['React', 'Express', 'MongoDB'],
    notes: 'Solid background in fullstack JavaScript development.',
    scorecard: {
      technical: 3,
      communication: 4,
      problemSolving: 3,
      cultureFit: 4
    },
    appliedDate: '2026-08-23'
  },
  {
    id: 'cand-5',
    name: 'Sarah Chen',
    email: 'sarah.chen@techmail.com',
    phone: '+1 (555) 432-1098',
    role: 'Senior Product Manager',
    department: 'Product',
    stage: 'screening',
    source: 'LinkedIn',
    status: 'Scheduled',
    interviewDate: '2026-08-29',
    interviewTime: '01:00 PM',
    interviewer: 'Jessica Miller',
    rating: 5,
    experience: '8 Years',
    salaryExpectation: '$165,000 / yr',
    skills: ['Product Strategy', 'Agile', 'Data Analytics', 'UX Research'],
    notes: 'Managed enterprise SaaS products scaling from 0 to 1M users.',
    scorecard: {
      technical: 4,
      communication: 5,
      problemSolving: 5,
      cultureFit: 5
    },
    appliedDate: '2026-08-24'
  },
  {
    id: 'cand-6',
    name: 'Alex Morgan',
    email: 'alex.m@cloudcorp.com',
    phone: '+1 (555) 654-3210',
    role: 'DevOps Engineer',
    department: 'Infrastructure',
    stage: 'technical',
    source: 'Career Page',
    status: 'Under Review',
    interviewDate: '2026-08-30',
    interviewTime: '03:30 PM',
    interviewer: 'David Vance',
    rating: 4,
    experience: '5 Years',
    salaryExpectation: '$140,000 / yr',
    skills: ['Kubernetes', 'Terraform', 'CI/CD', 'GCP'],
    notes: 'Demonstrated exceptional knowledge of GCP Cloud infrastructure automation.',
    scorecard: {
      technical: 5,
      communication: 4,
      problemSolving: 4,
      cultureFit: 4
    },
    appliedDate: '2026-08-19'
  }
];
