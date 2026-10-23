import { UploadedPhoto } from '../types';

export const initialGalleryPhotos: UploadedPhoto[] = [
  {
    id: 'photo-hero-profile',
    title: 'Professional Portrait — Narmadha S D',
    eventName: 'Official Professional Portfolio Session',
    date: '2026',
    category: 'Profile',
    description: 'Studio executive portrait of Narmadha S D, Student Developer and Tech Innovator.',
    dataUrl: '/images/profile.jpg',
    storageType: 'local'
  },
  {
    id: 'photo-bharat-build',
    title: 'SRM Bharat Build Hackathon Best Innovation Award',
    eventName: 'Bharat Build Hackathon — Startup Summit 2.0 TerraNext',
    date: 'September 8, 2026',
    category: 'Hackathons',
    description: 'Award ceremony and certificate presentation at Tech Park, SRMIST Kattankulathur campus.',
    dataUrl: '/images/bharat-build-hackathon.jpg',
    storageType: 'local'
  },
  {
    id: 'photo-casyum-2026',
    title: 'CASYUM 2026 Double Honor — 1st Hackathon & 2nd Tech Quiz',
    eventName: 'National Level Intercollegiate Symposium CASYUM 2026',
    date: 'September 19, 2026',
    category: 'Symposiums',
    description: 'Gold and Silver medals with official Certificates of Appreciation from SRMIST Ramapuram.',
    dataUrl: '/images/casyum-awards.jpg',
    storageType: 'local'
  },
  {
    id: 'photo-overall-trophy',
    title: 'Overall Symposium Winner Championship Trophy',
    eventName: 'Annual College Technical Symposium',
    date: '2026',
    category: 'Awards',
    description: 'Holding the championship trophy celebrating the overall symposium victory at Sri Sairam Engineering College.',
    dataUrl: '/images/overall-trophy.jpg',
    storageType: 'local'
  },
  {
    id: 'photo-n8n-workshop',
    title: 'n8n Workflow Automation & Tech Challenge Recognition',
    eventName: 'n8n Hands-on Masterclass',
    date: '2026',
    category: 'Workshops',
    description: 'Certificate and honors presentation for securing 2nd prize in the post-workshop technical quiz.',
    dataUrl: '/images/n8n-workshop.jpg',
    storageType: 'local'
  }
];

export const STORAGE_KEYS = {
  GALLERY: 'narmadha_portfolio_gallery_photos_v1',
  PROJECT_OVERWRITES: 'narmadha_portfolio_custom_projects_v1'
};

/**
 * Load gallery photos from localStorage with fallback to default verified records
 */
export function getSavedGalleryPhotos(): UploadedPhoto[] {
  if (typeof window === 'undefined') return initialGalleryPhotos;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.GALLERY);
    if (!raw) return initialGalleryPhotos;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : initialGalleryPhotos;
  } catch (e) {
    console.error('Failed to parse saved gallery photos', e);
    return initialGalleryPhotos;
  }
}

/**
 * Save new photo into browser localStorage
 */
export function saveGalleryPhoto(photo: UploadedPhoto): UploadedPhoto[] {
  const current = getSavedGalleryPhotos();
  const updated = [photo, ...current];
  try {
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(updated));
  } catch (e) {
    console.warn('Storage limit reached or error saving photo:', e);
  }
  return updated;
}
