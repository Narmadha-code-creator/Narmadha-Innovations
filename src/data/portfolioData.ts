import { Project, SkillCategory, Experience } from '../types';

export const personalInfo = {
  name: 'NARMADHA S D',
  title: 'B.Tech IT Student | Developer | Tech Innovator',
  headline: 'Building Technology. Creating Impact. Turning Ideas into Innovation.',
  subtitle: 'B.Tech Information Technology student, developer, and technology innovator passionate about building meaningful digital solutions through software development, AI/ML, and creative problem-solving.',
  bio: `I am Narmadha S D, a 2nd Year B.Tech Information Technology student at Sri Sairam Engineering College, Chennai. I enjoy transforming complex challenges into practical, human-centered digital solutions through software engineering, artificial intelligence, and collaborative problem-solving. Alongside my academic pursuits (maintaining an 8.55/10 CGPA), I actively serve as a Business Development Officer at DAKH Edu Solutions and lead student innovation teams in competitive national hackathons.`,
  profilePhoto: '/images/profile.jpg',
  college: 'Sri Sairam Engineering College',
  location: 'Chennai, Tamil Nadu, India',
  degree: 'B.Tech in Information Technology (2nd Year)',
  graduationYear: '2029',
  cgpa: '8.55 / 10',
  currentRole: 'Business Development Officer at DAKH Edu Solutions',
  githubUsername: 'Narmadha-code-creator',
  githubUrl: 'https://github.com/Narmadha-code-creator',
  linkedinUrl: 'https://www.linkedin.com/in/narmadha-s-d-6716753aa/',
  email: 'narmadha.contact@gmail.com', // Form will dispatch directly via client mailto/API
  resumeUrl: '/resume.pdf',
  badges: [
    'Student Developer',
    'Tech Innovator',
    'AI/ML Enthusiast',
    'Project Builder'
  ],
  stats: [
    { label: 'Academic CGPA', value: '8.55/10' },
    { label: 'Hackathon Wins', value: '3+' },
    { label: 'Active Repositories', value: '12+' },
    { label: 'Expected Grad', value: '2029' }
  ]
};

export const verifiedProjects: Project[] = [
  {
    id: 'manganex-ai',
    title: 'MANGANEX AI — National Mineral Intelligence Command Center',
    category: 'AI/ML',
    shortDescription: 'AI-assisted platform for predictive manganese mineral deposit exploration and command intelligence.',
    problemStatement: 'Subsurface mineral exploration traditionally demands millions in capital expenditure and months of manual geoscientific analysis, delaying critical raw material identification.',
    solutionOverview: 'Engineered a national mineral intelligence platform featuring multi-layer geospatial data visualization, anomaly heatmaps, and a Random Forest machine learning prospectivity model to pinpoint manganese reserves efficiently.',
    myContribution: 'Architected system workflow, built full-stack TypeScript/React command dashboard, and integrated Python FastAPI microservice model inference.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'FastAPI', 'Python', 'Random Forest', 'Tailwind CSS', 'MongoDB Atlas'],
    features: [
      'Interactive geospatial command console with high-contrast tactical styling',
      'Random Forest prospectivity scoring engine',
      'Real-time anomaly heatmaps and mineral reserve metrics',
      'REST API microservice connecting frontend command deck with ML inference backend'
    ],
    githubUrl: 'https://github.com/Narmadha-code-creator/Manganex-ai',
    liveUrl: 'https://manganex.netlify.app/',
    status: 'Active Development',
    featured: true,
    accentColor: 'from-cyan-500 to-blue-600',
    stats: [
      { label: 'Architecture', value: 'Microservices' },
      { label: 'ML Model', value: 'Random Forest' }
    ]
  },
  {
    id: 'varuna06',
    title: 'VARUNA06 — Seafloor Metal-Detection Sensor Platform',
    category: 'Ocean Tech & Innovation',
    shortDescription: 'Deployable marine sensor platform concept for deep ocean metal anomaly detection and resource charting.',
    problemStatement: 'Deep seafloor exploration lacks cost-effective, rapidly deployable sensor nodes capable of logging acoustic and magnetic anomalies without expensive vessel support.',
    solutionOverview: 'Designed VARUNA06 as a low-cost deployable seafloor sensor architecture with an interactive telemetry dashboard for oceanographic survey data, acoustic threshold monitoring, and seafloor metal prospectivity visualization.',
    myContribution: 'Created the telemetry dashboard interface, ocean-depth theme system, and anomaly data visualizer using Space Grotesk and IBM Plex Mono typography.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Canvas API', 'Telemetry Data Simulation', 'Responsive UI'],
    features: [
      'Bespoke abyss/oceanic theme with dynamic radial gradients and contour lines',
      'Acoustic and electromagnetic anomaly tracking graphs',
      'Real-time prospectivity index meter and depth status indicators',
      'Lightweight, zero-bloat browser client for field operations'
    ],
    githubUrl: 'https://github.com/Narmadha-code-creator/varua06',
    status: 'Prototype',
    featured: true,
    accentColor: 'from-blue-600 to-cyan-400',
    stats: [
      { label: 'Domain', value: 'Marine Tech' },
      { label: 'Sensor Mode', value: 'Acoustic/EM' }
    ]
  },
  {
    id: 'therapyjoy-chatbot',
    title: 'TherapyJoy — Healthcare & Emotional Support AI Chatbot',
    category: 'AI/ML',
    shortDescription: 'Supportive AI conversational companion offering rapid mental wellness guidance and empathetic dialogue.',
    problemStatement: 'Immediate, stigma-free emotional support is inaccessible to millions of students and young professionals undergoing academic and workplace stress.',
    solutionOverview: 'Built TherapyJoy using OpenAI GPT-4o-mini to provide fast, warm, and structured supportive responses with conversational context caching and optional MongoDB session storage.',
    myContribution: 'Engineered conversational prompting strategies, user message parsing, and Node.js backend proxy to protect API keys.',
    technologies: ['OpenAI GPT-4o-mini', 'Node.js', 'Express', 'MongoDB', 'JavaScript', 'REST API'],
    features: [
      'Empathetic conversational response system tuned for stress-relief and wellness',
      'Sub-second response streaming via OpenAI GPT-4o-mini',
      'Secure backend proxy architecture keeping API keys safe on the server',
      'Session history persistence with MongoDB'
    ],
    githubUrl: 'https://github.com/Narmadha-code-creator/therapyjoy_chatbot',
    status: 'Active Development',
    featured: true,
    accentColor: 'from-purple-600 to-pink-500',
    stats: [
      { label: 'AI Model', value: 'GPT-4o-mini' },
      { label: 'Response Time', value: '< 1s' }
    ]
  },
  {
    id: 'healthcare-pro',
    title: 'Healthcare Pro — AI Predictive Risk Assessment System',
    category: 'Full-Stack Systems',
    shortDescription: 'Full-stack healthcare web app predicting clinical risks with PostgreSQL persistence and JWT security.',
    problemStatement: 'Early warning signs for lifestyle and chronic diseases often go undetected without accessible digital screening tools.',
    solutionOverview: 'Developed a comprehensive full-stack platform that analyzes patient health metrics to predict health risk categories while maintaining strict relational database integrity and authenticated access.',
    myContribution: 'Designed PostgreSQL relational schemas, built JWT authentication flows, and connected React UI with Node/Express endpoints.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL', 'JWT Authentication', 'Axios', 'Tailwind CSS'],
    features: [
      'Secure role-based login and JSON Web Token (JWT) session lifecycle',
      'Clinical risk prediction calculator based on biometric inputs',
      'Relational medical profile records in PostgreSQL',
      'Clean tabular health history logs with export capability'
    ],
    githubUrl: 'https://github.com/Narmadha-code-creator/healthcare-pro',
    status: 'Completed',
    featured: true,
    accentColor: 'from-emerald-500 to-teal-700',
    stats: [
      { label: 'Database', value: 'PostgreSQL' },
      { label: 'Security', value: 'JWT Auth' }
    ]
  },
  {
    id: 'maverick-platform',
    title: 'Maverick Coding Platform — Hexaware Training Dashboard',
    category: 'Education',
    shortDescription: 'Full-stack MERN application for structured coding practice, live problem-solving, and performance analytics.',
    problemStatement: 'Training institutions struggle to monitor batch-level coding progression and track individual student milestone metrics effectively.',
    solutionOverview: 'Created a collaborative coding and training management system with role-based access for students and instructors, dynamic progress analytics, and structured problem categories.',
    myContribution: 'Implemented responsive student dashboards, progress visualization charts, and MongoDB data aggregation pipelines.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Chart.js', 'REST API'],
    features: [
      'Role-based dashboards for students, instructors, and batch managers',
      'Structured coding curriculum with milestone checklists',
      'Visual performance analytics and score breakdowns',
      'Dynamic problem submission and review system'
    ],
    githubUrl: 'https://github.com/Narmadha-code-creator/training-dashboard-platform-hexaware-project',
    status: 'Completed',
    featured: false,
    accentColor: 'from-amber-500 to-orange-600',
    stats: [
      { label: 'Stack', value: 'MERN' },
      { label: 'Target', value: 'Hexaware Project' }
    ]
  },
  {
    id: 'shopease-app',
    title: 'ShopEase — Modern E-Commerce Application',
    category: 'Web Development',
    shortDescription: 'High-performance online shopping storefront featuring real-time cart calculation and seamless checkout.',
    problemStatement: 'Online shoppers frequently drop off due to cumbersome cart interactions and sluggish catalog filtering.',
    solutionOverview: 'Engineered a modern web storefront with dynamic client-side filtering, state-synchronized cart operations, and streamlined order placement workflows.',
    myContribution: 'Built the front-end shopping application, state management for cart items, and mock order settlement API.',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'REST API', 'Local Storage State'],
    features: [
      'Instant search and category-based product filtering',
      'Persistent shopping cart with quantity adjustments and coupon logic',
      'Clean checkout confirmation and order summary modal',
      'Optimized responsive layouts across mobile and tablet viewports'
    ],
    githubUrl: 'https://github.com/Narmadha-code-creator/codealpha_tasks',
    status: 'Completed',
    featured: false,
    accentColor: 'from-indigo-600 to-purple-600',
    stats: [
      { label: 'Domain', value: 'E-Commerce' },
      { label: 'State', value: 'Client-side' }
    ]
  },
  {
    id: 'dakh-lms',
    title: 'DAKH LMS — Educational Management Platform',
    category: 'Education',
    shortDescription: 'Comprehensive learning management portal designed to streamline course delivery and student engagement.',
    problemStatement: 'Educational startups need centralized tools to distribute curated materials, manage student cohorts, and track learning outcomes.',
    solutionOverview: 'Conceptualized and developed modular LMS architectures in alignment with business development objectives at DAKH Edu Solutions.',
    myContribution: 'Led requirement scoping, UI wireframes, and cohort management module design.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS'],
    features: [
      'Course catalog and module access management',
      'Interactive student progress timeline',
      'Resource distribution hub for educational materials'
    ],
    status: 'Concept & Architecture',
    featured: false,
    accentColor: 'from-purple-700 to-indigo-800',
    stats: [
      { label: 'Organization', value: 'DAKH Edu' },
      { label: 'Phase', value: 'Architecture' }
    ]
  },
  {
    id: 'ai-personal-tutor',
    title: 'AI Personal Tutor — Adaptive Learning Assistant',
    category: 'AI/ML',
    shortDescription: 'Personalized learning ed-tech system that adapts explanation depth to individual student comprehension levels.',
    problemStatement: 'Students learn at different paces; standard textbooks cannot provide instant clarification for specific concept queries.',
    solutionOverview: 'Developed an adaptive tutoring assistant interface that synthesizes educational concepts, provides step-by-step problem breakdowns, and generates self-assessment quizzes.',
    myContribution: 'Formulated pedagogical prompt templates and conversational tutor UI.',
    technologies: ['Python', 'OpenAI API', 'React', 'FastAPI'],
    features: [
      'Adaptive explanation complexity based on user feedback',
      'Step-by-step mathematical and code problem walk-throughs',
      'Automated quiz generation for knowledge verification'
    ],
    status: 'Active Development',
    featured: false,
    accentColor: 'from-violet-600 to-cyan-500',
    stats: [
      { label: 'Category', value: 'EdTech' },
      { label: 'Engine', value: 'LLM-Powered' }
    ]
  }
];

export const skillCategories: SkillCategory[] = [
  {
    title: 'Programming Languages',
    description: 'Foundational languages used for systems programming, data structures, and application logic.',
    iconName: 'Code2',
    skills: [
      { name: 'C', level: 'Intermediate' },
      { name: 'C++', level: 'Intermediate' },
      { name: 'Java', level: 'Intermediate' },
      { name: 'Python', level: 'Advanced' },
      { name: 'Go', level: 'Familiar' },
      { name: 'JavaScript (ES6+)', level: 'Advanced' },
      { name: 'TypeScript', level: 'Proficient' }
    ]
  },
  {
    title: 'Frontend Development',
    description: 'Modern component architectures, reactive state, and responsive visual design systems.',
    iconName: 'Layout',
    skills: [
      { name: 'React.js', level: 'Advanced' },
      { name: 'Vite', level: 'Advanced' },
      { name: 'Tailwind CSS', level: 'Advanced' },
      { name: 'HTML5 Semantic', level: 'Advanced' },
      { name: 'CSS3 / Modern Flex & Grid', level: 'Advanced' },
      { name: 'Responsive UI/UX', level: 'Advanced' }
    ]
  },
  {
    title: 'Backend & APIs',
    description: 'Server architectures, microservices, REST APIs, and authentication mechanisms.',
    iconName: 'Server',
    skills: [
      { name: 'Node.js', level: 'Proficient' },
      { name: 'Express.js', level: 'Proficient' },
      { name: 'RESTful API Design', level: 'Proficient' },
      { name: 'FastAPI (Python)', level: 'Intermediate' },
      { name: 'JWT Authentication', level: 'Intermediate' }
    ]
  },
  {
    title: 'Databases & Storage',
    description: 'Relational data modeling, document stores, and persistent data warehousing.',
    iconName: 'Database',
    skills: [
      { name: 'PostgreSQL', level: 'Proficient' },
      { name: 'MongoDB', level: 'Proficient' },
      { name: 'MySQL', level: 'Intermediate' }
    ]
  },
  {
    title: 'Tools & Platforms',
    description: 'Version control, developer workflows, containerization, and deployment infrastructure.',
    iconName: 'Wrench',
    skills: [
      { name: 'Git & GitHub', level: 'Advanced' },
      { name: 'Docker', level: 'Intermediate' },
      { name: 'Linux CLI', level: 'Intermediate' },
      { name: 'Vercel / Netlify', level: 'Proficient' },
      { name: 'Postman', level: 'Proficient' }
    ]
  },
  {
    title: 'Emerging Tech & AI/ML',
    description: 'Applied machine learning, generative AI, and intelligent sensor system exploration.',
    iconName: 'Sparkles',
    skills: [
      { name: 'Machine Learning (Scikit-Learn)', level: 'Intermediate' },
      { name: 'Prompt Engineering & LLMs', level: 'Proficient' },
      { name: 'AI Chatbot Engineering', level: 'Proficient' },
      { name: 'Random Forest Models', level: 'Intermediate' },
      { name: 'Ocean Tech & Mineral Intelligence', level: 'Specialized' }
    ]
  }
];

export const experienceData: Experience[] = [
  {
    id: 'dakh-bdo',
    role: 'Business Development Officer',
    organization: 'DAKH Edu Solutions',
    type: 'Professional Role',
    duration: '2025 - Present',
    location: 'Chennai, India',
    description: [
      'Spearheading outreach strategies, educational partner onboarding, and technical solution coordination for digital learning programs.',
      'Collaborating across engineering and academic stakeholders to refine digital product requirements including LMS architectures.',
      'Evaluating emerging educational technologies and AI-assisted workflows to accelerate company development initiatives.'
    ],
    technologies: ['Strategic Planning', 'Technical Outreach', 'LMS Architecture', 'Product Scoping'],
    verified: true
  },
  {
    id: 'srm-hackathon-leader',
    role: 'Hackathon Team Lead & Innovator',
    organization: 'SRM Bharat Build Hackathon & CASYUM',
    type: 'Leadership & Innovation',
    duration: 'September 2026',
    location: 'SRMIST, Kattankulathur & Ramapuram',
    description: [
      'Led project ideation, architectural design, and prototype development that secured the "Best Innovation Award" at SRM Bharat Build Hackathon (TerraNext Startup Summit 2.0).',
      'Secured 1st Prize in Hackathon and 2nd Prize in Tech Quiz at the National Level Intercollegiate Symposium CASYUM 2026.',
      'Represented Sri Sairam Engineering College across multi-college competitive engineering venues.'
    ],
    technologies: ['Rapid Prototyping', 'System Design', 'Technical Presentation', 'Competitive Problem Solving'],
    verified: true
  },
  {
    id: 'sairam-student-innovator',
    role: 'Student Developer & Technology Innovator',
    organization: 'Sri Sairam Engineering College',
    type: 'Community & Projects',
    duration: '2025 - Present (Expected 2029)',
    location: 'Chennai, India',
    description: [
      'Active developer in the Information Technology department, maintaining a top-tier 8.55/10 CGPA while driving hands-on software builds.',
      'Won the Overall Symposium Winner Trophy at Sri Sairam Engineering College.',
      'Participated in hands-on technical workshops including the n8n Workflow Automation workshop (awarded 2nd Prize in Tech Quiz).'
    ],
    technologies: ['Data Structures', 'Full-Stack Development', 'AI/ML', 'Workflow Automation'],
    verified: true
  }
];

export const educationData = {
  institution: 'Sri Sairam Engineering College',
  degree: 'Bachelor of Technology (B.Tech)',
  major: 'Information Technology',
  currentYear: '2nd Year',
  duration: '2025 - 2029 (Expected)',
  cgpa: '8.55 / 10',
  location: 'Chennai, Tamil Nadu, India',
  highlights: [
    'Strong academic standing with an 8.55/10 cumulative grade point average',
    'Core coursework in Data Structures, Object-Oriented Programming, Database Systems, Computer Networks, and AI Concepts',
    'Overall Symposium Winner Trophy honoree representing the department',
    'Active participant in departmental innovation labs, technical hackathons, and workshop forums'
  ]
};
