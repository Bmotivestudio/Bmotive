# Bmotive Studio - Digital Marketing Agency Platform

## Overview
Bmotive Studio is a comprehensive digital marketing agency platform targeting Small and Medium Enterprises (PMI) in Italy, offering web development, SEO, social media marketing, and digital transformation services. The platform leverages modern web technologies and AI to provide specialized solutions for the Italian market, aiming to serve over 500 PMIs nationwide.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with a custom design system
- **UI Components**: Radix UI
- **Typography**: Inter, Poppins, and Montserrat fonts
- **State Management**: React hooks and Context API
- **Routing**: File-based routing

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for REST APIs
- **Authentication**: Passport.js (local strategy, session management)
- **Database**: PostgreSQL with Drizzle ORM
- **AI Integration**: OpenAI GPT-4o for chat and content generation
- **Payment Processing**: Mollie API

### Key Features
- **Multi-language SEO Optimization**: Italian-focused content, LocalBusiness schema for Rome, optimized URLs, and Google Analytics 4.
- **AI-Powered Chat Assistant ("Moty")**: GPT-4o integration for customer support, Italian language responses, service recommendations, and lead qualification.
- **Image Optimization**: Automated WebP conversion, Sharp-based optimization, responsive images, and lazy loading.
- **Performance Optimization**: Bundle splitting, tree shaking, aggressive caching, and Core Web Vitals optimization.
- **Payment Integration**: Mollie payment gateway for EUR transactions, compliant with Italian market regulations, including "Pacchetto Personalizzato" (custom amount).
- **Bilingual IT/EN Support**: Full Italian/English language toggle via `LanguageContext` + `translations.ts`, stored in localStorage. Navbar includes language switcher. ALL public pages fully bilingual: home hero, services, portfolio, about, blog, contact. Bilingual data arrays used for services (home + services page), portfolio projects, about team/features/milestones. `SERVICES_EN` added to `constants.ts`. `HomeHeroSection` uses `useLanguage()` with no props.
- **Light/White Theme**: All public pages use white/light backgrounds (`bg-white`, `bg-gray-50`). Dark theme completely removed from public-facing pages.
- **Blog**: 7 Italian 2026 articles covering AI, branding, SEO locale, LinkedIn B2B, web design, Google Ads, e-commerce.
- **Portfolio**: 2026 project roadmap with 6 active projects.

### Core System Design
- **UI/UX**: Modern light design system with a gradient palette (#0061FF, #8A2BE2, #E50914), animated elements (fadeIn, slideIn), sticky headers, white/gray-50 backgrounds, gradient accent CTAs, and responsive components.
- **Language System**: `client/src/lib/translations.ts` (IT/EN strings), `client/src/contexts/LanguageContext.tsx` (React context), `useLanguage()` hook used across all pages.
- **Key files**: `client/src/styles/globals.css` (CSS vars, white bg), `theme.json` (light appearance), `client/src/main.tsx` (root entry with LanguageProvider).
- **Database Schema**: Includes Users, Client Profiles (with Italian business data), Projects, Documents, Blog System, and Newsletter subscriptions.
- **Data Flow**: Structured flows for client interactions, AI chat, SEO content generation, and image processing.
- **Deployment**: Containerized deployment on Google Cloud Run, Neon PostgreSQL for the database, and CDN caching (Vercel/Netlify).

## External Dependencies

- **React Ecosystem**: React 18, React Router, React Hook Form
- **UI/UX Libraries**: Radix UI, Tailwind CSS, Lucide React (icons)
- **Database**: PostgreSQL (Neon serverless), Drizzle ORM
- **AI Services**: OpenAI API (GPT-4o)
- **Payment Gateway**: Mollie API
- **Authentication**: Passport.js
- **Build & Dev Tools**: Vite, TypeScript, Babel, PostCSS, ESLint, Prettier, Drizzle Kit, Sharp
- **Production Infrastructure**: Google Cloud Run, Vercel/Netlify