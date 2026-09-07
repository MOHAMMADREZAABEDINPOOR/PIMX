<div align="center">

<!-- ============================================================================== -->
<!-- DYNAMIC ANIMATED CAPSULE HEADER                                                -->
<!-- ============================================================================== -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=1,12,24,30&height=220&section=header&text=PIMX_PORTAL&fontSize=42&fontAlignY=35&desc=%E2%9A%A1%20Bilingual%20Visual%20Gateway%20%26%20Central%20Ecosystem%20Command%20Center&descFontSize=16&descAlignY=62" alt="PIMX_PORTAL Banner" width="100%" />

<!-- ============================================================================== -->
<!-- ANIMATED TYPING SVG TELEMETRY                                                 -->
<!-- ============================================================================== -->
<a href="https://github.com/MOHAMMADREZAABEDINPOOR/PIMX_PORTAL">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=20&duration=2800&pause=1000&color=00D2FF&center=true&vCenter=true&width=780&lines=Central+Visual+Gateway+Connecting+the+Entire+PIMX+Ecosystem;Interactive+Engineering+Resume+with+Embedded+PDF+Certificates;Real-Time+Cluster+Node+Health+Monitoring+%26+Edge+Telemetry;Dark+Glassmorphism+Aesthetics+with+Tailwind+CSS+%26+Lucide+Icons;Serverless+Cloudflare+Pages+Functions+Deployment+(Sub-15ms);Bilingual+Architecture+Supporting+Persian+(RTL)+%26+English" alt="Typing SVG" />
</a>

<br/>

<!-- ============================================================================== -->
<!-- BADGES MATRIX                                                                  -->
<!-- ============================================================================== -->
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg?style=for-the-badge&logo=gnu)](https://www.gnu.org/licenses/agpl-3.0)
[![React: 18+](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Cloudflare Pages](https://img.shields.io/badge/Deploy-Cloudflare_Pages-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Read in Persian](https://img.shields.io/badge/مطالعه_به_فارسی-Persian_README-008080?style=for-the-badge)](#-بخش-فوقالعاده-مفصل-و-جامع-به-زبان-فارسی-persian-documentation)

<p align="center">
  <b>PIMX_PORTAL</b> is the central command center and visual gateway for the PIMX technology ecosystem. Orchestrating decentralized AI tools, VPN proxy panels, DNS speed benchmarks, cryptographic suites, and an interactive engineering curriculum vitae with verified university certificates, PIMX_PORTAL unifies modern digital infrastructure in an ultra-fast dark glassmorphic interface.
</p>

<!-- ============================================================================== -->
<!-- QUICK NAVIGATION ANCHORS                                                       -->
<!-- ============================================================================== -->
[Project Overview](#-project-overview--vision) •
[Directory Anatomy](#-exhaustive-directory--file-anatomy) •
[Routing Architecture](#-routing-architecture--page-breakdown) •
[Edge Telemetry](#-serverless-edge-telemetry-functions) •
[Installation Guide](#-quick-start--local-development) •
[توضیحات فارسی](#-بخش-فوقالعاده-مفصل-و-جامع-به-زبان-فارسی-persian-documentation) •
[Roadmap](#-strategic-engineering-roadmap) •
[License](#-copyleft-license--legal-attribution)

</div>

---

## ⚡ Project Overview & Vision

> *"A scattered collection of repositories is just code; an interconnected **Ecosystem Portal** turns autonomous software tools into a unified technological movement."*

### Why PIMX_PORTAL Exists
As the PIMX open-source ecosystem expanded into artificial intelligence, censorship evasion, steganography, and WebGL graphics, users required a unified command center:
1. **Centralized Navigation**: Instant access to all live web apps, Telegram bots, and documentation hubs.
2. **Academic Verification**: Direct embedded inspection of verified university certifications in Computer Science, Python Algorithms, and Modern Web Architectures.
3. **Decentralized Edge Performance**: Hosted on Cloudflare Pages Anycast CDN for global sub-15ms load times.

---

## 📂 Exhaustive Directory & File Anatomy

```
d:/code/pimxportfolio/
│
├── index.html                       # HTML5 entrypoint with pre-warmed Google Fonts & OpenGraph meta
├── metadata.json                    # Application metadata, version descriptors & build telemetry signatures
├── package.json                     # Node.js dependencies (React 18, Lucide React, Tailwind, Vite)
├── README.md                        # Master comprehensive bilingual documentation
│
├── src/                             # Main React Application
│   ├── App.tsx                      # Root component, router orchestrator, page transitions & theme state
│   ├── main.tsx                     # React 18 createRoot mounting lifecycle
│   ├── index.css                    # Tailwind directives, frosted glassmorphism & neon glow design tokens
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

## 🚀 Quick Start & Local Development

```bash
git clone https://github.com/MOHAMMADREZAABEDINPOOR/PIMX_PORTAL.git
cd PIMX_PORTAL

npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 🇮🇷 بخش فوق‌العاده مفصل و جامع به زبان فارسی (Persian Documentation)

### ۱. مقدمه و رسالت درگاه مرکزی PIMX_PORTAL
پروژه **PIMX_PORTAL** هاب ارتباطی و درگاه ورود به تمامی سامانه‌های اکوسیستم نرم‌افزاری PIMX است. این پرتال با زبان‌های **React 18** و **TypeScript** مهندسی شده و به کاربران این امکان را می‌دهد تا به صورت یکپارچه و در محیطی لوکس و مدرن با طراحی شیشه‌ای (Glassmorphism)، به ابزارهای هوش مصنوعی، پنل‌های مدیریت شبکه، سامانه‌های رمزنگاری و رزومه آنلاین دسترسی داشته باشند.

---

### ۲. کالبدشکافی ساختار فایل‌ها و بخش‌های پروژه
- **`src/pages/Home.tsx`**: ویترین اصلی؛ شامل معرفی اکوسیستم، نمایش زنده وضعیت سلامت سرورها و دکمه‌های پرتاب سریع به پروژه‌های مختلف.
- **`src/pages/Projects.tsx`**: فهرست فیلترپذیر تمامی پروژه‌ها در ۴ حوزه اصلی (هوش مصنوعی، ابزارهای شبکه، ربات‌های تلگرام و گرافیک سه‌بعدی).
- **`src/pages/Resume.tsx`**: رزومه تعاملی مهندسی به همراه لینک دانلود و پیش‌نمایش مدارک بین‌المللی برنامه‌نویسی پایتون و توسعه وب از دانشگاه رایس و کورسرا.
- **`functions/api/analytics/`**: سرویس بدون سرور کلودفلر برای ثبت ایمن و ناشناس ترافیک ورودی بدون استفاده از کوکی‌های نقض‌کننده حریم خصوصی.

---

## 📜 Copyleft License & Legal Attribution

Distributed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**.

---

<div align="center">

<!-- ============================================================================== -->
<!-- ANIMATED CAPSULE FOOTER                                                        -->
<!-- ============================================================================== -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=1,12,24,30&height=120&section=footer" alt="Footer" width="100%" />

<sub>Architected by <a href="https://github.com/MOHAMMADREZAABEDINPOOR"><b>MOHAMMADREZA ABEDINPOOR</b></a>. If PIMX_PORTAL inspires your digital portfolio, consider leaving a ⭐!</sub>

</div>
