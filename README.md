# DentaWave Frontend

Modern dental clinic management platform built with Next.js 16, React 19, and TypeScript.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?logo=tailwind-css)

## 🌐 Live Links

| Service | URL |
|---------|-----|
| Frontend | https://dentaflow-rho.vercel.app |
| Backend | https://dentaflow-backend.vercel.app |
| Frontend Repo | https://github.com/tahmidjihan/dentaFlow-frontend |
| Backend Repo | https://github.com/tahmidjihan/dentaflow-backend |

## ✨ Features

### Authentication
- Email/password login and registration
- Google OAuth social login
- Role-based access (Patient, Doctor, Admin)
- Session management with better-auth

### Public Pages
- **Landing page** — 12 sections: Hero, Stats, How It Works, Services, Featured Clinics, Featured Doctors, Pricing, Testimonials, Partners, FAQ, Newsletter, CTA
- **Clinics listing** — Search, filter, sort, pagination, skeleton loaders
- **Doctors listing** — Search, filter, sort, pagination
- **Clinic details** — Full info, associated doctors, booking
- **Doctor details** — Profile, specializations, reviews, booking
- **About, Contact, Blog, Privacy, Terms** pages

### Dashboards (Role-Based)
- **Patient** (4 menu items) — Overview with appointment chart, appointments, booking, profile
- **Doctor** (4 menu items) — Overview with weekly chart, appointments, clinics, profile
- **Admin** (5 menu items) — Overview with growth & role charts, users, doctors, clinics, appointments

### AI Features
- **DentaBot AI Chat** — Floating chat widget powered by OpenRouter (Gemini 2.0 Flash)
- **AI Search Bar** — Dynamic suggestions from real clinic/doctor data
- **Smart Recommendations** — Personalized based on appointment history

### UI/UX
- Dark mode toggle
- Fully responsive (mobile, tablet, desktop)
- Material Design 3 color tokens
- Skeleton loaders, form validation, toast notifications
- Consistent card sizes, border radius, spacing

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 16 | Framework (App Router) |
| React 19 | UI library |
| TypeScript | Type safety |
| Tailwind CSS 4 | Styling |
| Radix UI | Accessible components |
| better-auth | Authentication client |
| React Hook Form + Zod | Form validation |
| Recharts | Dashboard charts |
| Sonner | Toast notifications |
| Lucide React | Icons |
| Material Symbols | Icon font |

## 📁 Project Structure

```
frontend/
├── app/
│   ├── (main)/                     # Public pages
│   │   ├── page.tsx                # Landing (12 sections)
│   │   ├── about/
│   │   ├── blog/
│   │   ├── book/
│   │   ├── clinics/
│   │   │   ├── [id]/               # Clinic details
│   │   │   └── page.tsx            # Clinics listing
│   │   ├── contact/
│   │   ├── doctors/
│   │   │   ├── [id]/               # Doctor details
│   │   │   └── page.tsx            # Doctors listing
│   │   ├── payment/
│   │   ├── privacy/
│   │   └── terms/
│   ├── auth/
│   │   ├── login/
│   │   └── signup/
│   ├── dashboard/
│   │   ├── admin/
│   │   │   ├── users/
│   │   │   ├── doctors/
│   │   │   ├── clinics/
│   │   │   ├── appointments/
│   │   │   └── page.tsx
│   │   ├── doctor/
│   │   │   ├── appointments/
│   │   │   ├── clinics/
│   │   │   └── page.tsx
│   │   ├── patient/
│   │   │   └── page.tsx
│   │   ├── appointments/
│   │   ├── profile/
│   │   └── page.tsx                # Role-based redirect
│   ├── api/auth/[...path]/         # Auth proxy
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── AIChatAssistant.tsx          # AI chatbot widget
│   ├── AISearchBar.tsx              # Dynamic search suggestions
│   ├── AuthPage.tsx                 # Login/signup forms
│   ├── BookingForm.tsx              # Appointment booking
│   ├── ClinicCard.tsx               # Clinic card component
│   ├── Clinics.tsx                  # Clinics listing logic
│   ├── Dashboard.tsx                # Patient dashboard content
│   ├── DashboardWrapper.tsx         # Dashboard layout shell
│   ├── DarkModeToggle.tsx           # Theme switcher
│   ├── DoctorsPage.tsx              # Doctors listing logic
│   ├── FAQ.tsx                      # FAQ accordion
│   ├── FeaturedClinics.tsx          # Landing page clinics
│   ├── FeaturedDoctors.tsx          # Landing page doctors
│   ├── Footer.tsx                   # Site footer
│   ├── Hero.tsx                     # Landing hero section
│   ├── HowItWorks.tsx               # 3-step process
│   ├── Navbar.tsx                   # Top navigation
│   ├── Newsletter.tsx               # Email subscription
│   ├── Partners.tsx                 # Trust badges
│   ├── Pricing.tsx                  # Pricing section
│   ├── Services.tsx                 # Services showcase
│   ├── Sidebar.tsx                  # Dashboard sidebar
│   ├── SmartRecommendations.tsx     # AI recommendations
│   ├── Stats.tsx                    # Animated counters
│   ├── Testimonials.tsx             # Reviews section
│   └── ui/                          # Reusable primitives
├── lib/
│   ├── APICalls/                    # API call modules
│   ├── hooks/                       # React Query hooks
│   ├── auth-client.ts               # better-auth client
│   ├── fetchAPI.ts                  # HTTP utility
│   └── utils.ts                     # Helpers
├── types/
│   └── database.ts                  # TypeScript types
└── package.json
```

## 🚀 Setup

### Prerequisites

- Node.js 20+
- Backend running on `http://localhost:8000`

### Installation

```bash
cd frontend
npm install
```

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Development

```bash
npm run dev
```

Frontend runs on `http://localhost:3000`.

## 🏃 Scripts

```bash
npm run dev       # Development server
npm run build     # Production build
npm start         # Production server
npm run lint      # ESLint
```

## 🔐 Authentication

Uses **better-auth** with session cookies. The frontend proxies auth requests to the backend via `/api/auth/[...path]`.

### Google OAuth Setup

1. Create OAuth credentials at [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Add redirect URI: `http://localhost:8000/api/auth/callback/google`
3. Set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in backend env

### Roles

| Role | Access |
|------|--------|
| `USER` (Patient) | Book appointments, view history, manage profile |
| `DOCTOR` | View/manage appointments, manage clinics, view patients |
| `ADMIN` | Full access — manage users, doctors, clinics, appointments |

## 🎨 Design System

### Colors (Material Design 3)

- **Primary:** `#55624c` (olive green)
- **Secondary:** `#685d4d`
- **Tertiary:** `#635d5a`
- **Surface:** `#fbf9f7` (light) / `#1b1c1b` (dark)

### Typography

- **Headings:** Manrope
- **Body:** Inter

### Icons

- Material Symbols Outlined (Google Fonts)

## 🧪 Testing Checklist

- [ ] User registration (Patient/Doctor)
- [ ] User login/logout
- [ ] Google OAuth login
- [ ] Browse clinics with search/filter/sort/pagination
- [ ] Browse doctors with search/filter/sort/pagination
- [ ] View clinic details
- [ ] View doctor details
- [ ] Book appointment
- [ ] View appointment history
- [ ] Dashboard charts display real data
- [ ] Dark mode toggle
- [ ] AI chatbot responds to queries
- [ ] AI search shows suggestions
- [ ] Responsive on mobile/tablet/desktop
- [ ] Footer links work
- [ ] All routes accessible

## 🚀 Deployment

### Vercel

1. Push to GitHub
2. Import project in Vercel
3. Set environment variables:
   - `NEXT_PUBLIC_API_URL` → backend URL
   - `NEXT_PUBLIC_BASE_URL` → frontend URL
4. Deploy

```bash
# Manual deploy
vercel --prod --yes
```

## 📞 Support

- **Backend API:** https://dentaflow-backend.vercel.app/health
- **Issues:** GitHub repository issues

---

*DentaWave — Modern Dental Care Platform*
