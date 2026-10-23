# NARMADHA S D — Professional Portfolio Website

Modern, responsive personal portfolio website showcasing verified achievements, engineering projects, student leadership, and technical skillsets of **Narmadha S D**.

![Portfolio Hero Preview](/images/profile.jpg)

---

## 🌟 Candidate Profile & Verified Credentials

| Field | Detail |
| :--- | :--- |
| **Name** | **NARMADHA S D** |
| **Current Education** | B.Tech Information Technology (2nd Year) |
| **Institution** | **Sri Sairam Engineering College**, Chennai, Tamil Nadu, India |
| **Expected Graduation** | 2029 |
| **Cumulative CGPA** | **8.55 / 10** |
| **Current Professional Role**| **Business Development Officer** at **DAKH Edu Solutions** |
| **GitHub** | [@Narmadha-code-creator](https://github.com/Narmadha-code-creator) |
| **LinkedIn** | [linkedin.com/in/narmadha-s-d-6716753aa](https://www.linkedin.com/in/narmadha-s-d-6716753aa/) |

---

## 🏆 Verified Honors & Authentic Photographs

All 5 authentic photographs provided by Narmadha S D have been integrated into the portfolio:

1. **Hero Portrait Frame (`/images/profile.jpg`)**:
   - High-resolution studio portrait of Narmadha S D in formal attire.
   - Preserves natural appearance within a purple-to-cyan gradient border with floating achievement badges.
2. **SRM Bharat Build Hackathon — Best Innovation Award (`/images/bharat-build-hackathon.jpg`)**:
   - Organized under Startup Summit 2.0 - TerraNext by the Department of Computing Technologies, SRMIST Kattankulathur (Sept 8, 2026).
   - Cash Prize: ₹1,500 + Certificate of Appreciation.
3. **CASYUM 2026 National Intercollegiate Symposium (`/images/casyum-awards.jpg`)**:
   - Organized by Department of Computer Applications (BCA & Gen AI), SRMIST Ramapuram (Sept 19, 2026).
   - **1st Prize Gold Medal** in Hackathon.
   - **2nd Prize Silver Medal** in Tech Quiz.
4. **Overall Symposium Winner Championship Trophy (`/images/overall-trophy.jpg`)**:
   - Grand champion trophy celebration at Sri Sairam Engineering College.
5. **n8n Workflow Automation Workshop & Tech Challenge (`/images/n8n-workshop.jpg`)**:
   - Second Prize honors in technical quiz and masterclass recognition.

---

## 💻 Featured Real-World Projects

1. **MANGANEX AI — National Mineral Intelligence Command Center**
   - AI-assisted platform concept for identifying manganese mineral reserves with machine learning prospectivity models.
   - *Tech:* React, TypeScript, Node.js, Express, FastAPI, Python Random Forest, MongoDB Atlas, Tailwind CSS.
   - *GitHub:* [Narmadha-code-creator/Manganex-ai](https://github.com/Narmadha-code-creator/Manganex-ai)
   - *Live Deployment:* [manganex.netlify.app](https://manganex.netlify.app/)

2. **VARUNA06 — Seafloor Metal Detection Sensor Platform**
   - Deployable low-cost marine sensor platform concept for deep ocean mineral exploration, anomaly detection, and bathymetric data visualization.
   - *Tech:* HTML5, CSS3, JavaScript, Canvas API, responsive oceanic styling.
   - *GitHub:* [Narmadha-code-creator/varua06](https://github.com/Narmadha-code-creator/varua06)

3. **TherapyJoy — Healthcare & Emotional Support AI Chatbot**
   - Conversational AI companion powered by OpenAI GPT-4o-mini providing rapid mental wellness guidance and supportive dialogue.
   - *Tech:* OpenAI API, Node.js, Express, MongoDB, JavaScript.
   - *GitHub:* [Narmadha-code-creator/therapyjoy_chatbot](https://github.com/Narmadha-code-creator/therapyjoy_chatbot)

4. **Healthcare Pro — AI Predictive Risk Assessment System**
   - Full-stack healthcare application predicting health risks based on biometric inputs with PostgreSQL and JWT authentication.
   - *Tech:* React, Node.js, PostgreSQL, JWT Authentication.
   - *GitHub:* [Narmadha-code-creator/healthcare-pro](https://github.com/Narmadha-code-creator/healthcare-pro)

5. **Maverick Coding Platform — Hexaware Training Dashboard**
   - Full-stack MERN application for structured problem-solving, progress dashboards, and role-based access.
   - *Tech:* React, Node.js, Express, MongoDB, Chart.js.
   - *GitHub:* [Narmadha-code-creator/training-dashboard-platform-hexaware-project](https://github.com/Narmadha-code-creator/training-dashboard-platform-hexaware-project)

6. **ShopEase — Modern E-Commerce Storefront**
   - High-performance online catalog, cart calculation, and streamlined order placement.
   - *GitHub:* [Narmadha-code-creator/codealpha_tasks](https://github.com/Narmadha-code-creator/codealpha_tasks)

---

## 🛠️ Tech Stack & Key Features

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS (Navy, Purple, Cyan, Lavender design system), Glassmorphism utilities
- **Icons:** Lucide React (`lucide-react`)
- **Interactive Lightbox:** Fullscreen modal with multi-image navigation, zoom controls, and metadata
- **Photo Vault & Image Manager:** Client-side upload workflow with file-type/size validation and persistent storage
- **Interactive Resume:** In-browser document viewer, PDF download, and browser print-optimized layout
- **Validated Contact Form:** Client-side validation with real `mailto:` fallback or custom API webhook dispatch

---

## 🚀 Local Development Setup

### 1. Prerequisites
- Node.js (v18+ or v20+)
- npm (v9+)

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
The site will run at `http://localhost:3000`.

### 4. Build for Production
```bash
npm run build
```
Generates an optimized, production-ready build in `dist/`.

### 5. Preview Production Build
```bash
npm run preview
```

---

## 🖼️ Image Management Workflow

### Local Image Replacement
To replace images locally, simply overwrite the files in `public/images/`:
- Hero Portrait: `public/images/profile.jpg`
- Hackathon Photo: `public/images/bharat-build-hackathon.jpg`
- Symposium Medals: `public/images/casyum-awards.jpg`
- Trophy Celebration: `public/images/overall-trophy.jpg`
- Workshop Ceremony: `public/images/n8n-workshop.jpg`

### Interactive In-Browser Upload (Photo Vault)
Click the **"Photo Vault"** button in the navbar or **"Add / Manage Photos"** in the Achievements section:
1. Fill in Title, Event Name, Category, Date, and Description.
2. Select your image file (JPEG, PNG, or WebP up to 5MB).
3. The system validates the file and persists it to your browser's local state, rendering it immediately in your achievements gallery.

### Production Cloud Storage Integration (Supabase / AWS S3)
To enable permanent remote uploads for an administrator:
1. Create a project at [supabase.com](https://supabase.com).
2. Create a public storage bucket named `portfolio-media`.
3. Create a `.env` file with:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-public-anon-key
   VITE_CONTACT_FORM_ENDPOINT=https://formspree.io/f/your-form-id # optional
   ```

---

## ☁️ Deploying to Vercel

The repository includes a ready-to-use `vercel.json` file for single-page application (SPA) routing:

1. Push your code to your GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Complete Narmadha S D Professional Portfolio"
   git branch -M main
   git remote add origin https://github.com/Narmadha-code-creator/Portfolio-website-.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. Framework Preset: **Vite**.
4. Build Command: `npm run build`.
5. Output Directory: `dist`.
6. Click **Deploy**!

---

## 📄 License & Ownership
Created for **Narmadha S D**. All rights reserved.
