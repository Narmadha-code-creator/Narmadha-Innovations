import React, { useState } from 'react';
import {
  Mail,
  Send,
  Linkedin,
  Github,
  MapPin,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name.';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email format.';
    }
    if (!formData.subject.trim()) errs.subject = 'Please enter a message subject.';
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please enter a message with at least 10 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    setStatusMessage('');

    const endpoint = (import.meta as any).env?.VITE_CONTACT_FORM_ENDPOINT;

    if (endpoint) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          setStatus('success');
          setStatusMessage('Thank you! Your message has been sent successfully.');
          setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
          setStatus('error');
          setStatusMessage('Failed to deliver message via server endpoint. Please reach out directly via email or LinkedIn.');
        }
      } catch (err) {
        setStatus('error');
        setStatusMessage('Network error occurred while delivering message. Please try sending via your email client.');
      }
    } else {
      // Direct email client fallback (mailto) so submission is authentic and never fake
      const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
        `[Portfolio Contact] ${formData.subject}`
      )}&body=${encodeURIComponent(
        `From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`
      )}`;

      window.open(mailtoUrl, '_blank');
      setStatus('success');
      setStatusMessage('Your email client was opened with your message pre-filled for verified direct delivery.');
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-lavender-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Mail className="w-3.5 h-3.5 text-cyan-brand" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            Let's Connect & Collaborate
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Interested in software engineering collaborations, innovation hackathons, or business development opportunities? Send a message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
          
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-sm border border-purple-100 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-extrabold text-navy-900 mb-2">
                  Direct Channels
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                  Feel free to reach out directly through my verified social and developer profiles.
                </p>

                <div className="space-y-4">
                  <a
                    href={personalInfo.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3.5 rounded-2xl bg-white hover:bg-cyan-50/70 border border-slate-200 hover:border-cyan-200 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-brand flex items-center justify-center shrink-0">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs text-slate-500 font-semibold block">LinkedIn Profile</span>
                      <span className="text-sm font-bold text-navy-900 group-hover:text-cyan-600 transition-colors truncate block">
                        narmadha-s-d
                      </span>
                    </div>
                  </a>

                  <a
                    href={personalInfo.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3.5 rounded-2xl bg-white hover:bg-purple-50/70 border border-slate-200 hover:border-purple-200 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-brand flex items-center justify-center shrink-0">
                      <Github className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs text-slate-500 font-semibold block">GitHub Portfolio</span>
                      <span className="text-sm font-bold text-navy-900 group-hover:text-purple-brand transition-colors truncate block">
                        Narmadha-code-creator
                      </span>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-white border border-slate-200">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 font-semibold block">Location</span>
                      <span className="text-sm font-bold text-navy-900 block">
                        {personalInfo.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 mt-6 text-xs text-slate-500">
                <span>Active hours: Monday – Saturday (IST)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-sm border border-purple-100">
              
              <h3 className="text-xl font-extrabold text-navy-900 mb-1.5">
                Send a Direct Message
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-6">
                Fill out the form below to initiate communication.
              </p>

              {status === 'success' && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold flex items-center gap-2 mb-6">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>{statusMessage}</span>
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-semibold flex items-center gap-2 mb-6">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  <span>{statusMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Alex Morgan"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-brand"
                    />
                    {errors.name && <p className="text-[11px] text-rose-600 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g., alex@company.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-brand"
                    />
                    {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g., Project Collaboration / Opportunity"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-brand"
                  />
                  {errors.subject && <p className="text-[11px] text-rose-600 mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hello Narmadha, I'd like to discuss..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-brand"
                  />
                  {errors.message && <p className="text-[11px] text-rose-600 mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-brand to-navy-900 hover:from-purple-light hover:to-navy-800 text-white font-bold text-sm shadow-md hover:shadow-glow-purple transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{status === 'submitting' ? 'Delivering...' : 'Send Message'}</span>
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
