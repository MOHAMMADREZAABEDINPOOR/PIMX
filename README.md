<div align="center">

# 🌐 PIMX_PORTAL 🧭⚡
### High-Performance Bilingual Visual Gateway & Central Ecosystem Command Center

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg?style=for-the-badge)](https://www.gnu.org/licenses/agpl-3.0)
[![React: 18+](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Cloudflare Pages](https://img.shields.io/badge/Deploy-Cloudflare_Pages-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Read in Persian](https://img.shields.io/badge/مطالعه_به_فارسی-Persian_README-008080?style=for-the-badge)](#-توضیحات-فوقالعاده-جامع-فارسی-persian-documentation)

<p align="center">
  The central nervous system and flagship visual dashboard connecting all PIMX ecosystem tools, applications, and decentralized gateways. Features real-time cluster health monitors, responsive dark glassmorphism, instant cross-app routing, interactive resumes with verifiable academic credentials, and native bilingual localization (EN / FA).
</p>

[Project Overview](#-project-overview) •
[Directory Structure](#-directory--file-structure) •
[Integrated Pages](#-integrated-pages--routing-architecture) •
[Edge Telemetry](#-edge-telemetry--analytics) •
[Quick Start](#-quick-start) •
[توضیحات فارسی](#-توضیحات-فوقالعاده-جامع-فارسی-persian-documentation) •
[License](#-license)

</div>

---

## 🎯 Project Overview

As the PIMX technology ecosystem expanded to include AI planners, VPN gateways, DNS benchmarks, cryptographic vaults, and creative art tools, users needed a single, cohesive entrypoint.

**PIMX_PORTAL** provides:
- **Unified Ecosystem Access**: Instant routing to any live PIMX tool with status badges.
- **Interactive Engineering Resume**: Features downloadable, verified certificates for Python, Web Development, and Computer Science from Rice University, Coursera, and Michigan.
- **Live Edge Telemetry**: Collects privacy-preserving visitor analytics and device telemetry directly via Cloudflare Pages Functions.

---

## 📂 Directory & File Structure

```
pimxportfolio/
│
├── index.html                       # Entry point with pre-warmed Google Fonts & CDN links
├── metadata.json                    # Application metadata, version descriptors & build telemetry
├── package.json                     # Dependencies (React 18, Lucide React, Tailwind, Vite)
├── README.md                        # Master comprehensive bilingual documentation
│
├── src/                             # Main React Application
│   ├── App.tsx                      # Root component, router orchestrator & page transitions
│   ├── main.tsx                     # React 18 createRoot mounting lifecycle
│   ├── index.css                    # Tailwind directives, frosted glassmorphism & neon glow tokens
│   ├── types.ts                     # TypeScript interfaces for projects, certificates & telemetry
│   │
│   ├── context/
│   │   └── LanguageThemeContext.tsx # Dual state manager for EN/FA locale and Dark/Light theme
│   │
│   ├── components/
│   │   ├── Navbar.tsx               # Sticky glassmorphic navbar with animated mobile drawer
│   │   ├── Footer.tsx               # Ecosystem links, copyright & social matrix
│   │   └── Loader.tsx               # High-contrast pre-loader animation
│   │
│   ├── pages/
│   │   ├── Home.tsx                 # Hero section, flagship highlights & quick launcher cards
│   │   ├── About.tsx                # Engineering philosophy, bio & architectural methodology
│   │   ├── Projects.tsx             # Interactive filterable grid of all PIMX repositories
│   │   ├── Resume.tsx               # Interactive CV with embedded PDF certificates viewer
│   │   ├── Playground.tsx           # Interactive WebGL & micro-tool test sandbox
│   │   ├── Admin.tsx                # Token-secured dashboard viewing Cloudflare visitor stats
│   │   └── Contact.tsx              # Encrypted contact form & PGP key fingerprint
│   │
│   └── lib/
│       ├── translations.ts          # Core dictionary for global navigation strings
│       ├── home_translations.ts     # Specialized hero and feature copy (EN / FA)
│       ├── about_translations.ts    # Extended biographical and mission statement strings
│       ├── project_translations.ts  # Granular project descriptions and tags
│       ├── cv_data.ts               # Structured academic and professional experience data
│       └── analytics.ts             # Client-side beacon dispatcher logging to edge functions
│
├── functions/                       # Cloudflare Pages Serverless Edge Functions
│   └── api/
│       └── analytics/
│           ├── track.ts             # Edge worker logging visitor IP country & device type
│           └── stats.ts             # Admin endpoint aggregating hourly and daily traffic
│
└── public/                          # Static assets & academic certificates
    ├── cv.pdf                       # Official engineering resume
    ├── HTML,CSS,andJavascriptforWebDevelopers.pdf
    ├── IntroductiontoPythonProgramming.pdf
    ├── AnIntroductiontoInteractiveProgramminginPythonPart1.pdf
    └── og-image.svg                 # OpenGraph social share card
```

---

## 🧭 Integrated Pages & Routing Architecture

1. **`Home.tsx`**: Dynamic hero section highlighting the user's role as an AI Vibe Coder & Ecosystem Architect.
2. **`Projects.tsx`**: Searchable and filterable showcase categorizing projects into AI, Network Security, WebGL Graphics, and Telegram Bots.
3. **`Resume.tsx`**: Complete timeline of software development milestones with direct PDF viewing of verified credentials.
4. **`Playground.tsx`**: Interactive canvas experimentation zone for testing generative UI prototypes.

---

## 🚀 Quick Start

```bash
git clone https://github.com/MOHAMMADREZAABEDINPOOR/PIMX_PORTAL.git
cd PIMX_PORTAL

npm install
npm run dev
```
Open `http://localhost:5173` to test locally.

---

## 🇮🇷 توضیحات فوق‌العاده جامع فارسی (Persian Documentation)

### ۱. معرفی درگاه مرکزی PIMX_PORTAL
پروژه **PIMX_PORTAL** پورتال جامع و درگاه اصلی ورود به اکوسیستم بزرگ نرم‌افزاری PIMX است. این وب‌سایت با استفاده از **React 18**، **TypeScript** و استایل‌های شیشه‌ای مدرن (Glassmorphism) ساخته شده و امکان دسترسی سریع به تمامی پروژه‌های هوش مصنوعی، ابزارهای شبکه و امنیت، ربات‌های تلگرام و پورتفولیوی سه‌بعدی را برای کاربران در سراسر جهان فراهم می‌کند.

---

### ۲. تشریح صفحات و معماری فایل‌ها
- **`src/pages/Home.tsx`**: صفحه اصلی شامل معرفی، نمادهای دسترسی سریع به پروژه‌ها و بنر خوش‌آمدگویی.
- **`src/pages/Projects.tsx`**: کاتالوگ جامع پروژه‌ها با قابلیت فیلتر بر اساس دسته‌بندی (امنیت، بات، هوش مصنوعی).
- **`src/pages/Resume.tsx`**: رزومه تعاملی مهندسی به همراه لینک دانلود و پیش‌نمایش مدارک بین‌المللی برنامه‌نویسی پایتون و وب از دانشگاه رایس و کورسرا.
- **`functions/api/analytics/`**: توابع لبه شبکه (Serverless Edge) در کلودفلر برای ثبت ایمن و بدون ردیابی ترافیک ورودی.

---

## 📜 License

Distributed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**.

---

<div align="center">
  <sub>Architected by <a href="https://github.com/MOHAMMADREZAABEDINPOOR">MOHAMMADREZA ABEDINPOOR</a>. Star ⭐ this repo if you enjoy unified gateways!</sub>
</div>
