# DentaFlow Frontend

Modern dental clinic management platform built with Next.js 16, React 19, and TypeScript.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-blue?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?logo=tailwind-css&logoColor=white)
![Radix UI](https://img.shields.io/badge/Radix_UI-black?logo=radix-ui&logoColor=white)

---

## 🌐 Live Application

| Service | URL |
|---------|-----|
| **Frontend** | [https://dentaflow-rho.vercel.app/](https://dentaflow-rho.vercel.app/) |
| **Backend API** | [https://dentaflow-backend.vercel.app/](https://dentaflow-backend.vercel.app/) |

---

## 👤 Demo Credentials

For testing purposes, use the following admin credentials:

| Field | Value |
|-------|-------|
| **Email** | `admin@admin.com` |
| **Password** | `Admin123!` |

> ⚠️ **Note:** Please change these credentials in production environments.

---

## ✨ Features

### Core Functionality

- ✅ **Authentication System**
  - User registration and login
  - Secure session management with Better-Auth
  - Email verification support

- ✅ **Role-Based Access Control (RBAC)**
  - **ADMIN** - Full system access, manage clinics, doctors, users
  - **DOCTOR** - Manage appointments, view patient information
  - **USER** - Book appointments, view own history

- ✅ **Clinic Management**
  - Browse all clinics
  - View clinic details
  - Create, update, delete clinics (Admin)

- ✅ **Doctor Management**
  - Browse all doctors
  - View doctor profiles
  - Filter by clinic

- ✅ **Appointment Booking**
  - Book appointments with doctors
  - View appointment history
  - Cancel appointments
  - Status tracking (BOOKED/DONE/CANCELLED)

- ✅ **Payment Integration**
  - Stripe checkout sessions
  - Secure payment processing
  - Payment status tracking

### User Interface

- ✅ **Homepage** (5 sections)
  - Hero section with CTA
  - Services showcase
  - Pricing plans
  - Testimonials
  - Responsive navbar and footer

- ✅ **Dashboard Views**
  - Admin dashboard - Full system management
  - Doctor dashboard - Appointment management
  - Patient dashboard - Booking and history

- ✅ **Responsive Design**
  - Mobile-first approach
  - Tablet and desktop optimized
  - Clean, modern UI with Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16 | React framework with SSR |
| React | 19 | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Styling |
| Better-Auth | 0.8.x | Authentication client |
| Radix UI | Latest | Accessible UI components |
| Lucide React | Latest | Icon library |
| Sonner | Latest | Toast notifications |
| React Hook Form | Latest | Form handling |
| Zod | 3.x | Schema validation |

---

## 📁 Project Structure

```
frontend/
├── app/
│   ├── (main)/                    # Public pages
│   │   ├── page.tsx              # Homepage
│   │   ├── clinics/              # Clinics listing
│   │   └── doctors/              # Doctors listing
│   ├── auth/                      # Authentication pages
│   │   ├── login/
│   │   └── signup/
│   ├── dashboard/                 # Role-based dashboards
│   │   ├── admin/                # Admin dashboard
│   │   ├── doctor/               # Doctor dashboard
│   │   └── patient/              # Patient dashboard
│   ├── api/                       # API routes
│   ├── layout.tsx                 # Root layout
│   └── globals.css                # Global styles
├── components/
│   ├── ui/                        # Reusable UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── Navbar.tsx                 # Navigation bar
│   ├── Footer.tsx                 # Footer component
│   ├── Hero.tsx                   # Hero section
│   ├── Services.tsx               # Services section
│   ├── Pricing.tsx                # Pricing section
│   ├── Testimonials.tsx           # Testimonials section
│   └── Dashboard.tsx              # Dashboard component
├── lib/
│   ├── auth-client.ts             # Better-Auth client config
│   ├── fetchAPI.ts                # API utility functions
│   └── hooks/                     # Custom hooks
├── types/
│   └── database.ts                # TypeScript type definitions
├── public/                        # Static assets
├── .env.local                     # Environment variables
├── package.json
├── tsconfig.json
└── next.config.ts
```

---

## 🚀 Setup Instructions

### Prerequisites

- Node.js 20.x or higher
- npm or yarn
- Git

### Installation

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=https://dentaflow-backend.vercel.app
   NEXT_PUBLIC_BASE_URL=https://dentaflow-rho.vercel.app
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   Frontend will run on `http://localhost:3000`

---

## 🏃 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

---

## 🎨 UI Components

### Homepage Sections

1. **Hero Section**
   - Welcome message
   - Call-to-action buttons
   - Engaging visuals

2. **Services Section**
   - Dental services showcase
   - Service descriptions
   - Icons and visuals

3. **Pricing Section**
   - Transparent pricing plans
   - Feature comparison
   - CTA buttons

4. **Testimonials Section**
   - Patient reviews
   - Ratings
   - Success stories

5. **Footer**
   - Contact information
   - Quick links
   - Social media

### Dashboard Features

**Admin Dashboard**
- Manage clinics (CRUD)
- Manage doctors
- Manage users
- View all appointments
- System analytics

**Doctor Dashboard**
- View scheduled appointments
- Update appointment status
- Patient information
- Appointment history

**Patient Dashboard**
- Book new appointments
- View appointment history
- Manage profile
- Cancel appointments

---

## 🔐 Authentication

The application uses **Better-Auth** for session-based authentication.

### Auth Flow

1. User registers or logs in
2. Session is stored securely
3. Session token is sent with API requests
4. Protected routes check authentication

### Protected Routes

Routes that require authentication:
- `/dashboard/admin/*`
- `/dashboard/doctor/*`
- `/dashboard/patient/*`
- `/appointments/*`

---

## 🌐 API Integration

### Fetch Utility

The `lib/fetchAPI.ts` provides a centralized fetch utility:

```typescript
import { fetchAPI } from '@/lib/fetchAPI';

// GET request
const clinics = await fetchAPI('/clinics');

// POST request
const appointment = await fetchAPI('/appointments', {
  method: 'POST',
  body: JSON.stringify(data)
});
```

### Environment Variables

```env
NEXT_PUBLIC_API_URL=https://dentaflow-backend.vercel.app
NEXT_PUBLIC_BASE_URL=https://dentaflow-rho.vercel.app
```

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] User registration
- [ ] User login/logout
- [ ] Browse clinics
- [ ] Browse doctors
- [ ] Create clinic (Admin)
- [ ] Update clinic (Admin)
- [ ] Delete clinic (Admin)
- [ ] Book appointment (User)
- [ ] Cancel appointment (User)
- [ ] View appointments (All roles)
- [ ] Payment flow (Stripe checkout)
- [ ] Role-based access control
- [ ] Responsive design on mobile/tablet

---

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables:
   - `NEXT_PUBLIC_API_URL`
   - `NEXT_PUBLIC_BASE_URL`
4. Deploy

### Build for Production

```bash
npm run build
npm start
```

---

## 🎨 Design System

### Colors

- **Primary:** Rose (#fb7185)
- **Body Font:** Outfit
- **Heading Font:** Ubuntu
- **Aesthetic:** Rounded (rounded-xl/2xl/3xl)

### Components

Built with Radix UI primitives and Tailwind CSS:
- Buttons
- Inputs
- Cards
- Dropdown menus
- Scroll areas
- Separators
- Toast notifications (Sonner)

---

## 📝 Development

### Adding New Pages

1. Create a new folder under `app/`
2. Add `page.tsx` for the page content
3. Add navigation links if needed
4. Test responsive design

### Adding New Components

1. Create component in `components/`
2. Export from component file
3. Import where needed
4. Follow existing component patterns

### Styling Guidelines

- Use Tailwind CSS utility classes
- Follow responsive design patterns (sm:, md:, lg:)
- Use semantic HTML
- Maintain accessibility standards

---

## 🔒 Security

- **Authentication:** Better-Auth with secure session management
- **Environment Variables:** Sensitive data stored in `.env.local`
- **Input Validation:** Zod schemas for form validation
- **XSS Protection:** React's built-in XSS protection
- **CORS:** Configured for backend communication

---

## 📊 Performance

### Optimization Techniques

- **Image Optimization:** Next.js Image component
- **Font Optimization:** Next.js Font optimization
- **Code Splitting:** Automatic with Next.js
- **Server-Side Rendering:** Next.js SSR capabilities
- **Lazy Loading:** Dynamic imports for heavy components

---

## 📞 Support

For any issues or questions:

- **Documentation:** Check this README
- **Backend API:** [https://dentaflow-backend.vercel.app/health](https://dentaflow-backend.vercel.app/health)
- **Issues:** GitHub repository issues

---

## 📄 License

This project is created for educational purposes as part of an assignment.

---

## 👨‍💻 Developer

**DentaFlow Assignment**
- Full-stack dental care management platform
- Built with modern technologies and best practices

---

*Last Updated: March 31, 2026*
