export type ProjectCategory = 'All' | 'AI/ML' | 'Web Development' | 'Ocean Tech & Innovation' | 'Full-Stack Systems' | 'Education';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  shortDescription: string;
  problemStatement: string;
  solutionOverview: string;
  myContribution: string;
  technologies: string[];
  features: string[];
  githubUrl?: string;
  liveUrl?: string;
  status: 'Completed' | 'Active Development' | 'Prototype' | 'Concept & Architecture';
  featured: boolean;
  accentColor: string;
  stats?: { label: string; value: string }[];
}

export type AchievementCategory = 'All' | 'Hackathons' | 'Awards' | 'Workshops' | 'Symposiums' | 'Certificates';

export interface Achievement {
  id: string;
  title: string;
  award: string;
  eventName: string;
  organizer: string;
  date: string;
  category: AchievementCategory;
  description: string;
  image: string;
  prize?: string;
  verified: boolean;
  eventLink?: string;
  badge: string;
  certificatePdf?: string;
}

export interface SkillItem {
  name: string;
  level?: string;
  icon?: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  iconName: string;
  skills: SkillItem[];
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  type: 'Professional Role' | 'Internship' | 'Leadership & Innovation' | 'Community & Projects';
  duration: string;
  location: string;
  description: string[];
  technologies?: string[];
  verified: boolean;
}

export interface UploadedPhoto {
  id: string;
  title: string;
  eventName: string;
  date: string;
  category: string;
  description: string;
  dataUrl: string;
  storageType: 'local' | 'cloud';
}
