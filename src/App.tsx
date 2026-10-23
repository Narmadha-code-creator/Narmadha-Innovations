import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Achievements } from './components/Achievements';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { ResumeSection } from './components/ResumeSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { PhotoManagerModal } from './components/PhotoManagerModal';
import { getSavedGalleryPhotos } from './data/galleryData';
import { UploadedPhoto } from './types';

export const App: React.FC = () => {
  const [isPhotoManagerOpen, setIsPhotoManagerOpen] = useState(false);
  const [customPhotos, setCustomPhotos] = useState<UploadedPhoto[]>([]);

  useEffect(() => {
    // Load any saved photos from localStorage
    const saved = getSavedGalleryPhotos();
    // Only set non-default custom photos
    const customOnly = saved.filter(p => p.id.startsWith('photo-') && !p.id.includes('hero') && !p.id.includes('bharat') && !p.id.includes('casyum') && !p.id.includes('trophy') && !p.id.includes('n8n'));
    setCustomPhotos(customOnly);
  }, []);

  const handlePhotoAdded = (photo: UploadedPhoto) => {
    setCustomPhotos(prev => [photo, ...prev]);
  };

  return (
    <div className="min-h-screen bg-lavender-50 font-sans text-slate-800 flex flex-col selection:bg-purple-brand selection:text-white">
      {/* Navigation Bar */}
      <Navbar onOpenPhotoManager={() => setIsPhotoManagerOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        <Hero onOpenPhotoManager={() => setIsPhotoManagerOpen(true)} />
        <About />
        <Skills />
        <Projects />
        <Achievements
          customPhotos={customPhotos}
          onOpenPhotoManager={() => setIsPhotoManagerOpen(true)}
        />
        <Experience />
        <Education />
        <ResumeSection />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Photo Management Modal */}
      <PhotoManagerModal
        isOpen={isPhotoManagerOpen}
        onClose={() => setIsPhotoManagerOpen(false)}
        onPhotoAdded={handlePhotoAdded}
      />
    </div>
  );
};

export default App;
