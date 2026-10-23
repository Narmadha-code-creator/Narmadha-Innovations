import React, { useState } from 'react';
import {
  X,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Database,
  Trash2,
  Key,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { UploadedPhoto } from '../types';
import { initialGalleryPhotos, saveGalleryPhoto } from '../data/galleryData';

interface PhotoManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPhotoAdded: (photo: UploadedPhoto) => void;
}

export const PhotoManagerModal: React.FC<PhotoManagerModalProps> = ({
  isOpen,
  onClose,
  onPhotoAdded
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'configured' | 'cloud-setup'>('upload');
  
  // Form State
  const [title, setTitle] = useState('');
  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('Hackathons');
  const [description, setDescription] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError(null);
    setIsSuccess(false);

    if (!file) return;

    // Type validation
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setFileError('Invalid format. Please select a valid JPEG, PNG, or WebP image.');
      setPreviewUrl(null);
      return;
    }

    // Size validation (5MB max)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setFileError('File size exceeds 5MB limit. Please select an optimized image under 5MB.');
      setPreviewUrl(null);
      return;
    }

    // Convert to base64 data URL for preview and local storage
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewUrl) {
      setFileError('Please select an image file to upload.');
      return;
    }
    if (!title.trim() || !eventName.trim()) {
      setFileError('Please provide both an Image Title and Event Name.');
      return;
    }

    const newPhoto: UploadedPhoto = {
      id: `photo-${Date.now()}`,
      title: title.trim(),
      eventName: eventName.trim(),
      date: date.trim() || new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      category,
      description: description.trim() || 'Uploaded achievement photograph.',
      dataUrl: previewUrl,
      storageType: 'local'
    };

    saveGalleryPhoto(newPhoto);
    onPhotoAdded(newPhoto);
    setIsSuccess(true);

    // Reset Form
    setTitle('');
    setEventName('');
    setDate('');
    setDescription('');
    setPreviewUrl(null);

    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy-900/65 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl shadow-2xl border border-purple-100 max-w-2xl w-full max-h-[92vh] overflow-y-auto z-10 animate-fadeIn">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-navy-900 via-purple-brand to-navy-900 text-white rounded-t-3xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-accent" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold tracking-tight">Photo & Media Vault</h3>
              <p className="text-xs text-purple-200">
                Manage verified achievement photos and configure persistent storage
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('upload')}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 px-3 transition-colors ${
              activeTab === 'upload'
                ? 'border-purple-brand text-purple-brand'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Add / Upload Photo
          </button>
          <button
            onClick={() => setActiveTab('configured')}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 px-3 transition-colors ${
              activeTab === 'configured'
                ? 'border-purple-brand text-purple-brand'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Current Images ({initialGalleryPhotos.length})
          </button>
          <button
            onClick={() => setActiveTab('cloud-setup')}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 px-3 transition-colors ${
              activeTab === 'cloud-setup'
                ? 'border-purple-brand text-purple-brand'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Cloud Storage Setup
          </button>
        </div>

        {/* Tab 1: Upload Form */}
        {activeTab === 'upload' && (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {isSuccess && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Photo added successfully! Saved to your portfolio gallery.</span>
              </div>
            )}

            {fileError && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-semibold flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <span>{fileError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Image Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Bharat Build Hackathon Best Innovation"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Event Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., SRM Startup Summit 2.0"
                  value={eventName}
                  onChange={e => setEventName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-brand"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-brand bg-white"
                >
                  <option value="Profile">Profile Photos</option>
                  <option value="Hackathons">Hackathon Photos</option>
                  <option value="Awards">Award Photos</option>
                  <option value="Symposiums">Symposium Photos</option>
                  <option value="Certificates">Certificates</option>
                  <option value="Workshops">Workshop Photos</option>
                  <option value="Team">Team Photos</option>
                  <option value="Projects">Project Screenshots</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Date
                </label>
                <input
                  type="text"
                  placeholder="e.g., September 2026"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-brand"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Description & Context
              </label>
              <textarea
                rows={2}
                placeholder="Details about the award, certificate, or project screenshot..."
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-brand"
              />
            </div>

            {/* File Dropzone */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Select Image File (Max 5MB • JPG, PNG, WebP)
              </label>
              <div className="border-2 border-dashed border-slate-300 hover:border-purple-brand rounded-2xl p-4 text-center cursor-pointer transition-colors relative bg-slate-50">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {previewUrl ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="max-h-36 object-contain rounded-xl shadow-sm mb-2"
                    />
                    <span className="text-xs text-purple-700 font-semibold">
                      Click or drag to replace image
                    </span>
                  </div>
                ) : (
                  <div className="py-4">
                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-slate-700">
                      Click to browse or drop an image file
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      JPEG, PNG, or WebP up to 5MB
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs sm:text-sm font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-purple-brand hover:bg-purple-light text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                <span>Save to Portfolio</span>
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: Configured Local Images */}
        {activeTab === 'configured' && (
          <div className="p-6 space-y-4">
            <p className="text-xs sm:text-sm text-slate-600">
              The portfolio uses the central configuration in <code className="bg-slate-100 px-1.5 py-0.5 rounded text-purple-700 font-mono">public/images/</code> and <code className="bg-slate-100 px-1.5 py-0.5 rounded text-purple-700 font-mono">galleryData.ts</code>.
            </p>

            <div className="space-y-3">
              {initialGalleryPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 border border-slate-200"
                >
                  <img
                    src={photo.dataUrl}
                    alt={photo.title}
                    className="w-14 h-14 object-cover rounded-xl shadow-sm border border-slate-200"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-navy-900 truncate">{photo.title}</h4>
                    <p className="text-xs text-slate-500 font-mono truncate">{photo.dataUrl}</p>
                    <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                      {photo.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Cloud Storage Architecture Guide */}
        {activeTab === 'cloud-setup' && (
          <div className="p-6 space-y-4 text-slate-700 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200">
              <div className="flex items-center gap-2 font-bold text-purple-900 mb-1">
                <Database className="w-4 h-4 text-purple-brand" />
                <span>Production Cloud Storage (Supabase / AWS S3)</span>
              </div>
              <p className="text-xs text-purple-800 leading-relaxed">
                For team administration and permanent remote uploads, connect Supabase Storage with Row-Level Security (RLS).
              </p>
            </div>

            <div className="space-y-2">
              <h5 className="font-bold text-navy-900">Enabling Permanent Storage:</h5>
              <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-600">
                <li>Create a free project at <strong className="text-slate-800">Supabase.com</strong>.</li>
                <li>Create a public storage bucket named <code className="bg-slate-100 px-1 rounded">portfolio-media</code>.</li>
                <li>Add these environment variables to your <code className="bg-slate-100 px-1 rounded">.env</code>:</li>
              </ol>

              <pre className="p-3 bg-slate-900 text-cyan-300 rounded-xl text-[11px] font-mono overflow-x-auto">
{`VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key`}
              </pre>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2 text-amber-800 text-xs">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Security Rule:</strong> Never expose the service_role key in frontend code. Only the public anon key with strict upload RLS policies should be used.
                </span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
